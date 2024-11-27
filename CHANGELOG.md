# Changelog

## Release (2024-11-27)

@embroider/app-blueprint 0.17.0 (minor)

#### :rocket: Enhancement
* `@embroider/app-blueprint`
  * [#119](https://github.com/embroider-build/app-blueprint/pull/119) Remove webpack from dependencies ([@simonihmig](https://github.com/simonihmig))

#### Committers: 1
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))

## Release (2024-11-27)

@embroider/app-blueprint 0.16.1 (patch)

#### :bug: Bug Fix
* `@embroider/app-blueprint`
  * [#117](https://github.com/embroider-build/app-blueprint/pull/117) Stick to vite v5 for now ([@simonihmig](https://github.com/simonihmig))

#### Committers: 1
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))

## Release (2024-11-23)

@embroider/app-blueprint 0.16.0 (minor)

#### :rocket: Enhancement
* `@embroider/app-blueprint`
  * [#116](https://github.com/embroider-build/app-blueprint/pull/116) bump @ember/test-helpers and stop ember-qunit from using requirejs ([@mansona](https://github.com/mansona))

#### :house: Internal
* `@embroider/app-blueprint`
  * [#74](https://github.com/embroider-build/app-blueprint/pull/74) add a test to verify generators are still working ([@mansona](https://github.com/mansona))
  * [#112](https://github.com/embroider-build/app-blueprint/pull/112) delete TS file in JS fixture ([@mansona](https://github.com/mansona))

#### Committers: 1
- Chris Manson ([@mansona](https://github.com/mansona))

## Release (2024-11-18)

@embroider/app-blueprint 0.15.0 (minor)

#### :rocket: Enhancement
* `@embroider/app-blueprint`
  * [#107](https://github.com/embroider-build/app-blueprint/pull/107) Update ember cli to 6.0 ([@mansona](https://github.com/mansona))

#### :bug: Bug Fix
* `@embroider/app-blueprint`
  * [#110](https://github.com/embroider-build/app-blueprint/pull/110) fix upstream issue with typescript-eslint ([@mansona](https://github.com/mansona))

#### Committers: 1
- Chris Manson ([@mansona](https://github.com/mansona))

## Release (2024-11-11)

@embroider/app-blueprint 0.14.0 (minor)

#### :rocket: Enhancement
* `@embroider/app-blueprint`
  * [#80](https://github.com/embroider-build/app-blueprint/pull/80) Fix support for `--typescript` ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
  * [#104](https://github.com/embroider-build/app-blueprint/pull/104) Remove ember-cli-inject-live-reload dependency ([@HeroicEric](https://github.com/HeroicEric))

#### Committers: 2
- Eric Kelly ([@HeroicEric](https://github.com/HeroicEric))
- [@NullVoxPopuli](https://github.com/NullVoxPopuli)

## Release (2024-10-24)

@embroider/app-blueprint 0.13.1 (patch)

#### :bug: Bug Fix
* `@embroider/app-blueprint`
  * [#102](https://github.com/embroider-build/app-blueprint/pull/102) Add missing babel packages ([@balinterdi](https://github.com/balinterdi))

#### Committers: 1
- Balint Erdi ([@balinterdi](https://github.com/balinterdi))

## Release (2024-10-07)

@embroider/app-blueprint 0.13.0 (minor)

#### :rocket: Enhancement
* `@embroider/app-blueprint`
  * [#97](https://github.com/embroider-build/app-blueprint/pull/97) Use @embroider/virtual instead of @embroider/core for test-support ([@NullVoxPopuli](https://github.com/NullVoxPopuli))

#### :house: Internal
* `@embroider/app-blueprint`
  * [#101](https://github.com/embroider-build/app-blueprint/pull/101) Create new 'output' script for a short way to run the generator ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
  * [#99](https://github.com/embroider-build/app-blueprint/pull/99) Move more files to the files-override/shared folder ([@NullVoxPopuli](https://github.com/NullVoxPopuli))

#### Committers: 1
- [@NullVoxPopuli](https://github.com/NullVoxPopuli)

## Release (2024-10-04)

@embroider/app-blueprint 0.12.0 (minor)

#### :rocket: Enhancement
* `@embroider/app-blueprint`
  * [#96](https://github.com/embroider-build/app-blueprint/pull/96) fix all @embroider/virtual renames ([@mansona](https://github.com/mansona))
  * [#91](https://github.com/embroider-build/app-blueprint/pull/91) Allow skipping lint:fix when installing ([@kiwiupover](https://github.com/kiwiupover))

#### :house: Internal
* `@embroider/app-blueprint`
  * [#93](https://github.com/embroider-build/app-blueprint/pull/93) Extract an output:fixture command for manual testing ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
  * [#94](https://github.com/embroider-build/app-blueprint/pull/94) Parameterize the default tests for quickly adding scenarios to test ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
  * [#87](https://github.com/embroider-build/app-blueprint/pull/87) Extract project creation util so that multiple test files can share the "ember new + fixture" stuff ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
  * [#88](https://github.com/embroider-build/app-blueprint/pull/88) Use local ember-cli instead of global ([@NullVoxPopuli](https://github.com/NullVoxPopuli))

#### Committers: 3
- Chris Manson ([@mansona](https://github.com/mansona))
- Dave Laird ([@kiwiupover](https://github.com/kiwiupover))
- [@NullVoxPopuli](https://github.com/NullVoxPopuli)

## Release (2024-09-26)

@embroider/app-blueprint 0.11.0 (minor)

#### :rocket: Enhancement
* `@embroider/app-blueprint`
  * [#86](https://github.com/embroider-build/app-blueprint/pull/86) use the new load initializers and resolver ([@mansona](https://github.com/mansona))
  * [#83](https://github.com/embroider-build/app-blueprint/pull/83) Add prettier config (with `<template>` support ([@NullVoxPopuli](https://github.com/NullVoxPopuli))

#### :memo: Documentation
* `@embroider/app-blueprint`
  * [#76](https://github.com/embroider-build/app-blueprint/pull/76) pnpx => pnpm dlx ([@NullVoxPopuli](https://github.com/NullVoxPopuli))

#### :house: Internal
* `@embroider/app-blueprint`
  * [#84](https://github.com/embroider-build/app-blueprint/pull/84) Run linting on the generated project in CI // add a working eslintconfig ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
  * [#82](https://github.com/embroider-build/app-blueprint/pull/82) Split the lint and test jobs so we can see tests running during draft work ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
  * [#81](https://github.com/embroider-build/app-blueprint/pull/81) Prepare for typescript support by moving all the js files into a js folder ([@NullVoxPopuli](https://github.com/NullVoxPopuli))

#### Committers: 2
- Chris Manson ([@mansona](https://github.com/mansona))
- [@NullVoxPopuli](https://github.com/NullVoxPopuli)

## Release (2024-09-18)

@embroider/app-blueprint 0.10.1 (patch)

#### :bug: Bug Fix
* `@embroider/app-blueprint`
  * [#70](https://github.com/embroider-build/app-blueprint/pull/70) fix: Uninstall task fails gracefully when given packages are not found ([@MichalBryxi](https://github.com/MichalBryxi))
  * [#73](https://github.com/embroider-build/app-blueprint/pull/73) recreate issue with decorator transforms in tests and fix it ([@mansona](https://github.com/mansona))

#### :house: Internal
* `@embroider/app-blueprint`
  * [#71](https://github.com/embroider-build/app-blueprint/pull/71) add a test for dev mode tests ([@mansona](https://github.com/mansona))

#### Committers: 2
- Chris Manson ([@mansona](https://github.com/mansona))
- Michal Bryxí ([@MichalBryxi](https://github.com/MichalBryxi))

## Release (2024-09-11)

@embroider/app-blueprint 0.10.0 (minor)

#### :rocket: Enhancement
* `@embroider/app-blueprint`
  * [#68](https://github.com/embroider-build/app-blueprint/pull/68) update to user-controlled babel file ([@mansona](https://github.com/mansona))

#### Committers: 1
- Chris Manson ([@mansona](https://github.com/mansona))

## Release (2024-09-07)

@embroider/app-blueprint 0.9.0 (minor)

#### :rocket: Enhancement
* `@embroider/app-blueprint`
  * [#65](https://github.com/embroider-build/app-blueprint/pull/65) update to work without app rewriting ([@mansona](https://github.com/mansona))

#### Committers: 1
- Chris Manson ([@mansona](https://github.com/mansona))

## Release (2024-09-02)

@embroider/app-blueprint 0.8.0 (minor)

#### :rocket: Enhancement
* `@embroider/app-blueprint`
  * [#62](https://github.com/embroider-build/app-blueprint/pull/62) move the index.html into the root of the blueprint ([@mansona](https://github.com/mansona))

#### Committers: 1
- Chris Manson ([@mansona](https://github.com/mansona))

## Release (2024-09-02)

@embroider/app-blueprint 0.7.2 (patch)

#### :bug: Bug Fix
* `@embroider/app-blueprint`
  * [#60](https://github.com/embroider-build/app-blueprint/pull/60) Add /tmp/ to files-override/.gitignore ([@kiwiupover](https://github.com/kiwiupover))

#### Committers: 1
- Dave Laird ([@kiwiupover](https://github.com/kiwiupover))

## Release (2024-09-02)

@embroider/app-blueprint 0.7.1 (patch)

#### :bug: Bug Fix
* `@embroider/app-blueprint`
  * [#58](https://github.com/embroider-build/app-blueprint/pull/58) Fixes app import paths in index.html ([@kiwiupover](https://github.com/kiwiupover))

#### Committers: 1
- Dave Laird ([@kiwiupover](https://github.com/kiwiupover))

## Release (2024-08-31)

@embroider/app-blueprint 0.7.0 (minor)

#### :rocket: Enhancement
* `@embroider/app-blueprint`
  * [#57](https://github.com/embroider-build/app-blueprint/pull/57) add fixes for new test structure ([@mansona](https://github.com/mansona))

#### Committers: 1
- Chris Manson ([@mansona](https://github.com/mansona))

## Release (2024-08-06)

@embroider/app-blueprint 0.6.0 (minor)

#### :rocket: Enhancement
* `@embroider/app-blueprint`
  * [#50](https://github.com/embroider-build/app-blueprint/pull/50) add git ignore for tmp file ([@mansona](https://github.com/mansona))

#### Committers: 1
- Chris Manson ([@mansona](https://github.com/mansona))

## Release (2024-08-03)

@embroider/app-blueprint 0.5.2 (patch)

#### :bug: Bug Fix
* `@embroider/app-blueprint`
  * [#47](https://github.com/embroider-build/app-blueprint/pull/47) Update to use explicit resolve.extensions ([@ef4](https://github.com/ef4))

#### Committers: 1
- Edward Faulkner ([@ef4](https://github.com/ef4))

## Release (2024-07-25)

@embroider/app-blueprint 0.5.1 (patch)

#### :house: Internal
* `@embroider/app-blueprint`
  * [#44](https://github.com/embroider-build/app-blueprint/pull/44) change dependabot versioning strategy to increase ([@mansona](https://github.com/mansona))
  * [#43](https://github.com/embroider-build/app-blueprint/pull/43) set packageManager in package.json and rely on that in CI ([@mansona](https://github.com/mansona))
  * [#38](https://github.com/embroider-build/app-blueprint/pull/38) add a test that verifies that the esbuild step was successful ([@mansona](https://github.com/mansona))

#### Committers: 1
- Chris Manson ([@mansona](https://github.com/mansona))

## Release (2024-06-27)

@embroider/app-blueprint 0.5.0 (minor)

#### :rocket: Enhancement
* `@embroider/app-blueprint`
  * [#37](https://github.com/embroider-build/app-blueprint/pull/37) add new app.js structure ([@mansona](https://github.com/mansona))

#### :memo: Documentation
* `@embroider/app-blueprint`
  * [#33](https://github.com/embroider-build/app-blueprint/pull/33) Add a bigger warning for this repo ([@mansona](https://github.com/mansona))

#### :house: Internal
* `@embroider/app-blueprint`
  * [#28](https://github.com/embroider-build/app-blueprint/pull/28) add regression tests for initialisers ([@mansona](https://github.com/mansona))
  * [#35](https://github.com/embroider-build/app-blueprint/pull/35) add notification for failed github action ([@mansona](https://github.com/mansona))

#### Committers: 1
- Chris Manson ([@mansona](https://github.com/mansona))

## Release (2024-06-13)

@embroider/app-blueprint 0.4.0 (minor)

#### :rocket: Enhancement
* `@embroider/app-blueprint`
  * [#31](https://github.com/embroider-build/app-blueprint/pull/31) fix the location of the rewritten app ([@mansona](https://github.com/mansona))

#### :memo: Documentation
* `@embroider/app-blueprint`
  * [#30](https://github.com/embroider-build/app-blueprint/pull/30) docs: document update command ([@IgnaceMaes](https://github.com/IgnaceMaes))
  * [#21](https://github.com/embroider-build/app-blueprint/pull/21) add docs for updating an existing app ([@mansona](https://github.com/mansona))

#### Committers: 2
- Chris Manson ([@mansona](https://github.com/mansona))
- Ignace Maes ([@IgnaceMaes](https://github.com/IgnaceMaes))

## Release (2024-05-31)

@embroider/app-blueprint 0.3.0 (minor)

#### :rocket: Enhancement
* `@embroider/app-blueprint`
  * [#18](https://github.com/embroider-build/app-blueprint/pull/18) add new config structure ([@mansona](https://github.com/mansona))

#### Committers: 1
- Chris Manson ([@mansona](https://github.com/mansona))

## Release (2024-05-27)

@embroider/app-blueprint 0.2.1 (patch)

#### :bug: Bug Fix
* `@embroider/app-blueprint`
  * [#17](https://github.com/embroider-build/app-blueprint/pull/17) Add smoke tests and fix the app-name.css link in index.html ([@mansona](https://github.com/mansona))

#### :memo: Documentation
* `@embroider/app-blueprint`
  * [#11](https://github.com/embroider-build/app-blueprint/pull/11) docs: use npx instead of ember-cli global ([@IgnaceMaes](https://github.com/IgnaceMaes))

#### :house: Internal
* `@embroider/app-blueprint`
  * [#15](https://github.com/embroider-build/app-blueprint/pull/15) schedule CI to run once a day ([@mansona](https://github.com/mansona))
  * [#14](https://github.com/embroider-build/app-blueprint/pull/14) add a dependabot config to keep ember-cli up to date ([@mansona](https://github.com/mansona))

#### Committers: 2
- Chris Manson ([@mansona](https://github.com/mansona))
- Ignace Maes ([@IgnaceMaes](https://github.com/IgnaceMaes))

## Release (2024-05-24)

@embroider/app-blueprint 0.2.0 (minor)

#### :rocket: Enhancement
* `@embroider/app-blueprint`
  * [#6](https://github.com/embroider-build/app-blueprint/pull/6) Remove unneeded deps ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
  * [#9](https://github.com/embroider-build/app-blueprint/pull/9) make sure ember-cli-update config is correct ([@mansona](https://github.com/mansona))

#### :house: Internal
* `@embroider/app-blueprint`
  * [#10](https://github.com/embroider-build/app-blueprint/pull/10) add a basic smoke test ([@mansona](https://github.com/mansona))
  * [#7](https://github.com/embroider-build/app-blueprint/pull/7) Add prettier ([@mansona](https://github.com/mansona))

#### Committers: 2
- Chris Manson ([@mansona](https://github.com/mansona))
- [@NullVoxPopuli](https://github.com/NullVoxPopuli)

## Release (2024-05-24)

@embroider/app-blueprint 0.1.1 (patch)

#### :bug: Bug Fix
* `@embroider/app-blueprint`
  * [#4](https://github.com/embroider-build/app-blueprint/pull/4) add ember-blueprint to keywords ([@mansona](https://github.com/mansona))

#### Committers: 1
- Chris Manson ([@mansona](https://github.com/mansona))

## Release (2024-05-24)

@embroider/app-blueprint 0.1.0 (minor)

#### :rocket: Enhancement
* `@embroider/app-blueprint`
  * [#1](https://github.com/embroider-build/app-blueprint/pull/1) Initial working version ([@mansona](https://github.com/mansona))

#### :house: Internal
* `@embroider/app-blueprint`
  * [#2](https://github.com/embroider-build/app-blueprint/pull/2) setup release-plan ([@mansona](https://github.com/mansona))

#### Committers: 1
- Chris Manson ([@mansona](https://github.com/mansona))
