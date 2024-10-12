import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from '<%= name %>/tests/helpers';

module('Acceptance | welcome page', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /index shows the welcome page', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    assert.dom('h1').containsText('Congratulations, you made it!');
  });
});
