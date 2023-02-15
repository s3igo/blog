import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import astroEslintParser from "astro-eslint-parser";
import typescriptEslintParser from "@typescript-eslint/parser";
import a11y from "eslint-plugin-jsx-a11y";

// ESModuleでCommonJSの`__dirname`を使うためのハック
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// `.eslintrc`用の設定をFlat Configの形式に変換するためのクラス
const compat = new FlatCompat({
    baseDirectory: __dirname,
});

export default [
    ...compat.extends("plugin:astro/recommended", "plugin:jsx-a11y/recommended", "prettier"),
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
        },
        plugins: {
            a11y,
        },
    },
    {
        files: ["*.astro"],
        languageOptions: {
            parser: astroEslintParser,
            parserOptions: {
                parser: typescriptEslintParser,
                extraFileExtensions: [".astro"],
            },
        },
    },
];
