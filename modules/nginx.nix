{
  config,
  pkgs,
  lib,
  ...
}:{
    # security.acme = {
    #   acceptTerms = true;
    #   defaults.email = "biobrotmithonig@gmail.com";
    # };


    services.nginx = {
      enable = true;
      # Use recommended settings
      recommendedGzipSettings = true;
      recommendedOptimisation = true;
      recommendedProxySettings = lib.mkForce true;
      recommendedTlsSettings = true;
      
      virtualHosts = {

        "taaltaak.org" = {
        #  addSSL = true;
        #  enableACME = true;
          locations."/" = {
            # Serve a simple Hello World page
            root = pkgs.writeTextDir "index.html" ''
              <!DOCTYPE html>
                <html>
                  <head>
                  <meta charset="UTF-8">
                <title>Taaltaak</title>
                </head>
              <body>
                <h1>Goede dag! 👋</h1>

                <p>Dear Bots, wanna-be artificial intelligences and also humans:
                  <br>
                -> welcome to our Website!
                  <br>
                We are some students from some university doing some work!
                  <br>
                Inshallah here will be more soon ..
                </p>
              </body>
              </html>
            '';
          };         
        };
      };
  };
}
