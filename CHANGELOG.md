## Changelog

### v1.5.5
- Updating @nypl/dgx-header-component to 2.4.14 and setting APP_ENV.

### v1.5.4
- Updating @nypl/dgx-header-component to 2.4.13.

### v1.5.3
- Updating @nypl/dgx-header-component to 2.4.12.

### v1.5.2
- Small fix to fix tall content banner text size.

### v1.5.1
- Small bug fix to the mobile banner arrow button.

### v1.5.0
- Removed the `dgx-homepage-content-banner` component import and moved all the files into this repo to better and more easily update the hero banner.
- Added a button in the homepage banner content area that will always be displayed. If text for the button is found in the server response, it will be displayed but only on desktop. The button _looks_ like a button but is actually a div. If the button is clicked it will only trigger a GA event but the button and content area both go to the same URL.
- Updated focus ring color to be more accessible and also consistent with the Header.

### v1.4.2
- Updating @nypl/dgx-react-footer version to 0.5.1 and @nypl/dgx-header-component to 2.4.11.

### v1.4.1
- Updating @nypl/dgx-react-footer version to 0.5.0 and @nypl/dgx-header-component to 2.4.8.
- Updating the dgx-homepage-content-banner repo to display an h1 instead of an h2.

### v1.4.0
- Updating the header component to 2.4.7 and adding OptinMonster script.

### v1.3.10
- Updating the header component version to 2.4.5.

### v1.3.9
- Updating the header component version to 2.4.2 and footer component to 0.4.1.

## v1.3.7, v1.3.8
- SEO updates to the ejs file.

### v1.3.6
- Updating the header component version to 2.4.0.

### v1.3.5
- Updating the parameters for gaUtils.trackPageview() in App.jsx. It removed unnecessary parameters.

### v1.3.4
- Updating the Header version to 2.2.0.
- Updating GA initialization configurations.

### v1.3.3
- Updating styles for the See More button, paragraph text, and font weight.

### v1.3.2
- Updating the Header version to 2.1.1.

### v1.3.1
- Updating the Header version to 2.1.0.

### v1.3.0
- Upgrading to React 15.

### v1.2.7
#### Updated
- Updated the Header Component to v1.5.5. The updates include integrating the log in related functions with login server, removing console loggings for patron token expiration, and turning off the feature flag of OAuth Login and set it as default.

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
