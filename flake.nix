{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    nixvim = {
      url = "github:nix-community/nixvim";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    neovim-config.url = "github:s3igo/dotfiles?dir=neovim-config";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
      nixvim,
      neovim-config,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        packages.neovim = nixvim.legacyPackages.${system}.makeNixvim {
          imports =
            with neovim-config.nixosModules;
            [
              default
              nix
              typescript
              json
              yaml
              markdown
            ]
            ++ [
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
                    taplo.enable = true;
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
