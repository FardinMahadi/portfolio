# Quick AI Prompt: Import Ordering Setup

Copy and paste this prompt into your AI IDE (Cursor, GitHub Copilot, etc.):

---

## Copy-Paste Prompt

```
Configure ESLint import ordering for this project with:

1. Pyramid structure: Sort imports by line length within each group (type: 'line-length')
2. Spacing: Add blank lines between different import groups (newlinesBetween: 'always')
3. Group order:
   - Type imports (from external)
   - External packages (React, libraries)
   - @mui/* imports
   - src/routes/* imports
   - src/hooks/* imports
   - src/utils/* imports
   - Other internal src/* imports
   - src/components/* imports
   - src/sections/* imports
   - src/auth/* imports
   - src/types/* imports
   - Relative imports (./, ../)
   - Relative type imports

4. Use eslint-plugin-perfectionist with this config:
   - 'perfectionist/sort-imports' rule at error level (2)
   - Custom groups for src/* patterns
   - TypeScript import resolver

5. Also enable:
   - 'import/newline-after-import': 2
   - 'unused-imports/no-unused-imports': 1

Install required packages and update eslint.config.mjs (or equivalent) with the full configuration.
```

---

## Even Shorter Version

```
Set up ESLint import ordering: pyramid structure (line-length), blank lines between groups, group order: types → external → @mui → src/routes → src/hooks → src/utils → internal → src/components → src/sections → relative. Use eslint-plugin-perfectionist with custom groups for src/* patterns.
```

---

For detailed instructions, see `docs/AI_SETUP_PROMPT.md`
