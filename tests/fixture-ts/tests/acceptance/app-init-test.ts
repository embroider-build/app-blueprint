/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { module, test } from 'qunit';
import { getApplication } from '@ember/test-helpers';
import { assert as debugAssert } from '@ember/debug';
import { setupApplicationTest } from '<%= name %>/tests/helpers';

module('Acceptance | app route', function (hooks) {
  setupApplicationTest(hooks);

  test('loaded initializers /', function (assert) {
    const app = getApplication();

    debugAssert(`App failed to initialize`, app);

    assert.strictEqual(
      ([...app._applicationInstances][0] as any).__instance_test_init,
      'set in the instance initializer',
    );
    assert.strictEqual((app as any).__test_init, 'coming from the initializer');
  });
});
