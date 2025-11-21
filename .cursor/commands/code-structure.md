## Code Structure Guidance

1. **Start with docs/ai/README.md** – Review the high-level goals, architecture principles, and conventions documented there before changing structural elements.
2. **Follow subsystem guides** – Refer to the relevant `docs/ai` subfolders (e.g., `training-guide`, `quick-prompt`) for practice patterns such as component naming, layout decisions, or animation hooks; mirror their directory examples.
3. **Preserve existing folders** – When adding new components or utilities, keep them aligned with their thematic homes (`components`, `data`, `lib`, etc.) as outlined in the guides so navigation stays logical. When refactoring types, mirror the feature grouping under `src/components/types` (e.g., `about`, `landing`, `resume`, `shared`) and rely on the barrel `index.ts` files so consumers import from the feature directory instead of individual files.
4. **Document architectural decisions** – If a change introduces a new pattern, log it back in `docs/ai/architecture` (or whichever guide fits) so future contributors can follow the same rationale.
5. **Validate with lint/tests** – After restructuring and whenever new code is written, run `pnpm lint -- --fix` (or other relevant verification) so lint errors are resolved and imports stay aligned with the architecture described in the guides.
6. **Keep code readable** – Use consistent naming, spacing, and file grouping as the docs recommend so any parts of the project remain easy for subsequent contributors to understand.
