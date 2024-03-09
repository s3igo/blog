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
        devShells.default = pkgs.mkShell {
          buildInputs =
            with pkgs;
            [
              statix
              nodejs-slim
              nodePackages.pnpm
            ]
            ++ [ neovim ];
        };

        packages = {
          inherit neovim;
        };

        formatter = pkgs.nixfmt-rfc-style;
      }
    );
}
