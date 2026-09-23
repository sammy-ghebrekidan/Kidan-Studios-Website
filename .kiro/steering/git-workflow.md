---
inclusion: always
---

# Git Workflow

## Branch Rules

- **Always commit and push to `develop` first** — never directly to `main`
- `main` is production-only, only updated via merge from `develop`
- Before starting any work, ensure you are on the `develop` branch

## Standard Workflow

```bash
git checkout develop
git pull origin develop
# ... make changes ...
git add <files>
git commit -m "type: description"
git push origin develop
```

## Commit Message Format

Use conventional commits:
- `feat:` new feature
- `fix:` bug fix
- `chore:` maintenance, deps, config
- `refactor:` code changes with no behaviour change
- `docs:` documentation only
