# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Last release of this plugin is 7.27.1 (9th of nov. 2021).

## v7.30.0 - 1st jul. 2022
 - fix: Use branch stable as a failsafe in CI
 - ci: add moodle 4 on the ci workflow matrix
 - ci: add cd workflow

## v7.29.0 - 20th jun. 2022

- fix(ci): moodle code checker errors (#19424)
- Change links to make them have UTMs #KB-25028.
- Make links open in a new tab #KB-25519

## v7.27.1 - 9th nov. 2021
- Fix "missing ['privacy:metadata']" from @christina-roperto contribution #61
- Improve the "MathType Moodle Plugins Suite" software development cycle.
  - Use 'ubuntu-latest' for the Moodle Plugin CI workflow.
  - Add 'on:schedule' trigger property to run the tests every morning.
  - Add 'on:workflow_dispatch' trigger property to run test on demand.
  - Improve code comments to match internal code guidelines.
## v7.27.0
- Bump 'MathType for TinyMCE4' to 7.27.0.

## v7.27.0 - 22nd of july 2021
- Bump 'MathType for TinyMCE4' to 7.27.0.

## v7.26.1
- Feature: 'Migrate MathType plugins suite from TravisCI to Github Actions'.
- Fixed 'Plugin not loading when Moodle install folder is different from the root' (KB-13266).
- Bump 'MathType for TinyMCE4' to 7.26.2 (KB-13266).

## v7.26.0
- Add a test to validate button visibility settings.
- [KB-7506]: Fix & upgrade TravisCI job configuration.
  - Support for PHP7_3 and PHP7_4.
  - Support for Moodle3_10 and Moodle3_11.
  - Enable `fast_finish` option.
  - Don't use the `blackboard-open-source` distro until it's fixed.
  - Add `Contributing` section to the README file.
- Add a npm command that updates the MathType TinyMCE library. 
- Update project documentation by improving the main `README` file.
- Start using `CHANGES` file as changelog.