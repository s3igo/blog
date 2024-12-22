{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    systems.url = "github:nix-systems/default";
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
      systems,
      nixvim,
      neovim-config,
    }:

    let
      eachSystem = nixpkgs.lib.genAttrs (import systems);
      pkgsFor = eachSystem (system: import nixpkgs { inherit system; });
    in

    {
      packages = eachSystem (system: {
        neovim = nixvim.legacyPackages.${system}.makeNixvim {
          imports = with neovim-config.nixosModules; [
            default
            nix
            typescript
            json
            yaml
            markdown
            {
              plugins = {
                colorizer.settings.user_default_options.tailwind = "lsp";
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
                  # BiomeでJSONをフォーマットするためjsonlsのフォーマット機能を無効化
                  jsonls.onAttach.function = ''
                    client.server_capabilities.documentFormattingProvider = false
                  '';
                };
              };
            }
          ];
        };
      });

      devShells = eachSystem (
        system:
        let
          pkgs = pkgsFor.${system};
        in
        {
          default = pkgs.mkShellNoCC {
            buildInputs = [
              pkgs.nodejs-slim
              pkgs.bun
              (neovim-config.lib.customName {
                inherit pkgs;
                nvim = self.packages.${system}.neovim;
              })
            ];
          };
        }
      );
    };
}
