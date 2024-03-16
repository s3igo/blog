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
                    # astro.onAttach.function = ''
                    #   client.server_capabilities.documentFormattingProvider = false
                    # '';
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
