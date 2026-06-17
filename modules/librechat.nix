{
  config,
  pkgs,
  lib,
  ...
}:
with lib; let

  # Default values
  libreChatDefaults = {
    url = "chat.taalbubbl.org";
    port = 3456;
  };
  cfg = config.libreChat // libreChatDefaults;


in {
  options.libreChat = {
    enable = mkEnableOption "Enable libreChat";
    service_jwtsecret = mkOption {
      type = types.str;
    };

    url = mkOption {
      type = types.str;
    };

    port = mkOption {
      type = types.port;
      default = 3456;
    };

  };

  config = mkIf cfg.enable {
    services.nginx = {
      virtualHosts."${cfg.url}" = {
          locations."/" = {
            proxyPass = "http://127.0.0.1:${toString cfg.port}";
            proxyWebsockets = true;
            extraConfig = ''
              client_max_body_size 5000M;
              proxy_read_timeout   600s;
              proxy_send_timeout   600s;
              send_timeout         600s;
            '';
          };
      };
    };

    services.librechat = {
      enable = true;
      env.PORT = cfg.port;
      frontendScheme = "http";
      frontendHostname = cfg.url;

      #environmentFiles = [config.age.secrets.libreChat-config.path];

      database = {
        type = "sqlite";
        path = cfg.db_path;
      };

      settings = {
        service = {
        # If enabled, libreChat will send an email to everyone who is either
        # assigned to a task or created it when a task reminder is due.
        enableemailreminders = false;
        # Whether to let new users registering themselves or not
        enableregistration = false;
        # The maximum size clients will be able to request for user avatars.
        # If clients request a size bigger than this, it will be changed on the fly.
        maxavatarsize = 4096;
        # The duration of the issued JWT tokens in seconds.
        jwtttl = 2592000;
        # The duration of the "remember me" time in seconds. When the login request is
        # made with the long param set, the token returned will be valid for this period.
        jwtttllong = 25920000;
        maxitemsperpage = 100;
        # JWTsecret gets incerted by environment file
        jwtsecret = {
          file = config.sops.secrets.libreChat-jwt.path;
        };
        };
        #Configure openid
        auth = {
          local.enabled = false;
          openid = {
            enabled = true;
           providers = {
            # The key 'authelia' determines the redirect URI: /auth/openid/authelia
            authelia = {
              name = "Authelia";
              authurl = "https://auth.taalbubbl.org";
              logouturl = "https://auth.taalbubbl.org/logout";
              clientid = "libreChat";
              clientsecret = {
                file = config.sops.secrets.libreChat-client-secret.path;
              };
            };
          };
          };
        };
      };
    };
    networking.firewall.allowedTCPPorts = [cfg.port];

    systemd.services.libreChat = {
  # ... existing code ...

  serviceConfig = {
    Type = "simple";
    DynamicUser = true;

    # 1. Add this line:
    SupplementaryGroups = [ "keys" ];

    # 2. To ensure the secret is actually there when the service starts:
    # RequiresMountsFor = [ "/run/agenix" ];

    StateDirectory = "libreChat";
    ExecStart = "${cfg.package}/bin/libreChat";
    Restart = "always";

  };
};
  };
}
