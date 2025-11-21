## Types Migration Guide

1. **Audit current definitions** – Search `src/components` for inline `type` or `interface` declarations that live outside `src/components/types`. Tools like `rg "type .* =" src/components` and `rg "interface .*" src/components` help surface stray definitions.
2. **Move the files** – Relocate each definition into `src/components/types` (e.g., move `ContactFormPanelTypes.ts` → `types/contactFormPanelTypes.ts`). Keep file names meaningful and adjust directory structure if you need subdirectories (e.g., `types/contact/`).
3. **Use type-only imports** – Update components to import these symbols via `import type { ... } from "@/components/types/<name>"` (or from a dedicated barrel). This keeps runtime bundles lean and satisfies `perfectionist` ordering rules.
4. **Create barrels when helpful** – If multiple types belong together, add an `index.ts` inside `src/components/types` that re-exports them. Consumers can then rely on a single path (`@/components/types`) and you centralize maintenance.
5. **Lint & verify** – Run `pnpm lint` (and any relevant tests) after moving files to catch broken paths or ordering issues introduced by the reshuffle.
6. **Batch commits logically** – Group related moves into distinct commits (e.g., “refactor: migrate contact types to types folder”) so reviewers can understand each migration step at a glance.
