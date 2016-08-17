// Account codes for Google Analytics for different environments
var Google = {
  // Return the Google Analytics code for the production property if
  // isProduction is true, or the dev property if isProduction is false
  code: (isProduction) => {
    const codes = {
      production: 'UA-1420324-3',
      dev: 'UA-1420324-122',
    };

    if (isProduction === true) {
      return codes.production;
    }
    return codes.dev;
  },
};

module.exports = {
  google: Google,
};
