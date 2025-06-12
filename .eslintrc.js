module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: [
    'plugin:prettier/recommended'
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 120
      }
    ]
  },
  overrides: [
    {
      files: ['*.component.html', '*.html'],
      rules: {
        'prettier/prettier': [
          'error',
          {
            printWidth: 120
          }
        ]
      }
    },
    {
      files: ['*.component.ts', '*.ts'],
      rules: {
        'prettier/prettier': [
          'error',
          {
            printWidth: 120
          }
        ]
      }
    },
    {
      files: ['*.component.scss', '*.scss'],
      rules: {
        'prettier/prettier': [
          'error',
          {
            printWidth: 120
          }
        ]
      }
    }
  ]
};
