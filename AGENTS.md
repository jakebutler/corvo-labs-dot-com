# Agents

## Cursor Cloud specific instructions

### Overview

This is a Next.js 15 website (Corvo Labs AI consulting) located in `/workspace/corvo-labs-enhanced/`. Single service, no databases, no Docker. All commands run from that directory.

### Running the application

```bash
cd /workspace/corvo-labs-enhanced
bun dev          # Dev server at http://localhost:3000
```

### Key commands

| Task | Command |
|------|---------|
| Dev server | `bun dev` |
| Build | `bun run build` |
| Type check | `bun type-check` |
| Lint (ESLint CLI) | `npx eslint ./src` |

### Non-obvious notes

- **`next lint` is deprecated** in Next.js 15.5+. Use `npx eslint ./src` directly instead.
- **No ESLint config existed in the repo** — `eslint.config.mjs` was added during setup. Without it, neither `next lint` nor `bun run build` can succeed.
- **`react/no-unescaped-entities`** is downgraded to a warning in the ESLint config because the existing codebase has multiple unescaped apostrophes/quotes. The build would fail with it as an error.
- **External services are optional**: Resend (email), MailerLite (newsletter), PostHog (analytics) require API keys in `.env.local` but the site runs fully without them. The contact form returns a clear error about missing `RESEND_API_KEY` when not configured.
- **Bun is the preferred runtime** (`bun.lock` present). Node/npm also works but Bun is faster.
- **Husky pre-commit hook** runs `corvo-labs-enhanced/scripts/coderabbit-review.sh` which may require the CodeRabbit CLI. This can be skipped in cloud agent environments.
- **No automated test suite** exists in this project (no test runner configured, no test files).
