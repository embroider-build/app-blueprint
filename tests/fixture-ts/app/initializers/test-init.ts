/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type Application from '@ember/application';

export default {
  name: 'test-init',
  initialize(application: Application) {
    (application as any).__test_init = 'coming from the initializer';
  },
};
