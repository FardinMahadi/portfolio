# AI Setup Prompt: Import Ordering & Spacing Configuration

Use this prompt with AI IDEs (Cursor, GitHub Copilot, etc.) to configure ESLint import ordering with pyramid structure and spacing between groups.

---

## Prompt for AI IDE

````
Configure ESLint to enforce import ordering with the following requirements:

1. **Import Grouping Order** (with blank lines between groups):
   - Type imports first (from external packages)
   - External packages (React, libraries, etc.)
   - MUI imports (@mui/*)
   - Custom route imports (src/routes/*)
   - Custom hook imports (src/hooks/*)
   - Custom utility imports (src/utils/*)
   - Other internal imports (src/*)
   - Custom component imports (src/components/*)
   - Custom section imports (src/sections/*)
   - Custom auth imports (src/auth/*)
   - Custom type imports (src/types/*)
   - Relative imports (parent, sibling, index)
   - Relative type imports (parent-type, sibling-type, index-type)

2. **Sorting Style**:
   - Sort imports by line length within each group (creates pyramid structure)
   - Alphabetical order within same line length
   - Case-insensitive sorting

3. **Spacing**:
   - Always add blank lines between different import groups
   - No blank lines within the same group

4. **Additional Rules**:
   - Enforce newline after all imports
   - Remove unused imports automatically
   - Use TypeScript import resolver

5. **Plugins Required**:
   - eslint-plugin-perfectionist (for import sorting)
   - eslint-plugin-import (for import validation)
   - eslint-plugin-unused-imports (for removing unused imports)

Please:
1. Install the required packages if not already installed
2. Configure eslint.config.mjs (or equivalent ESLint config file) with the perfectionist/sort-imports rule
3. Set up custom groups for the internal import patterns
4. Ensure the configuration matches the following structure:

```javascript
'perfectionist/sort-imports': [
  2, // error level
  {
    order: 'asc',
    ignoreCase: true,
    type: 'line-length', // creates pyramid structure
    newlinesBetween: 'always', // blank lines between groups
    internalPattern: ['^src/.+'],
    groups: [
      'style',
      'side-effect',
      'type',
      ['builtin', 'external'],
      'custom-mui',
      'custom-routes',
      'custom-hooks',
      'custom-utils',
      'internal',
      'custom-components',
      'custom-sections',
      'custom-auth',
      'custom-types',
      ['parent', 'sibling', 'index'],
      ['parent-type', 'sibling-type', 'index-type'],
      'object',
      'unknown',
    ],
    customGroups: {
      value: {
        'custom-mui': ['^@mui/.+'],
        'custom-routes': ['^src/routes/.+'],
        'custom-hooks': ['^src/hooks/.+'],
        'custom-utils': ['^src/utils/.+'],
        'custom-types': ['^src/types/.+'],
        'custom-sections': ['^src/sections/.+'],
        'custom-components': ['^src/components/.+'],
        'custom-auth': ['^src/auth/.+'],
      },
    },
  },
],
````

Also configure:

- 'import/newline-after-import': 2
- 'unused-imports/no-unused-imports': 1
- TypeScript import resolver settings

```

---

## Alternative: Simplified Prompt

If you want a shorter version:

```

Set up ESLint import ordering with:

- Pyramid structure (sort by line length within groups)
- Blank lines between import groups
- Group order: types → external → @mui → src/routes → src/hooks → src/utils → internal → src/components → src/sections → relative imports
- Use eslint-plugin-perfectionist with 'perfectionist/sort-imports' rule
- Configure custom groups for src/\* patterns
- Set newlinesBetween: 'always' and type: 'line-length'

````

---

## Step-by-Step Manual Setup

If you prefer to set it up manually or want to understand what the AI will do:

### 1. Install Required Packages

```bash
npm install -D eslint-plugin-perfectionist eslint-plugin-import eslint-plugin-unused-imports eslint-import-resolver-typescript
````

### 2. Add to `eslint.config.mjs`

```javascript
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import importPlugin from 'eslint-plugin-import';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';

const customGroups = {
  mui: 'custom-mui',
  routes: 'custom-routes',
  hooks: 'custom-hooks',
  utils: 'custom-utils',
  types: 'custom-types',
  sections: 'custom-sections',
  components: 'custom-components',
  auth: 'custom-auth',
};

export default [
  // ... your existing config
  {
    plugins: {
      perfectionist: perfectionistPlugin,
      import: importPlugin,
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      'perfectionist/sort-imports': [
        2,
        {
          order: 'asc',
          ignoreCase: true,
          type: 'line-length',
          newlinesBetween: 'always',
          internalPattern: ['^src/.+'],
          groups: [
            'style',
            'side-effect',
            'type',
            ['builtin', 'external'],
            customGroups.mui,
            customGroups.routes,
            customGroups.hooks,
            customGroups.utils,
            'internal',
            customGroups.components,
            customGroups.sections,
            customGroups.auth,
            customGroups.types,
            ['parent', 'sibling', 'index'],
            ['parent-type', 'sibling-type', 'index-type'],
            'object',
            'unknown',
          ],
          customGroups: {
            value: {
              [customGroups.mui]: ['^@mui/.+'],
              [customGroups.routes]: ['^src/routes/.+'],
              [customGroups.hooks]: ['^src/hooks/.+'],
              [customGroups.utils]: ['^src/utils/.+'],
              [customGroups.types]: ['^src/types/.+'],
              [customGroups.sections]: ['^src/sections/.+'],
              [customGroups.components]: ['^src/components/.+'],
              [customGroups.auth]: ['^src/auth/.+'],
            },
          },
        },
      ],
      'import/newline-after-import': 2,
      'unused-imports/no-unused-imports': 1,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
  },
];
```

### 3. Adjust Custom Groups

Modify the `customGroups` object to match your project structure:

```javascript
const customGroups = {
  mui: 'custom-mui',
  // Add your project-specific patterns
  api: 'custom-api', // if you have src/api/*
  layouts: 'custom-layouts', // if you have src/layouts/*
  // ... etc
};
```

And update the `customGroups.value` mapping:

```javascript
customGroups: {
  value: {
    [customGroups.mui]: ['^@mui/.+'],
    [customGroups.api]: ['^src/api/.+'],
    [customGroups.layouts]: ['^src/layouts/.+'],
    // ... etc
  },
},
```

---

## Verification

After setup, test with a file that has mixed imports:

```typescript
// Before (should be auto-fixed)
import { useState } from 'react';
import type { Theme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import { Button } from './button';

// After (expected result)
import type { Theme } from '@mui/material/styles';

import { useState } from 'react';

import { Box } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { Button } from './button';
```

Run:

```bash
npm run lint:fix
```

---

## Customization Options

### Change Pyramid to Alphabetical

```javascript
type: 'alphabetical', // instead of 'line-length'
```

### Remove Spacing Between Groups

```javascript
newlinesBetween: 'never', // instead of 'always'
```

### Change Group Order

Reorder items in the `groups` array to match your preference.

---

## Troubleshooting

**Imports not sorting correctly:**

- Check that `eslint-plugin-perfectionist` is installed
- Verify the rule is set to error level (2) not warning (1)
- Run `npm run lint:fix` to auto-fix

**No spacing between groups:**

- Ensure `newlinesBetween: 'always'` is set
- Check that groups are properly defined

**Type imports not separating:**

- Verify `'type'` is in the groups array before other groups
- Check that type imports use `import type` syntax

---

**Last Updated**: 2024
**Compatible With**: ESLint 9+, TypeScript projects
