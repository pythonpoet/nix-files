
{ config, pkgs, lib, ... }:

{
  imports =
    [ # Include the results of the hardware scan.
      ./hardware-configuration.nix
    ];

  programs.nh = {
    enable = true;
    clean.enable = true;
    clean.extraArgs = "--keep-since 4d --keep 3";
    flake = "/home/david/nix-files"; # sets NH_OS_FLAKE variable for you
  };

  # Bootloader.
  boot.loader.systemd-boot.enable = true;
  boot.loader.efi.canTouchEfiVariables = true;

  nix.settings.experimental-features = ["nix-command" "flakes"];


  networking.hostName = "chuchichaestli"; # Define your hostname.
  # networking.wireless.enable = true;  # Enables wireless support via wpa_supplicant.

  # Enable networking
  networking.networkmanager.enable = true;

  # Set your time zone.
  time.timeZone = "Europe/Zurich";
  programs.zsh.enable = true;
  users.users.david = {
    isNormalUser = true;
    shell = pkgs.zsh;
    description = "david";
    extraGroups = [ "networkmanager" "wheel" ];
    packages = with pkgs; [];
    openssh.authorizedKeys.keys = 
    let
      keysContent = builtins.readFile (builtins.fetchurl {
        url = "https://github.com/pythonpoet.keys";
        sha256 = "";
      });
    in
    builtins.filter (key: key != "") 
      (lib.strings.splitString "\n" keysContent);
  };
  users.users.tonda = {
    isNormalUser = true;
    description = "Tonda";
    shell = pkgs.zsh;
    extraGroups = [ "networkmanager" "wheel" ];
    packages = with pkgs; [];
    openssh.authorizedKeys.keys = 
    let
      keysContent = builtins.readFile (builtins.fetchurl {
        url = "https://github.com/styn10.keys";
        sha256 = "07ivc1hzgdd6096wpcssxnx7m6b14d2c03f490cd795yz43vb3cw";
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
   cloudflared
   ragenix
   rbw
   pinentry-curses
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
