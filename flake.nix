{
  description = "Pythonpoets nix files";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";
    
    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, home-manager }:
    rec {
      nixosConfigurations = {
        zuerich =
          nixpkgs.lib.nixosSystem {
            system = "x86_64-linux";
            modules = [
              ./machines/zuerich/configuration.nix
            ];
          };
      };
    };
}