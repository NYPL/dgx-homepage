// var React = require('react');
// var TestUtils = require('react/lib/ReactTestUtils');
// var _ = require('underscore');
const Model = require('./../../../src/app/utils/Model.js');

describe('NYPL Homepage Utils Unit Tests', function () {
  const build = Model.build;
  const modelAppData = Model.modelAppData;
  const modelContainers = Model.modelContainers;

  /*
   * Model.build
   * Model.build is the main function passes the data from the api endpoint to
   * extract the value we need.
   * It eventually returns an object with the keys and values for all the 
   * components to ApiRoute.js.
   */
  describe('Model: build', function () {
    it('should have build function', function () {
      expect(build).toBeDefined();
    });

    it('should return null if there is no data input', function () {
      expect(build()).toEqual(null);
    });

    it('should return null if the data is an empty array', function () {
      expect(build([])).toEqual(null);
    });

    it('should return null if the data is an object with no key and value', function () {
      expect(build({})).toEqual(null);
    });

    it('should return null if the data is an array with an empty object as the first item',
      function () {
        expect(build([{}])).toEqual(null);
      }
    );
  });

  /*
   * Model.modelAppData
   * Model.modelAppData is the function restructures the data from the api endpoint to
   * catogorize it into different sub objects by each sub object's different name.
   * It eventually returns an object back to Model.build.
   */
  describe('Model: modelAppData', function () {
    it('should have modelAppData function', function () {
      expect(modelAppData).toBeDefined();
    });

    it('should return an empty object if there is no data input', function () {
      expect(modelAppData()).toEqual({});
    });
  });

  /*
   * Model.modelContainers
   * Model.modelContainers is the function restructures the data from api endpoint to
   * a new object inlcudes the new keys and assignes the values to the components.
   * It eventually returns an object with the keys and values back to Model.modelAppData.
   */
  describe('Model: modelContainers', function () {
    it('should have modelContainers function', function () {
      expect(modelContainers).toBeDefined();
    });

    it('should return an empty objcet if there is no data input', function () {
      expect(modelContainers()).toEqual({});
    });

    it('should return an empty objcet if the input is an empty object', function () {
      expect(modelContainers({})).toEqual({});
    });

    it('should return the value of empty string for type if there is no value as data.type',
      function () {
        expect(modelContainers({
          type: undefined,
          id: 'test',
          attribute: {
            name: 'test'
          }
        }))
        .toEqual({
          type: '',
          id: 'test',
          attribute: {
            name: 'test'
          }
        });
      }
    );
  });
});