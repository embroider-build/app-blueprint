import EmberApp from 'ember-cli/lib/broccoli/ember-app.js';
import { maybeEmbroider } from '@embroider/test-setup';

export default function (defaults) {
  const app = new EmberApp(defaults, {});

  return maybeEmbroider(app);
}
