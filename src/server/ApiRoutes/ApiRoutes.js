import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';
import HomepageModel from '../../app/utils/Model.js';
import config from '../../../appConfig.js';

const { api, homepageApi } = config;
const router = express.Router();
const appEnvironment = process.env.APP_ENV || 'production';
const homepageApiRoot = api.root[appEnvironment];

function createOptions(root, apiOptions) {
  return {
    endpoint: `${root}${apiOptions.endpoint}`,
    includes: apiOptions.includes,
    filters: apiOptions.filters,
  };
}

const homepageOptions = createOptions(homepageApiRoot, homepageApi);

function HomepageApp(req, res, next) {
  const homepageApiUrl = parser.getCompleteApi(homepageOptions);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Cache-Control', 'max-age=3600');

  axios
    .get(homepageApiUrl)
    .then(homepageData => {
      const homepageParsed = parser.parse(homepageData.data, homepageOptions);
      const homepageModelData = HomepageModel.build(homepageParsed);

      res.locals.data = {
        HomepageStore: {
          // modelData is an object with keys as the name of the catagories of
          // the Homepage, and the values as the arrays consist of the items
          // in these categories
          whatsHappeningData: homepageModelData.whatsHappening,
          carouselData: homepageModelData.banner,
          learnSomethingNewData: homepageModelData.learnSomethingNew,
          ofNoteData: homepageModelData.ofNote,
          fromOurBlogsData: homepageModelData.fromOurBlog,
          staffPicksData: homepageModelData.staffPicks,
          recommendedRecentReleasesData: homepageModelData.recommendedRecentReleases,
          carouselIndexValue: 0,
          whatsHappeningIndexValue: 0,
        },
        // Set the API URL here so we can access it when we
        // render in the EJS file.
        completeApiUrl: '',
      };

      next();
    })
    .catch(error => {
      console.log(`error calling API : ${error}`);
      console.log(`Attempted to call : ${homepageApiUrl}`);

      res.locals.data = {};
      next();
    });
}

router
  .route('/')
  .get(HomepageApp);

export default router;
