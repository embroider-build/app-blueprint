import Application from '@ember/application';
// @ts-expect-error - TODO: add types to compatModules
import compatModules from '@embroider/core/entrypoint';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  // TODO: remove lint disable when we have types for compatModules
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  Resolver = Resolver.withModules(compatModules);
}

// TODO: remove lint disable when we have types for compatModules
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
loadInitializers(App, config.modulePrefix, compatModules);
