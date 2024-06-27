export default {
  name: 'test-instance-initializers',
  initialize(instance) {
    instance.__instance_test_init = 'set in the instance initializer';
  },
};
