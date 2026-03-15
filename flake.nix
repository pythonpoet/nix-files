{
  description = "Pythonpoets nix files";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/master";
    
    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    agenix.url = "github:ryantm/agenix";
  };

  outputs = { self, nixpkgs, home-manager, agenix }:
    {
      nixosConfigurations = {
        chuchichaestli =
          nixpkgs.lib.nixosSystem {
            system = "x86_64-linux";
            modules = [
              ./machines/chuchichaestli/default.nix
              ./modules/cloudflared.nix
              ./modules/nginx.nix
              ./modules/vikunja.nix
              ./modules/authentik.nix
              {
               vikunja = {
                  enable = true;
                  # db_path = "/data1/vikunja/db/vikunja.db";
                  # files_path = "/data1/vikunja/files";
                  #secretConfigFile = age.secrets.vikunja-config.path;
                };
                authentik = {
                  enable = false;
                };
              }
              agenix.nixosModules.default
              home-manager.nixosModules.home-manager
              {
                home-manager.useGlobalPkgs = true;
                home-manager.useUserPackages = true;
                home-manager.users.david = { ... }: {
                  home.sessionVariables = {
                    SSH_AUTH_SOCK = "/home/david/.bitwarden-ssh-agent.sock";
                  };
                };
              }
            ];
      };
    };
  };
}