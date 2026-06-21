{
  config,
  lib,
  pkgs,
  ...
}:
with lib; let
  cfg = config.svar-calendar;
  hostname = "taalbubbl.org";
  autheliaPort = 9091;
  autheliaDomain = "auth.${hostname}";
in {
  options.svar-calendar = {
    enable = mkEnableOption "Enable SVAR Calendar web client with Radicale CalDAV backend";

    data_dir = mkOption {
      type = types.str;
      default = "/var/lib/radicale";
      description = "Directory for Radicale storage";
    };
  };

  config = mkIf cfg.enable {
    services.radicale = {
      enable = true;
      settings = {
        server = {
          hosts = ["127.0.0.1:5232"];
          ssl = false;
        };
        auth = {
          type = "http_x_remote_user";
        };
        web = {
          type = "none";
        };
        storage = {
          filesystem_folder = "${cfg.data_dir}/collections";
        };
        logging = {
          #level = "info";
        };
      };
    };

    systemd.tmpfiles.rules = [
      "d ${cfg.data_dir} 0750 radicale radicale -"
    ];

    systemd.services.radicale.serviceConfig = {
      ReadWritePaths = [cfg.data_dir];
      ConfigurationDirectory = "radicale";
    };

    services.nginx.virtualHosts."cloud.${hostname}" = {
      forceSSL = true;
      enableACME = true;

      locations = {
        "/calendar/" = {
          alias = "${pkgs.svar-calendar}/";
          index = "index.html";
          extraConfig = ''
            auth_request /internal/authelia;
            auth_request_set $caldav_user $upstream_http_remote_user;
            error_page 401 =302 https://${autheliaDomain}/?rd=$scheme://$http_host$request_uri;

            try_files $uri $uri/ /calendar/index.html;
          '';
        };

        "/caldav/" = {
          proxyPass = "http://127.0.0.1:5232/";
          extraConfig = ''
            auth_request /internal/authelia;
            auth_request_set $caldav_user $upstream_http_remote_user;
            error_page 401 =302 https://${autheliaDomain}/?rd=$scheme://$http_host$request_uri;

            proxy_set_header X-Remote-User $caldav_user;
          '';
        };

        "/.well-known/caldav" = {
          return = "301 $scheme://$host/caldav/";
        };

        "/internal/authelia" = {
          extraConfig = ''
            internal;
            proxy_pass http://127.0.0.1:${toString autheliaPort}/api/verify;
            proxy_set_header X-Original-URL $scheme://$http_host$request_uri;
            proxy_set_header X-Forwarded-Method $request_method;
            proxy_pass_request_body off;
            proxy_set_header Content-Length "";
          '';
        };
      };
    };

    networking.firewall.allowedTCPPorts = [5232];
  };
}
