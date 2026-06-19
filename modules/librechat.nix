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
    # services.nginx = {
    #   virtualHosts."${cfg.url}" = {
    #       locations."/" = {
    #         proxyPass = "http://127.0.0.1:${toString cfg.port}";
    #         proxyWebsockets = true;
    #         extraConfig = ''
    #           client_max_body_size 5000M;
    #           proxy_read_timeout   600s;
    #           proxy_send_timeout   600s;
    #           send_timeout         600s;
    #         '';
    #       };
    #   };
    # };
    nixpkgs.config.allowUnfreePredicate = pkg: builtins.elem (lib.getName pkg) [
      "mongodb"
      "mongodb-ce"
    ];
    # use compiled version
    services.mongodb.package = pkgs.mongodb-ce;
    services.librechat = {
      enable = true;
      env = {
        PORT = cfg.port;

        # LibreChat needs to know its own public URL for OAuth redirects.
        DOMAIN_CLIENT = "https://${cfg.url}";
        DOMAIN_SERVER = "https://${cfg.url}";

        # --- Authelia OIDC ---
        # Social login must be enabled for the OpenID provider to show up,
        # and social *registration* lets first-time Authelia users get an
        # account provisioned automatically.
        ALLOW_SOCIAL_LOGIN = true;
        ALLOW_SOCIAL_REGISTRATION = true;

        # OPENID_ISSUER is the Authelia issuer base; LibreChat appends
        # /.well-known/openid-configuration for discovery.
        OPENID_ISSUER = "https://${config.authelia.domain}";
        OPENID_CLIENT_ID = "librechat";
        OPENID_SCOPE = "openid profile email";
        # Must match the redirect_uri registered on the Authelia client below.
        OPENID_CALLBACK_URL = "/oauth/openid/callback";
        OPENID_BUTTON_LABEL = "Login with Authelia";
        # Secrets (OPENID_CLIENT_SECRET, OPENID_SESSION_SECRET) live in the
        # credentialsFile env file alongside the JWT/CREDS keys.
      };
      # EnvironmentFile holding REQUESTY_API_KEY plus the required
      # CREDS_KEY/CREDS_IV/JWT_SECRET/JWT_REFRESH_SECRET and the OIDC secrets.
      credentialsFile = config.sops.secrets.requesty-token.path;
      enableLocalDB = true;
      settings = {
        cache = true;
        endpoints = {
          custom = [
            {
              apiKey = "\${REQUESTY_API_KEY}";
              baseURL = "https://router.eu.requesty.ai/v1";
              modelDisplayLabel = "Requesty";
              models = {
                default = [
                  "nebius/deepseek-ai/deepseek-v4-pro"
                ];
                fetch = true;
              };
              name = "Requesty";
              titleConvo = true;
              titleModel = "Requesty";
            }
          ];
        };
        interface = {
            privacyPolicy = {
              externalUrl = "https://librechat.ai/privacy-policy";
              openNewTab = true;
            };
          };
          version = "1.3.9";
      };
    };
    networking.firewall.allowedTCPPorts = [cfg.port];

  };
}
