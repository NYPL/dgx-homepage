# NYPL Homepage App
## Version
> 1.2.7

## Installation
Install all dependencies listed under `package.json`
```sh
$ npm install
```

## Development Mode
We use Webpack to fire off a hot-reloading development server. This allows for continuous code changes without the need to refresh your browser.

```sh
$ npm start // Starts localhost:3001 defaulting to APP_ENV=development
```

You can also set the APP_ENV variable which dictates what API environment to use as the main source.
```sh
$ APP_ENV=development|qa|production npm start // Starts localhost:3001 with set APP_ENV
```

## Production Mode
We use Webpack to fire off a hot-reloading development server. This allows for continuous code changes without the need to refresh your browser.

```sh
$ npm run dist // Builds dist path & files
$ APP_ENV=production NODE_ENV=production npm start // Starts localhost:3001 with set APP_ENV
```

## Components
The homepage is made out of different React components that are displayed as features separated into rows. The React components are separate repos, so the homepage acts as a container that renders those components.

Going from the top to the bottom of the page, we have the following list of components. All the components, **except** for the Content Banner component, are wrapped in the [dgx-homepage-row-component](git+ssh://git@bitbucket.org/NYPL/dgx-homepage-row-component.git) component. It is a container to render the feature for each row along with a left sidebar. Since the Content Banner takes up the whole width of the page, it is not wrapped in the dgx-homepage-row-component container.

| Component | Repo |
|---|---|
| Content Banner | [dgx-homepage-content-banner](git+ssh://git@bitbucket.org/NYPL/dgx-homepage-content-banner) |
| What's Happening | [dgx-tabbed-features-component](git+ssh://git@bitbucket.org/NYPL/dgx-tabbed-features-component) |
| Learn Something New | [dgx-feature-row-component](git+ssh://git@bitbucket.org/NYPL/dgx-feature-row-component) |
| Staff Picks | [dgx-homepage-staff-picks-component](git+ssh://git@bitbucket.org/NYPL/dgx-homepage-staff-picks-component) |
| New & Noteworthy | [dgx-booklist-component](git+ssh://git@bitbucket.org/NYPL/dgx-booklist-component) |
| From Our Blog | [dgx-blog-features-component](git+ssh://git@bitbucket.org/NYPL/dgx-blog-features-component) |
| Updates | [dgx-feature-row-component](git+ssh://git@bitbucket.org/NYPL/dgx-feature-row-component) |

## Building/Deploying
All the repos above point to their respective `master` branch. Whenever an update is made, the homepage needs to be built again to get that component's update. Since the reference to the components already point to `master`, all that needs to be done for the homepage is to build using Bamboo.

The `development` branch, or a feature branch, can be built in [Bamboo](http://bamboo.nypl.org/browse/NA-HWR), deployed to [QA](http://qa-homepage.nypl.org/), and then reviewed before production deployment.

## Changelog

### v1.2.7
#### Updated
- Updated the Header Component to v1.5.3. The update is to remove console loggings for patron token expiration.

- Updated the Header Component to v1.5.2. The update is to turn off the feature flag of OAuth Login and set it as default.

### v1.2.6
#### Updated
- Updated the Header Component to v1.5.1. The update includes HTTPS fix and the JavaScript fallback for the log in button on the Header Component.

### v1.2.5
#### Added
- Enabled Feature Flags plugin on the client-side and added Optimizely script in the index.ejs file.

### v1.2.4
#### Added
- More support for Google Analytics in the "What's Happening" section of the page.

### v1.2.3
#### Added
- Added support for Google Analytics click events using `utils/gaHpUtils.js`.

#### Changed
- Updated README.md file to contain a CHANGELOG.

## Contributors
----
NYPL Digital Experience
