# NYPL Homepage App

## Version
> v1.5.5

| Branch         | Status|  
|:---------------|:---------------------------------------------------------------------------------------------------------------------------|  
| `master`   | [![Build Status](https://travis-ci.org/NYPL/dgx-homepage.svg?branch=master)](https://travis-ci.org/NYPL/dgx-homepage)      |  
| `qa`           | [![Build Status](https://travis-ci.org/NYPL/dgx-homepage.svg?branch=qa)](https://travis-ci.org/NYPL/dgx-homepage) |  
| `development`  | [![Build Status](https://travis-ci.org/NYPL/dgx-homepage.svg?branch=development)](https://travis-ci.org/NYPL/dgx-homepage)      |

## Installation
Install all npm dependencies listed under `package.json`
```sh
$ npm install
```

## Running the Application
### Development Mode
We use Webpack to fire off a hot-reloading development server. This allows for continuous code changes without the need to refresh your browser.

```sh
$ npm start // Starts localhost:3001 defaulting to APP_ENV=development
```

You can also set the `APP_ENV` variable which dictates what API environment to use as the main source.
```sh
$ APP_ENV=development|qa|production npm start // Starts localhost:3001 with set APP_ENV
```

### Production Mode
To replicate the application in a production state. We execute 2 npm scripts with the proper `ENV` variables. By using `NODE_ENV=production`, we disable the hot-reload server. In addition, the `production` Webpack configuration by is set by running `npm run dist`.

* **Step 1**: Build the distribution assets into `./dist/`
```sh
$ npm run dist
```

* **Step 2**: Starts the Node/Express server in `localhost:3001` with the `APP_ENV` set to `production`, targeting the proper `production` API's.
```sh
$ APP_ENV=production NODE_ENV=production npm start
```

## GIT Workflow
We follow a [feature-branch](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow) workflow. If you need to introduce/update the application code, you `SHOULD`:

* Create a new branch off the `development` branch
* Send a PR pointing to the `development` branch upon completion
* Once the PR is approved, it should be merged into the `development` branch
* If there are several PRs in process, a release should be scheduled by merging all completed PRs into the `development` branch
* When a release is to be deployed, the `development` branch will be merged into `master`
* All releases merged into `master` `MUST` be tagged and pushed to Github with their corresponding `version`

## Components
The homepage is made out of different React components that are displayed as features separated into rows. The React components are separate repos, so the homepage acts as a container that renders those components.

Going from the top to the bottom of the page, we have the following list of components. All the components, **except** for the Content Banner component, are wrapped in the [dgx-homepage-row-component](git+ssh://git@bitbucket.org/NYPL/dgx-homepage-row-component.git) component. It is a container to render the feature for each row along with a left sidebar. Since the Content Banner takes up the whole width of the page, it is not wrapped in the dgx-homepage-row-component container.

| Component | Repo |
|---|---|
| What's Happening | [dgx-tabbed-features-component](https://bitbucket.org/NYPL/dgx-tabbed-features-component) |
| Learn Something New | [dgx-feature-row-component](https://bitbucket.org/NYPL/dgx-feature-row-component) |
| Staff Picks | [dgx-homepage-staff-picks-component](https://bitbucket.org/NYPL/dgx-homepage-staff-picks-component) |
| New & Noteworthy | [dgx-booklist-component](https://bitbucket.org/NYPL/dgx-booklist-component) |
| From Our Blog | [dgx-blog-features-component](https://bitbucket.org/NYPL/dgx-blog-features-component) |
| Updates | [dgx-feature-row-component](https://bitbucket.org/NYPL/dgx-feature-row-component) |

All the repos above point to their respective `master` branch. Whenever an update is made, the homepage needs to be built again to get that component's update. Since the reference to the components already point to `master`, all that needs to be done for the homepage to perform a clean installation of dependencies.

## AWS Elastic Beanstalk Application Settings
By using the `aws-cli`, developers can deploy the Homepage App to the desired AWS application environments listed below:

| AWS Profile | Application Name | Environment |
|---|---|---|
| `nypl-digital-dev` | `nypl-homepage-app` | **QA**: `nypl-homepage-qa` <br><br> **Production**: `nypl-homepage-production` |
| `nypl-sandbox` | `nypl-homepage-app` | **Development**: `nypl-homepage-development` |

> Note: All QA and Development servers should be configured with only 1 instance. Production servers are typically setup with auto-scaling supporting 2 or more instances.

## AWS Deployment

#### QA/Development
Developers `SHOULD` target the proper environment when deploying the application for review. Using their proper profile credentials, developers will execute the `eb deploy` command to deploy a new version of the application on AWS.

#### Production
In our AWS production environment, we have defined a CI/CD pipeline via Travis CI to automatically:
* Run unit test coverage
* Run the npm task to build the distribution assets
* Execute the `deploy` hook only for `production` for AWS Elastic Beanstalk to deploy the new updates merged into `master`. This occurs only if a both `test` and `build` phases are successful
* Developers do not need to manually deploy the application unless an error occurred via Travis
