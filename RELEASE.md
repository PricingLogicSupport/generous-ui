# Release Checklist

Use this checklist before publishing Generous UI to npm.

## One-Time Setup

- Confirm the repository, homepage, and issue URLs in `package.json` point to the intended GitHub repo.
- Confirm the npm package name is still available:

```bash
npm view generous-ui name version description --json
```

- Confirm npm login and publish rights:

```bash
npm whoami
```

## Before Every Release

1. Review [CHANGELOG.md](./CHANGELOG.md) and move the next entry from `Unreleased` to the release date.
2. Confirm version in `package.json` and `package-lock.json`.
3. Run the release gate:

```bash
npm run release:check
```

4. Run visual QA when UI docs or component styling changed:

```bash
npm run behavior:check
npm run visual:check
```

5. Inspect package contents:

```bash
npm pack --dry-run
```

6. Publish when the package contents and checks are correct:

```bash
npm publish
```

`prepublishOnly` runs `npm run release:check`, so a publish attempt should fail if the type, registry, pack, or tarball smoke checks fail.

## After Publishing

- Install from npm into a blank project and run:

```bash
npx generous-ui@latest init
npx generous-ui@latest add AlertDialog
npx generous-ui@latest doctor
```

- Create a git tag for the released version.
- Update the next `CHANGELOG.md` section to `Unreleased`.
