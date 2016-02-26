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

    it('should return an object with default keys if the data is null or not an array', function () {
      expect(modelAppData() || modelAppData({}) || modelAppData('')).toEqual({
        'What\'sHappening': [],
        Banner: [],
        LearnSomethingNew: [],
        OfNote: [],
        romOurBlog: [],
        StaffPicks: [],
        RecommendedRecentReleases: [],
      });
    });

    it('should return an object with default keys if the data is an empty array', function () {
      expect(modelAppData([])).toEqual({
        'What\'sHappening': [],
        Banner: [],
        LearnSomethingNew: [],
        OfNote: [],
        romOurBlog: [],
        StaffPicks: [],
        RecommendedRecentReleases: [],
      });
    });

    it('should return an object with default keys if the name of each item is an empty object', function () {
      expect(modelAppData([{name: {}}])).toEqual({
        'What\'sHappening': [],
        Banner: [],
        LearnSomethingNew: [],
        OfNote: [],
        romOurBlog: [],
        StaffPicks: [],
        RecommendedRecentReleases: [],
      });
    });
  });

  /*
   * Model.modelContainers
   * Model.modelContainers is the function restructures the data from api endpoint to
   * a new object inlcudes the new keys and assignes the values to each component.
   * It eventually returns an object with the keys and values back to Model.modelAppData.
   */
  describe('Model: modelContainers', function () {
    it('should have modelContainers function', function () {
      expect(modelContainers).toBeDefined();
    });

    it('should return an empty objcet with default keys if there is no data input or the input is not an object', function () {
      expect(modelContainers() || modelContainers('') || modelContainers([])).toEqual({
        type: [],
        id: [],
        name: {},
        slots: [],
        children: [],
      });
    });

    it('should return an empty objcet if the input is an empty object', function () {
      expect(modelContainers({})).toEqual({
        type: [],
        id: [],
        name: {},
        slots: [],
        children: [],
      });
    });
  });

  /*
   * Model.createChildren
   * Model.createChildren is the function restructures the data of the children subobject of a
   * component
   */
  describe('Model: createChildren', function () {
    it('should have createChildren function', function () {
      expect(createChildren).toBeDefined();
    });
    it('should return an empty array if no data input or it is not an array', function () {
      expect().toEqual([]);
      expect('').toEqual([]);
      expect({}).toEqual([]);
    });
  });

  /*
   * Model.createSlots
   * Model.createSlots is the function restructures the data of the slots subobject of a
   * component
   */
  describe('Model: createSlots', function () {
    it('should have createSlots function', function () {
      expect(createSlots).toBeDefined();
    });
    it('should return an empty array if no data input or it is not an array', function () {
      expect().toEqual([]);
      expect('').toEqual([]);
      expect({}).toEqual([]);
    });
  });
});