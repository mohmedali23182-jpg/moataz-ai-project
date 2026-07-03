# Changelog

All notable changes to the Moataz AI platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0-foundation] — 2026-07-03

### Added
- **Clean Architecture Skeleton**: Set up the physical folder structures for `domain`, `application`, `infrastructure`, `presentation`, and `shared`.
- **Strict Linting & Compiling Gates**: Added `.eslintrc.json` (with strict import boundary restrictions) and `tsconfig.json` (strict-mode type checking).
- **Design System Configuration**: Configured `tailwind.config.ts` and `postcss.config.js` with primary, secondary, card, border, and custom visual transition tokens.
- **Enterprise Documentation Suite**: Generated `README.md`, `ARCHITECTURE.md`, `CODING_STANDARDS.md`, `PROJECT_STRUCTURE.md`, `DESIGN_SYSTEM.md`, `DEVELOPMENT_GUIDE.md`, `ROADMAP.md`, and `CONTRIBUTING.md`.
- **Pre-commit Standards**: Established `.prettierrc` formatting guidelines and `.gitignore` safety specifications.
