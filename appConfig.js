let config = {
  appTitle: 'NYPL | Homepage',
  appName: 'Homepage',
  favIconPath: 'http://ux-static.nypl.org.s3-website-us-east-1.amazonaws.com/images/favicon.ico',
  port: 3001,
  webpackDevServerPort: 3000,
  refineryApi: {
    root: {
      development: 'https://dev-refinery.nypl.org',
      qa: 'https://qa-refinery.nypl.org',
      production: 'https://refinery.nypl.org'
    },
    endpoint: '/api/nypl/ndo/v0.1/site-data/containers?filter%5Bname%5D=Of%20Note',
    includes: [
      'slots.current-item',
      'slots.current-item.rectangular-image.full-uri'
    ],
    filters:''
  }
};

export default config;

