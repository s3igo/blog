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
                  treesitter.grammarPackages = with pkgs.vimPlugins.nvim-treesitter.builtGrammars; [
                    astro
                    css
                  ];
                  lsp.servers = {
                    biome = {
                      enable = true;
                      filetypes = [
                        "javascript"
                        "javascriptreact"
                        "json"
                        "jsonc"
                        "typescript"
                        "typescript.tsx"
                        "typescriptreact"
                        "astro"
                      ];
                    };
                    astro.enable = true;
                    tailwindcss.enable = true;
                    jsonls.onAttach.function = ''
                      client.server_capabilities.documentFormattingProvider = false
                    '';
                  };
                };
              }
            )
          ];
        };

        devShells =
          let
            deps = with pkgs; [
              nodejs-slim
              nodePackages.pnpm
            ];
          in
          {
            default = pkgs.mkShell { buildInputs = deps ++ [ self.packages.${system}.neovim ]; };
            deps = pkgs.mkShell { buildInputs = deps; };
          };
      }
    );
}
