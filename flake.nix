{
  inputs = {
    nixpkgs.url = "https://channels.nixos.org/nixpkgs-unstable/nixexprs.tar.xz";
    systems.url = "github:nix-systems/default";
  };

  outputs =
    inputs:

    let
      eachSystem = inputs.nixpkgs.lib.genAttrs (import inputs.systems);
      eachSystem' = f: eachSystem (system: f (import inputs.nixpkgs { inherit system; }));
    in

    {
      devShells = eachSystem' (pkgs: {
        default = pkgs.mkShellNoCC {
          buildInputs = with pkgs; [
            nodejs-slim
            bun
            vtsls
          ];
        };
      });

      meta.package = inputs.nixpkgs.lib.importJSON ./package.json;
    };
}
