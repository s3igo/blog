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
            (
              { pkgs, ... }:

              {
                plugins = {
                  treesitter.grammarPackages = with pkgs.vimPlugins.nvim-treesitter.builtGrammars; [
                    javascript
                    jsdoc
                    typescript
                    tsx
                    regex
                  ];
                  lsp.servers.tsserver.enable = true;
                  none-ls = {
                    enable = true;
                    sources.formatting.prettier = {
                      enable = true;
                      disableTsServerFormatter = true;
                    };
                  };
                  ts-autotag.enable = true;
                  ts-context-commentstring.enable = true;
                };
              }
            )
            # json
            (
              { pkgs, ... }:

              {
                plugins = {
                  treesitter.grammarPackages = with pkgs.vimPlugins.nvim-treesitter.builtGrammars; [
                    json
                    json5
                    regex
                  ];
                  lsp.servers.jsonls.enable = true;
                };
              }
            )
            # prettier
            {
              plugins = {
                none-ls = {
                  enable = true;
                  sources.formatting.prettier = {
                    enable = true;
                    disableTsServerFormatter = true;
                  };
                };
              };
            }
            # yaml
            (
              { pkgs, ... }:

              {
                plugins = {
                  treesitter.grammarPackages = with pkgs.vimPlugins.nvim-treesitter.builtGrammars; [
                    yaml
                    regex
                  ];
                  lsp.servers.yamlls.enable = true;
                };
              }
            )
            # markdown
            (
              { pkgs, ... }:

              {
                plugins = {
                  treesitter.grammarPackages = with pkgs.vimPlugins.nvim-treesitter.builtGrammars; [
                    markdown
                    markdown_inline
                    regex
                  ];
                };
              }
            )
            # project specific
            (
              { pkgs, ... }:
              {
                plugins = {
                  treesitter.grammarPackages = with pkgs.vimPlugins.nvim-treesitter.builtGrammars; [
                    astro
                    css
                  ];
                  lsp.servers = {
                    eslint.enable = true;
                    astro.enable = true;
                    tailwindcss.enable = true;
                  };
                };
              }
            )
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
