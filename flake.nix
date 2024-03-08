{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    { nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            statix
            nodejs-slim
            nodePackages.pnpm
          ];
          shellHook = ''
            node --version > .node-version
            if [ -e package.json ]; then
              corepack use "pnpm@$(pnpm --version)"
            fi
          '';
        };

        formatter = pkgs.nixfmt-rfc-style;
      }
    );
}
