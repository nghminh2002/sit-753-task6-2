module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [0],
    'type-empty': [0],
    'type-case': [0],
    'subject-empty': [0],
    'scope-case': [0],
    'commit-check': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        // eslint-disable-next-line no-unused-vars
        'commit-check': ({ type }) => {
          return [true];
        },
      },
    },
  ],
};
