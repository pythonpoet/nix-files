{
    services.cloudflared = {
      enable = true;
      tunnels = {
      "chuchichaestli_tunnel" = {
        credentialsFile = "/home/david/.cloudflared/8e979e98-e5fe-4d52-9112-ad4b2f10b955.json";
        default = "http_status:404";
      };
      };
    };
}