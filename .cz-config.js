module.exports = {
  types: [
    { value: 'feat', name: 'feat: A new feature' },
    { value: 'fix', name: 'fix: A bug fix' },
    { value: 'WIP', name: 'WIP: Work in progress' },
    { value: 'refactor', name: 'refactor: A code change that neither fixes a bug nor adds a feature', },
    { value: 'test', name: 'test: Adding tests' },
    { value: 'tools', name: 'tools: Anything related to the project\'s tools' },
    { value: 'perf', name: 'perf: A code change that improves performance', },
    { value: 'revert', name: 'revert:   Revert to a commit' },
  ],

  // override the messages, defaults are as follows
  messages: {
    type: "Select the type of change that you're committing:",
    subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional):\n',
    footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?',
  },

  // skip any questions you want
  skipQuestions: ['scope', 'customScope', 'breaking', 'footer'],

  // limit subject length
  subjectLimit: 100,
};