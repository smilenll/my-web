# Git Hooks

This directory contains custom Git hooks that run automatically during git operations.

## Pre-Push Hook

**What it does:** Runs before every `git push` to ensure code quality.

**Checks performed:**
1. ✅ **ESLint** - Code linting (`npm run lint`)
2. ✅ **Build** - TypeScript compilation and production build (`npm run build`)

**How it works:**
```bash
git push  # Hook automatically runs before push
```

If checks fail, the push is **blocked** and you'll see error messages.

## Bypassing the Hook (Emergency Only)

**⚠️ Only use when absolutely necessary!**

```bash
# Skip pre-push hook (not recommended)
git push --no-verify
```

**When to bypass:**
- Urgent hotfix deployment
- CI will catch the errors anyway
- Working on a WIP branch

## Installation

Already configured! The hooks are automatically active because of:
```bash
git config core.hooksPath .githooks
```

## Customizing

To modify the pre-push hook, edit: `.githooks/pre-push`

To disable completely:
```bash
git config --unset core.hooksPath
```

## Benefits

✅ Catch errors **before** pushing
✅ Faster feedback than waiting for CI
✅ Keep main branch clean
✅ Save CI/CD resources
