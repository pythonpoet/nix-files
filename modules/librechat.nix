{
  config,
  pkgs,
  lib,
  ...
}:
with lib; let

  # Default values
  librechatDefaults = {
    url = "chat.taalbubbl.org";
    port = 3080;
  };
  cfg = config.librechat // librechatDefaults;


in {
  options.librechat = {
    enable = mkEnableOption "Enable librechat";
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
      credentialsFile = config.sops.secrets.requesty-token.path;
      settings = {
        cache = true;
        endpoints = {
          custom = [
            {
              apiKey = "\${REQUESTY_API_KEY}";
              baseURL = "https://router.requesty.ai/v1";
              modelDisplayLabel = "Requesty";
              models = {
                default = [
                  "nebius/glm-5.2"
                ];
                fetch = true;
              };
              name = "GLM: EU";
              titleConvo = true;
              titleModule = "nebius/glm-5.2";
            }
          ];
        };
      };
    };
    networking.firewall.allowedTCPPorts = [cfg.port];

  };
}
