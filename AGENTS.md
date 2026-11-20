## Before you finish

Run `vp run check:all` and do not finish until it passes. The pre-push hook and CI run the same task: format, lint and type checks (`vp check`), `astro check`, Stylelint, knip, jscpd, cspell, the disable-comment scan, the build, `vp test` (unit and build-contract tests on `dist/`), html-validate and the lychee link check.

- Never switch a check off inline. `oxlint-disable`, `eslint-disable`, `stylelint-disable`, `@ts-ignore`, `@ts-expect-error` and `@ts-nocheck` comments are refused. Fix the code instead.
- Keep `.astro` files thin. Logic goes into `.ts` modules, where the strict lint and type rules apply; oxlint does not read `.astro` templates.
- Colors, font families, spacing and transition durations come from design tokens (`var(--…)`). Raw values are allowed only in `src/styles/tokens.css`. No `!important`, no ID selectors, no animations. Declarations follow the recess property order (positioning, box model, typography, visual); Stylelint `--fix` sorts them.
- Add new words for the spell check to `cspell/project-words-en.txt`, `-de.txt` or `-ja.txt` (romaji).
- Commit messages are Conventional Commits, checked by `cog`. Commits on `main` and pushes to `main` are refused.
- `cog`, `gitleaks` and `lychee` are pinned release binaries, downloaded to `bin/` and checksum-verified by `scripts/run-pinned.sh <tool>`. To upgrade one, change `tools/<tool>.version` and run `scripts/pin-tool.sh <tool>`.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Built-in Commands vs Scripts

`vp <name>` runs a built-in command. `vp run <name>` runs a `package.json` script or a `vite.config.ts` task. Scripts cannot overwrite built-ins, so `vp dev` and `vp run dev` may do different things. Check `package.json` and `vite.config.ts` first, and run `vp run <name>` when the project defines a script or task with that name.

## Running Scripts

Run TypeScript and JavaScript files with `vpx <file>`, for example `vpx ./scripts/seed.ts --dry-run`. It handles enums, decorators, JSX, and tsconfig `paths`, so do not add `tsx` or `ts-node` to run scripts. `vpx --watch <file>` reruns the file when a file it uses changes, in place of `tsx watch`. `vp node <file>` runs plain Node.js.

## Tool Versions

Run `vp toolchain` to show versions and relationships in the active Vite+
release. Add a tool name to select part of the graph. For example, run
`vp toolchain vite`. Use `--global` to ignore the local `vite-plus` package. Use
`vp why <package>` to show the package-manager dependency graph.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

## Agent skills

### Issue tracker

Issues and PRDs live as GitHub issues on DannyFestor/portfolio, managed via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
