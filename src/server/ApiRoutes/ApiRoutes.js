import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';

import { navConfig } from 'dgx-header-component';

import Model from 'dgx-model-data';
import HomepageModel from '../../app/utils/Model.js';
import config from '../../../appConfig.js';

const { HeaderItemModel } = Model;
const { api, homepageApi, headerApi } = config;
const router = express.Router();
const appEnvironment = process.env.APP_ENV || 'production';
const apiRoot = api.root['production'];
const headerOptions = createOptions(headerApi);
const homepageOptions = createOptions(homepageApi);

function createOptions(api) {
  return {
    endpoint: `${apiRoot}${api.endpoint}`,
    includes: api.includes,
    filters: api.filters,
  };
}

function fetchApiData(url) {
  return axios.get(url);
}

function getHeaderData() {
  const headerApiUrl = parser.getCompleteApi(headerOptions);
  return fetchApiData(headerApiUrl);
}

function HomepageApp(req, res, next) {
  const homepageApiUrl = parser.getCompleteApi(homepageOptions);

  axios.all([getHeaderData(), fetchApiData(homepageApiUrl)])
    .then(axios.spread((headerData, homepageData) => {
      const homepageParsed = parser.parse(homepageData.data, homepageOptions);
      const homepageModelData = HomepageModel.build(homepageParsed);
      const headerParsed = parser.parse(headerData.data, headerOptions);
      const headerModelData = HeaderItemModel.build(headerParsed);

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
        HeaderStore: {
          headerData: navConfig.current,
        },
        // Set the API URL here so we can access it when we
        // render in the EJS file.
        completeApiUrl: '',
      };

      next();
    }))
    .catch(error => {
      console.log(`error calling API : ${error}`);
      console.log(`Attempted to call : ${homepageApiUrl}`);

      res.locals.data = {};
      next();
    }); /* end Axios call */
}

router
  .route('/')
  .get(HomepageApp);

export default router;
