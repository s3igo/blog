{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    systems.url = "github:nix-systems/default";
  };

  outputs =
    inputs:

    let
      eachSystem = inputs.nixpkgs.lib.genAttrs (import inputs.systems);
      pkgsFor = eachSystem (system: import inputs.nixpkgs { inherit system; });
    in

    {
      devShells = eachSystem (system: {
        default =
          with pkgsFor.${system};
          mkShellNoCC {
            buildInputs = [
              nodejs-slim
              bun
              vtsls
            ];
          };
      });

      meta.package = inputs.nixpkgs.lib.importJSON ./package.json;
    };
}
