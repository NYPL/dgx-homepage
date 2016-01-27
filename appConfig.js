const config = {
  appTitle: 'NYPL | Welcome to The New York Public Library',
  appName: 'Homepage',
  favIconPath: 'http://ux-static.nypl.org.s3-website-us-east-1.amazonaws.com/images/favicon.ico',
  port: 3001,
  webpackDevServerPort: 3000,
  refineryApi: {
    root: {
      development: 'https://dev-refinery.nypl.org',
      qa: 'https://qa-refinery.nypl.org',
      production: 'https://refinery.nypl.org',
    },
    endpoint: '/api/nypl/ndo/v0.1/site-data/containers',
    includes: [
      'slots.current-item.rectangular-image.full-uri',
      'slots.current-item.banner-image.full-uri',
      'slots.current-item.book-cover-image',
      // Should be children.slots but slots comes from above....
      'children.slots.current-item.rectangular-image',
    ],
    filters: {
      name: 'Of%20Note|Learn%20Something%20New|Banner|' +
        'what%27s%20happening|staff%20picks|Recommended%20Recent%20Releases|' +
        'from%20our%20blog',
    },
  },
};

export default config;

