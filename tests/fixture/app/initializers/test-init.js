export default {
  name: 'test-init',
  initialize(application) {
    application.__test_init = 'coming from the initializer';
  },
};
