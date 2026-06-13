# Agent Instructions

<!-- BEGIN:nextjs-agent-rules -->

## Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated - the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

## Repository Context

- This repository is a **monorepo managed with npm workspaces**.
- Main application code lives in `apps/`. Shared code lives in `packages/`.

## Monorepo Conventions

- Treat each directory under `packages/` as an independently testable/buildable unit within the workspace graph.
- Keep package-level changes aligned with root tooling and scripts (do not bypass root conventions).

## High-Value Working Rules for AI Agents

- Keep changes **small, focused, and local** to the requested scope.
- Changes under `archives/` do not require review unless the user explicitly asks for one.
- Refer to at least three similar existing code examples and patterns in the repository for guidance.
- Prefer editing existing files/patterns instead of introducing new abstractions.
- When touching package code, check for related workspace dependencies in sibling packages under `packages/` and in `apps/`.

## Bootstrapping

- In a fresh clone, run `npm install` from the repo root before attempting tests, builds, lint, or package changes.
- Before running browser tests, run `npx playwright install chromium --with-deps --only-shell` from the repo root.
- Do not start validation or implementation work until the install has completed successfully, because the workspace dependencies are required across the monorepo.

## Test/Build/Lint Workflow (required before finalizing)

Run from repo root:

- `npm run test`
- `npm run build:pkg`
- `npm run build:b` when the change affects `apps/blog/` runtime or production output
- `npm run build:m` when the change affects `apps/moing/` runtime or production output
- `npm run lint`

Sandbox note:

- If `npm run lint` fails only because `editorconfig-checker` cannot download its binary due to the DNS proxy in this environment, treat that specific failure as ignorable and continue with the remaining validation results.

For faster iteration, use workspace-scoped commands when appropriate:

- `npm run test -w <workspace-name>`
- `npm run build -w <workspace-name>`
- `npm run dev -w <workspace-name>`

## Testing Style

- All tests should be DAMP (Descriptive And Meaningful Phrase).
- Do not use `for` iteration to generate test cases. Prefer individually named tests that clearly describe the scenario.
- Avoid helper functions in tests when direct assertions are practical; prefer repeating explicit assertions so each test stays readable on its own.

## Pull Request Workflow

Use this guide when preparing any PR in this repository.

### 1. PR Title (required)

- Title format is validated by `.github/workflows/pull-request.yml`.
- Use Conventional Commits: `<type>(<scope>): <description>` (optionally `<type>(<scope>)!: <description>` for breaking changes)

#### `type` rules

- `feat`, `fix`, `build`, `chore`, `ci`, `docs`, `perf`, `refactor`, `revert`, `style`, `test` are the only allowed types. Do not invent new types or use non-standard ones.

#### `scope` rules

- The workflow extracts allowed scopes from every `package.json` `name` field in the repo.
- Use an existing package/application name such as `blog`, `@lumir/utils`, `@lumir/react-kit`, `@lumir/rehype-plugins`, or `@lumir/remark-plugins`.
- Use `*` for repo-wide/docs/tooling changes when a single package scope is not appropriate.
- Additional allowed scopes are `deps`, `deps-dev`, `release`, `sync-server`, and `sync-client`.
- `deps` and `deps-dev` are intended for `chore` changes that update dependencies.

#### `description` rules

- Imperative mood (`add`, `fix`, `update`, not `added`, `fixed`, `updated`)
- First letter must be lowercase
- Keep concise and specific

#### Title examples

- feat(@lumir/react-kit): add `icon-size` prop
- fix(blog): handle missing auth state
- docs(*): update `AGENTS.md`

### 2. PR Description (required)

Follow the repository PR template exactly and keep content concise.

- **summary**: what changed and why
- **scope**: affected packages/directories (for example `apps/...`, `packages/...`)
- **validation**: commands run and results (for example `npm run test`, `npm run build:pkg`, `npm run lint`)
- **notes**: any limitations or follow-up items

### 3. Quality checks before submitting

- Title matches the required format.
- Description is complete and aligned with actual changes.
- Test/Build/Lint status is explicitly documented.
- No unrelated or speculative changes are included.

## Documentation & Communication Policy

- Public-facing GitHub content (PRs, issues, review comments, commit titles/descriptions) should be **English** when possible.
- Local/offline communication language is flexible.

## Change Quality Bar

- Include only discoverable, codebase-backed changes.
- Avoid speculative refactors and broad formatting churn.
- Call out any assumptions when code context is incomplete.
- Prefer explicit file references in explanations (for example: `apps/...`, `packages/...`, `.github/workflows/pull-request.yml`).

### Codex-only Review Priority Guide

- The priority labels below apply **only** to Codex-generated reviews and follow-up comments.
- Use review priorities where P0 is highest urgency and P1 is high priority.
- Flag security regressions as P0.
- Treat typos and grammar issues in docs as P1.
- Flag missing documentation as P1.
- Flag missing tests for behavior changes as P1.
