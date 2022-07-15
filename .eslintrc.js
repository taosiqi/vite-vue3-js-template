module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        'standard',
        './.eslintrc-auto-import.json',
        'prettier',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            modules: true,
        },
        requireConfigFile: false,
        parser: '@babel/eslint-parser',
    },
    plugins: ['vue'],
    rules: {
        'vue/multi-word-component-names': 'off',
        'no-debugger': 'off',
    },
}
