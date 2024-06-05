import { module, test } from 'qunit';
import { getApplication } from '@ember/test-helpers';
import { setupApplicationTest } from '<%= name %>/tests/helpers';

module('Acceptance | app route', function (hooks) {
  setupApplicationTest(hooks);

  test('loaded initializers /', async function (assert) {
    const app = getApplication();
    assert.strictEqual([...app._applicationInstances][0].__instance_test_init, 'set in the instance initializer');
    assert.strictEqual(app.__test_init, 'coming from the initializer');
  });
});
