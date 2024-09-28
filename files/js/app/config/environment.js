// import loadConfigFromMeta from '@embroider/config-meta-loader';
//
// export default loadConfigFromMeta('<%= name %>');

export default {
  modulePrefix: '<%= name %>',
  environment: 'development',
  rootURL: '/',
  locationType: 'history',
  EmberENV: {
    EXTEND_PROTOTYPES: false,
    FEATURES: {
      // Here you can enable experimental features on an ember canary build
      // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
    },
  },

  APP: {
    // Here you can pass flags/options to your application instance
    // when it is created
  },
};
