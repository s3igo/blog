{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    dotfiles.url = "github:s3igo/dotfiles";
  };

  outputs =
    {
      nixpkgs,
      flake-utils,
      dotfiles,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
        neovim = dotfiles.neovim.${system} {
          inherit pkgs;
          modules = with dotfiles.nixosModules; [
            im-select
            nix
            # typescript
          ];
        };
      in
      {
        packages = {
          inherit neovim;
        };

        devShells =
          let
            deps = with pkgs; [
              nodejs-slim
              nodePackages.pnpm
            ];
          in
          {
            default = pkgs.mkShell { buildInputs = deps ++ [ neovim ]; };
            deps = pkgs.mkShell { buildInputs = deps; };
          };
      }
    );
}
