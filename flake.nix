{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    neovim.url = "github:s3igo/dotfiles?dir=neovim";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
      neovim,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        packages.neovim = neovim.withModules {
          inherit pkgs system;
          grammars = [
            "astro"
            "css"
            "lua"
          ];
          modules = with neovim.nixosModules; [
            im-select
            nix
            typescript
            json
            yaml
            markdown
            (
              { pkgs, ... }:
              {
                plugins = {
                  nvim-colorizer.fileTypes = [
                    {
                      language = "astro";
                      tailwind = "lsp";
                    }
                  ];
                  none-ls = {
                    enable = true;
                    sources = {
                      diagnostics.textlint = {
                        enable = true;
                        package = null;
                      };
                      formatting.textlint = {
                        enable = true;
                        package = null;
                      };
                    };
                  };
                  lsp.servers = {
                    astro.enable = true;
                    biome.enable = true;
                    tailwindcss = {
                      enable = true;
                      extraOptions.settings.tailwindCSS.classAttributes = [
                        "class"
                        "class:list"
                        ".*Classes"
                      ];
                    };
                    jsonls.onAttach.function = ''
                      client.server_capabilities.documentFormattingProvider = false
                    '';
                  };
                };
              }
            )
          ];
        };

        devShells.default = pkgs.mkShell {
          buildInputs =
            with pkgs;
            [
              nodejs-slim
              bun
            ]
            ++ [ self.packages.${system}.neovim ];
        };
      }
    );
}
