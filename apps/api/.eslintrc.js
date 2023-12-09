module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
        "jest/globals": true
    },
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint",
        "jest"
    ],
    extends: [    
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    overrides: [],
    parserOptions: {
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        }
    },
    rules: {
        semi: [2, 'always'],
        indent: ['error', 4],
        'space-before-function-paren': ['error', 'never'],
    },
};
