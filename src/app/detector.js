export default {
  name: 'queryLanguage',

  lookup(options) {
    // options -> are passed in options
    return 'es';
  },

  cacheUserLanguage(lng, options) {
    // options -> are passed in options
    // lng -> current language, will be called after init and on changeLanguage
    // store it
  },
};