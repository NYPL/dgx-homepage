import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';

import Model from '../../app/utils/Model.js';
import {refineryApi} from '../../../appConfig.js';

let router = express.Router(),
  // appEnvironment = process.env.APP_ENV || 'development',
  appEnvironment = process.env.APP_ENV || 'production',
  apiRoot = refineryApi.root[appEnvironment],
  options = {
    endpoint: `${apiRoot}${refineryApi.endpoint}`,
    includes: refineryApi.includes,
    filters: refineryApi.filters
  };

const completeApiUrl = parser.getCompleteApi(options);

console.log(completeApiUrl);

router
  .route('/')
  .get((req, res, next) => {

    /* This is commented out but we need to make an HTTP call to the
     * Refinery, parse and model the returned data, and add it
     * to the Alt store in the proper variables.
     */
    axios
      .get(completeApiUrl)
      .then(data => {
        let parsed = parser.parse(data.data, options),
          // modelData = OfNoteModel.build(parsed[0].slots);
          modelData = Model.build(parsed);

          // console.log(modelData[0].componentData[0]);

        res.locals.data = {
          HomepageStore: {
            modelData: modelData
          },
          // Set the API URL here so we can access it when we
          // render in the EJS file.
          completeApiUrl: ''
        };
        next();
      })
      .catch(error => {
        console.log('error calling API : ' + error);
        console.log('Attempted to call : ' + completeApiUrl);

        res.locals.data = {
          Store: {
            _storeVar: []
          },
          // completeApiUrl
        };
        next();
      }); /* end Axios call */
  });

export default router;
