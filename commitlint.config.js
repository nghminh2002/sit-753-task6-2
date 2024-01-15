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
        'commit-check': ({ type, scope, subject }) => {
          const tips = '\n👉  Example: feat(PM-1234): brief description of the task';
          const types = [
            'build',
            'ci',
            'docs',
            'feat',
            'fix',
            'perf',
            'refactor',
            'revert',
            'style',
            'test',
          ];

          const emptySubject = !subject || subject.trim().length === 0;
          if (emptySubject) return [false, `Invalid subject format. ${tips}`];

          const illegalType = types.indexOf(type) < 0;
          if (illegalType) return [false, `Invalid type format: ${types.join(', ')}. ${tips}`];

          const scopePattern = /release|NoTicket|[A-Z]+-\d+/;
          if (!scopePattern.test(scope)) return [false, `Invalid ticket format. ${tips}`];

          const formatSpecialCharacters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
          if (formatSpecialCharacters.test(subject))
            return [false, `Special characters included. ${tips}`];

          return [true];
        },
      },
    },
  ],
};
