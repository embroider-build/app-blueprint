import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from '<%= name %>/tests/helpers';

module('Acceptance | styles', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /styles', async function (assert) {
    await visit('/styles');

    assert.dom('.styles-test').hasStyle(
      {
        'background-color': 'rgb(0, 0, 255)',
      },
      'The background should be blue if the app styles are working correctly',
    );
  });
});
