{
  description = "Pythonpoets nix files";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";
    
    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    inputs.agenix.url = "github:ryantm/agenix";
  };

  outputs = { self, nixpkgs, home-manager, agenix }:
    {
      nixosConfigurations = {
        chuchichaestli =
          nixpkgs.lib.nixosSystem {
            system = "x86_64-linux";
            modules = [
              ./machines/chuchichaestli/default.nix
              ./modules/cloudflaired.nix
              agenix.nixosModules.default
            ];
      };
    };
  };
}