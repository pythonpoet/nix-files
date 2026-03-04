
{ config, pkgs, lib, ... }:

{
  imports =
    [ # Include the results of the hardware scan.
      ./hardware-configuration.nix
    ];

  # Bootloader.
  boot.loader.systemd-boot.enable = true;
  boot.loader.efi.canTouchEfiVariables = true;

  nix.settings= {
          trusted-users = [ "david" ];
          experimental-features = ["nix-command" "flakes"];
        };

  networking.hostName = "zurich"; # Define your hostname.
  # networking.wireless.enable = true;  # Enables wireless support via wpa_supplicant.

  # Enable networking
  networking.networkmanager.enable = true;

  # Set your time zone.
  time.timeZone = "Europe/Zurich";

  users.users.david = {
    isNormalUser = true;
    description = "david";
    extraGroups = [ "networkmanager" "wheel" ];
    packages = with pkgs; [];
    openssh.authorizedKeys.keys = 
    let
      keysContent = builtins.readFile (builtins.fetchurl {
        url = "https://github.com/pythonpoet.keys";
        sha256 = "0kyfd5baakdy21g7grlmpr5wyfl41fz8fp6iqa5kp674a0mwr6jp";
      });
    in
    builtins.filter (key: key != "") 
      (lib.strings.splitString "\n" keysContent);
  };
   
  # List packages installed in system profile. To search, run:
  # $ nix search wget
  environment.systemPackages = with pkgs; [
  #  vim # Do not forget to add an editor to edit configuration.nix! The Nano editor is also installed by default.
  #  wget
   git
   helix
   wget
   curl
   tmux
  ];

  # Some programs need SUID wrappers, can be configured further or are
  # started in user sessions.
  # programs.mtr.enable = true;
  # programs.gnupg.agent = {
  #   enable = true;
  #   enableSSHSupport = true;
  # };

  # List services that you want to enable:

  # Enable the OpenSSH daemon.
  services.openssh.enable = true;
  services.tailscale.enable = true;


}
