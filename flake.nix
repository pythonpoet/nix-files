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
              {
               vikunja = {
                  enable = true;
                  # db_path = "/data1/vikunja/db/vikunja.db";
                  # files_path = "/data1/vikunja/files";
                  #secretConfigFile = age.secrets.vikunja-config.path;
                };
              }
              agenix.nixosModules.default
            ];
      };
    };
  };
}