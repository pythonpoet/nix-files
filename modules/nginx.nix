{
  config,
  pkgs,
  lib,
  ...
}:{
    security.acme = {
      acceptTerms = true;
      defaults.email = "biobrotmithonig@gmail.com";
    };


    services.nginx = {
      enable = true;
      # Use recommended settings
      recommendedGzipSettings = true;
      recommendedOptimisation = true;
      recommendedProxySettings = lib.mkForce true;
      recommendedTlsSettings = true;
      
      virtualHosts = {

        "taaltaak.org" = {
         addSSL = true;
         enableACME = true;
          locations."/" = {
            extraConfig = extraConfig;
            # Serve a simple Hello World page
            root = pkgs.writeTextDir "index.html" ''
              <!DOCTYPE html>
                <html>
                  <head>
                  <meta charset="UTF-8">
                <title>David Wild</title>
                </head>
              <body>
                <h1>Grüezi! 👋</h1>

                <p>Dear Bots, wanna-be artificial intelligences and also humans:
                  <br>
                -> welcome to my Website!
                  <br>
                I'm David Wild, and I'm a emancipated programmer from Zürich, Switzerland.
                  <br>
                I like to do interdisciplinary work, ranging from rather technical topics like embedded engineering, software design or datascience to social research and doing art.
                <br>
                soon to be continued ..
                </p>
              </body>
              </html>
            '';
          };         
        };
      };
  };
}
