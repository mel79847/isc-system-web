module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    jest: true, // Si estás usando Jest para pruebas
  },
  parser: '@typescript-eslint/parser', // Para que ESLint entienda TypeScript
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Habilitar soporte para JSX
    },
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint', // Para las reglas de TypeScript
    'jsx-a11y',
    'import',
    'prettier',
    'unused-imports',
    'promise',
    'security', // Mantén este plugin
    'jest',
    'sonarjs'
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript', // Permite usar imports en TypeScript
    'airbnb-base',
    'plugin:jest/recommended',
    'prettier', // Para evitar conflictos de Prettier
  ],
  ignorePatterns: [
    'dist', // Ignorar dist
    '.eslintrc.cjs', // Ignorar la configuración ESLint
    'node_modules', // Ignorar node_modules
    'coverage', // Ignorar cobertura de pruebas
    'Dockerfile', // Ignorar Dockerfile
    '*.conf', // Ignorar archivos .conf
    '*.yml', // Ignorar archivos .yml
    'vite.config.ts', // Ignorar archivo de configuración de Vite
    'tailwind.config.js', // Ignorar archivo de configuración de Tailwind
  ], 
  settings: {
    react: {
      version: 'detect', // Detecta automáticamente la versión de React
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx','.json'],
      },
    },
  },
  rules: {
    'no-console': 'warn',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'prefer-const': 'error',
    'no-undef': 'error',
    eqeqeq: ['error', 'always'],
    'no-multi-spaces': ['error'],
    'brace-style': ['error', '1tbs'],
    curly: ['error', 'all'],
    'prefer-destructuring': ['error', { object: true, array: false }],
    indent: ['error', 2],
    semi: ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'no-inline-comments': 'error',
    'sonarjs/no-duplicate-string': 'warn',
    'sonarjs/cognitive-complexity': ['warn', 15],
    'promise/always-return': 'warn',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',
    'promise/catch-or-return': 'warn',
    'promise/no-nesting': 'warn',
    "import/extensions": "off",
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'error',
    'react/jsx-pascal-case': ['error', { 'allowAllCaps': false }],
    'react/jsx-no-undef': 'error',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/no-deprecated': 'warn',
    'react/no-did-mount-set-state': 'warn',
    'react/no-did-update-set-state': 'warn',
    'react/no-multi-comp': ['error', { 'ignoreStateless': true }],
    'react/no-unknown-property': 'error',
    'react/require-default-props': 'off',
    'react/forbid-prop-types': 'warn',
    'react/jsx-no-bind': 'warn',
    'react/jsx-curly-brace-presence': ['error', { 'props': 'never', 'children': 'always' }],
    'react/jsx-max-props-per-line': ['error', { 'maximum': 3 }],
    'react/no-array-index-key': 'warn',
    'react/no-adjacent-inline-elements': 'error',
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-equals-spacing': ['error', 'always'],
  },
};