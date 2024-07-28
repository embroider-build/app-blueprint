import EmberRouter from '@ember/routing/router';
import config from '<%= name %>/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('styles');
  this.route('custom-component');
});
