# Changelog

All notable changes to Generous UI will be documented in this file.

## 0.1.2 - 2026-05-27

- Improved mobile target sizing for switches, calendars, breadcrumb links, app chrome links, filter summaries, and input groups.
- Expanded visual checks to cover 320px mobile, zoomed mobile text, and visible interactive targets below 44px.

## 0.1.1 - 2026-05-27

- Fixed published dependency metadata so consuming React apps use their own `react` and `react-dom` copies instead of installing duplicate React runtimes.

## 0.1.0 - 2026-05-27

- Established the Generous UI name, package, CLI, registry, and source-copy install model.
- Added React components, patterns, CSS variables, registry metadata, generated registry detail data, and visual/behavior checks.
- Added `generous-ui init`, `add`, `list`, `show`, `doctor`, `validate`, and `coverage`.
- Added package smoke tests that install the packed tarball into a temporary project and run the CLI from that install.
