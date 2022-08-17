module.exports = {
    extends: 'standard-with-typescript',
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        'no-unused-vars': 'on',
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/no-namespace': 'off',
    },
};