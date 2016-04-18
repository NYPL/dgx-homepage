import { expect } from 'chai';
import Model from './../src/app/utils/Model.js';

describe('NYPL Homepage Model Unit Test: ', () => {
  /**
   * Model.build
   * Model.build is the main function passes the data from the api endpoint to
   * extract the value we need.
   * It eventually returns an object with the keys and values for all the
   * components to the Store.
   */
  describe('build', () => {
    const build = Model.build;
    const defaultDataStructure = {
      banner: {},
      whatsHappening: {},
      learnSomethingNew: {},
      staffPicks: {},
      recommendedRecentReleases: {},
      fromOurBlog: {},
      ofNote: {}
    };

    it('should return default data skeleton if the data is an empty array', () => {
      expect(build([])).to.equal(defaultDataStructure);
    });

    it('should return default data skeleton if the data is not an array', () => {
      expect(build({})).to.equal(defaultDataStructure);
    });
  });

  describe('generateDefaultModel', () => {
    const generateDefaultModel = Model.generateDefaultModel;
  });

  describe('getComponentNames', () => {
    const getComponentNames = Model.getComponentNames;
  });

  /**
   * Model.modelAppData
   * Model.modelAppData is the function restructures the data from the api endpoint to
   * catogorize it into different sub objects by each sub object's different name.
   * It eventually returns an object back to Model.build.
   */
  describe('modelAppData', () => {
    const modelAppData = Model.modelAppData;
    const defaultModelAppData = {
      Banner: {},
      'What\'sHappening': {},
      LearnSomethingNew: {},
      OfNote: {},
      FromOurBlog: {},
      StaffPicks: {},
      RecommendedRecentReleases: {},
    };

    it('should return default data skeleton if the input is undefined', () => {
      expect(modelAppData({}, defaultModelAppData)).to.equal(
        defaultModelAppData
      );
    });

    it('should return default data skeleton if the input is not an array', () => {
      expect(modelAppData({}, defaultModelAppData)).to.equal(
        defaultModelAppData
      );
    });

    it('should return default data skeleton if the input is not an array', () => {
      expect(modelAppData('', defaultModelAppData)).to.equal(
        defaultModelAppData
      );
    });

    it('should return default data skeleton if the input is an empty array', () => {
      expect(modelAppData([], defaultModelAppData)).to.equal(defaultModelAppData);
    });
  });

  /** Model.assignComponentName
   * Model.assignComponentName is the function that extract the name from old data, and rename it
   * for a clearer structure.
   */
  describe('Model.assignComponentName', () => {
    const assignComponentName = Model.assignComponentName;

    it('should return undefined if the input does not exist', () => {
      expect(assignComponentName()).to.equal('');
    });

    it('should return undefined if name.en.text does not exist', () => {
      expect(assignComponentName({})).to.equal('');
    });

    it('should return undefined if name.en.text does not exist', () => {
      expect(assignComponentName({ name: {} })).to.equal('');
    });
  });

  /** Model.modelContainers
   * Model.modelContainers is the function restructures the data from api endpoint to
   * a new object inlcudes the new keys and assignes the values to each component.
   * It eventually returns an object with the keys and values back to Model.modelAppData.
   */
  describe('modelContainers', () => {
    const modelContainers = Model.modelContainers;
    const defaultContainerData = {
      type: undefined,
      id: undefined,
      name: {},
      children: [],
      slots: [],
      slug: '',
      link: ''
    };

    it('should return the objcet with default key/value if there is no input', () => {
      expect(modelContainers()).to.equal(defaultContainerData);
    });

    it('should return the objcet with default key/value if the input is not an object', () => {
      expect(modelContainers('')).to.equal(defaultContainerData);
    });

    it('should return the objcet with default key/value if the input is not an object', () => {
      expect(modelContainers([])).to.equal(defaultContainerData);
    });

    it('should return return the objcet with default key/value if the input is an empty object',
      () => {
        expect(modelContainers({})).t.equal(defaultContainerData);
      }
    );
  });

  /**
   * Model.getContainerName
   * Model.getContainerName is the function to check if atributes.name exsits.
   * If it does, the function returns the value, if not, it catch the error and return an empty
   * object.
   */
  describe('getContainerName', () => {
    const getContainerName = Model.getContainerName;
  });

  /**
   * Model.createChildren
   * Model.createChildren is the function restructures the data of the children subobject of a
   * component
   */
  describe('createChildren', () => {
    const createChildren = Model.createChildren;

    it('should return an empty array if no data input or it is not an array', () => {
      expect(createChildren()).to.equal([]);
      expect(createChildren('')).to.equal([]);
      expect(createChildren({})).to.equal([]);
    });
  });

  /**
   * Model.createSlots
   * Model.createSlots is the function restructures the data of the slots subobject of a
   * component
   */
  describe('createSlots', () => {
    const createSlots = Model.createSlots;

    it('should return an empty array if no data input or the input is not an array', () => {
      expect(createSlots()).to.equal([]);
      expect(createSlots('')).to.equal([]);
      expect(createSlots({})).to.equal([]);
    });
  });
});
