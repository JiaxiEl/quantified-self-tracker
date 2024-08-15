module.exports = {
  root: true,
  env: {
    browser: true,  // For frontend files
    node: true,     // For backend files
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    '@typescript-eslint',
    'react',
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  overrides: [
    {
      files: ['server/**/*.js', 'server/**/*.ts'],  // Backend files
      env: {
        node: true,  // Ensure Node.js globals are recognized
        browser: false,
      },
      rules: {
        // You can add specific rules for your backend here
      },
    },
    {
      files: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'],  // Frontend files
      env: {
        node: false,
        browser: true,  // Ensure browser globals are recognized
      },
      rules: {
        // You can add specific rules for your frontend here
      },
    },
  ],
};
