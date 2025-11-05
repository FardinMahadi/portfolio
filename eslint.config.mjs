import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // Prevent using incorrect bg-linear classes (should be bg-gradient)
      // Note: The warning you're seeing is likely from Tailwind CSS IntelliSense extension
      // This ESLint rule will catch actual usage of bg-linear in code
      "no-restricted-syntax": [
        "warn",
        {
          selector: "Literal[value=/bg-linear-/]",
          message:
            "Use 'bg-gradient-*' instead of 'bg-linear-*'. bg-linear is not a valid Tailwind CSS class.",
        },
      ],
    },
  },
  // File-specific rules for React/TypeScript files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // Warn about common mistakes
      "no-template-curly-in-string": "warn",
    },
  },
];

export default eslintConfig;
