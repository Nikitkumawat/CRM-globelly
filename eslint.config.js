import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import eslintReact from 'eslint-plugin-react/configs/recommended.js';
import jsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';


export default tseslint.config(
    {ignores: ['dist']},
    {
        settings:{
            "react": {
                "version": "detect"
            }
        },
        ignores: [
            'src/api/**', // Generated API clients
            'src/components/catalyst/*' // Catalyst components
        ],
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommendedTypeChecked,
            eslintReact,
            jsxRuntime,
            eslintPluginPrettierRecommended
        ],
        files: ['src/**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions:{
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            }
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
            'react/jsx-max-depth': ['error', {max: 6}],
            'react/jsx-max-props-per-line': ['error', {maximum: 3, when: 'multiline'}],
            'max-lines-per-function': ['error', {max: 200, skipBlankLines: true, skipComments: true}],
        },
    },
)
