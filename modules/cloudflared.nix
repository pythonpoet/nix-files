{
    services.cloudflared = {
      enable = true;
      tunnels = {
      "chuchichaestli_tunnel" = {
        credentialsFile = "/home/david/.cloudflared/cert.pem";
        default = "http_status:404";
      };
      };
    };
}