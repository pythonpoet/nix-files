{
  buildNpmPackage,
  lib,
}:
buildNpmPackage {
  pname = "svar-calendar";
  version = "0.1.0";

  src = lib.fileset.toSource {
    root = ./.;
    fileset = lib.fileset.unions [
      ./package.json
      ./package-lock.json
      ./svelte.config.js
      ./vite.config.ts
      ./tsconfig.json
      ./src
    ];
  };

  npmDepsHash = "sha256-ofWSrn7B1uoYbgVCNYv2Ny66f2r3tkkX3nBcxGgxtLc=";

  # svelte-kit sync needs write access to .svelte-kit
  configurePhase = ''
    runHook preConfigure
    cp -r $src/. .
    chmod -R u+w .
    runHook postConfigure
  '';

  buildPhase = ''
    runHook preBuild
    npx svelte-kit sync
    npm run build
    runHook postBuild
  '';

  installPhase = ''
    runHook preInstall
    cp -r build $out
    runHook postInstall
  '';
}
