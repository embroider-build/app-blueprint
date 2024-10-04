/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type ApplicationInstance from '@ember/application/instance';

export default {
  name: 'test-instance-initializers',
  initialize(instance: ApplicationInstance) {
    (instance as any).__instance_test_init = 'set in the instance initializer';
  },
};
