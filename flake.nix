{
  description = "Pythonpoets nix files";

  inputs = {
    nixpkgs.url = "github:taalbubbl/nixpkgs/master";
    
    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    agenix.url = "github:ryantm/agenix";

    taalbubbl.url = "git+ssh://git@github.com/taalbubbl/taalbubbl?ref=main";
  };

  outputs = { self, nixpkgs, home-manager, agenix, taalbubbl}:
    {
      nixosConfigurations = {
        chuchichaestli =
          nixpkgs.lib.nixosSystem {
            system = "x86_64-linux";
            modules = [
              taalbubbl.nixosModules.default
              #./security/secrets.nix
              ./machines/chuchichaestli/default.nix
              ./modules/cloudflared.nix
              ./modules/nginx.nix
              ./modules/vikunja.nix
              #./modules/authentik.nix
              {
                age = {
                  identityPaths= [
                    "/home/david/.ssh/id_ed25519"
                  ];
                  # secrets.borg.file = "/home/david/dotfiles/secrets/borg.age";
                  # secrets.vaultwarden.file = "/home/david/dotfiles/secrets/vaultwarden.age";
                  # secrets.authentik.file = "/home/david/dotfiles/secrets/authentik.age";
                  # secrets.maxmind-licence.file = "/home/david/dotfiles/secrets/maxmind-licence.age";

                  secrets.vikunja-config = {
                    file = "/home/david/nix-files/security/vikunja-config.age";
                    mode = "0440";
                    group = "keys"; 
                  };
                  secrets.vikunja-client-secret= {
                    file = "/home/david/nix-files/security/vikunja-client-secret.age";
                    mode = "0440";
                    group = "keys"; 
                  };
                  secrets.vikunja-jwt = {
                    file = "/home/david/nix-files/security/vikunja-jwt.age";
                    mode = "0440";
                    group = "keys"; 
                  };
                };
               vikunja = {
                  enable = true;
                  # db_path = "/data1/vikunja/db/vikunja.db";
                  # files_path = "/data1/vikunja/files";
                  #secretConfigFile = age.secrets.vikunja-config.path;
                };
                services.taalbubbl = {
                  enable = true;
                  database = {
                    name = "taalbubbl";
                    user = "taalbubbl";
                    host = "/run/postgresql";
                    port = 5432;
                  };
                };
                # authentik = {
                #   enable = false;
                # };
              }
              agenix.nixosModules.default
              home-manager.nixosModules.home-manager
              {
                home-manager.useGlobalPkgs = true;
                home-manager.useUserPackages = true;
                home-manager.users.david = { ... }: {
                  programs.zsh = {
                    enable = true;
                    enableCompletion = true;
                    autosuggestion.enable = true;
                    syntaxHighlighting.enable = true;
                  };
                  home.stateVersion = "26.05";
                  home.sessionVariables = {
                    SSH_AUTH_SOCK = "$XDG_RUNTIME_DIR/rbw/ssh-agent-socket";
                    EDITOR = "hx";
                  };
                };
                # disable for rbw
                programs.ssh.startAgent = true;
                

              }
            ];
      };
    };
  };
}
