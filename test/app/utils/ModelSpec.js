const Model = require('./../../../src/app/utils/Model.js');

describe('NYPL Homepage Utils Unit Tests', () => {
  /*
   * Model.build
   * Model.build is the main function passes the data from the api endpoint to
   * extract the value we need.
   * It eventually returns an object with the keys and values for all the
   * components to the Store.
   */
  describe('Model: build', () => {
    const build = Model.build;

    it('should have build function', () => {
      expect(build).toBeDefined();
    });

    it('should return null if there is no data input', () => {
      expect(build()).toEqual(null);
    });

    it('should return null if the data is an empty array', () => {
      expect(build([])).toEqual(null);
    });

    it('should return null if the data is not an array', () => {
      expect(build({})).toEqual(null);
    });
  });

  /*
   * Model.modelAppData
   * Model.modelAppData is the function restructures the data from the api endpoint to
   * catogorize it into different sub objects by each sub object's different name.
   * It eventually returns an object back to Model.build.
   */
  describe('Model: modelAppData', () => {
    const modelAppData = Model.modelAppData;
    const defaultModelAppData = {
      'What\'sHappening': [],
      Banner: [],
      LearnSomethingNew: [],
      OfNote: [],
      FromOurBlog: [],
      StaffPicks: [],
      RecommendedRecentReleases: [],
    };

    it('should have modelAppData function', () => {
      expect(modelAppData).toBeDefined();
    });

    it('should return an object with default keys if the input is null', () => {
      expect(modelAppData()).toEqual(
        defaultModelAppData
      );
    });

    it('should return an object with default keys if the input is not an array', () => {
      expect(modelAppData({})).toEqual(
        defaultModelAppData
      );
    });

    it('should return an object with default keys if the input is not an array', () => {
      expect(modelAppData('')).toEqual(
        defaultModelAppData
      );
    });

    it('should return an object with default keys if the input is an empty array', () => {
      expect(modelAppData([])).toEqual(defaultModelAppData);
    });
  });

  /* Model.assignComponentName
   * Model.assignComponentName is the function that extract the name from old data, and rename it
   * for a clearer structure.
   */
  describe('Model.assignComponentName', () => {
    const assignComponentName = Model.assignComponentName;

    it('should have assignComponentName function', () => {
      expect(assignComponentName).toBeDefined();
    });

    it('should return undefined if the input does not exist', () => {
      expect(assignComponentName()).toEqual('');
    });

    it('should return undefined if name.en.text does not exist', () => {
      expect(assignComponentName({})).toEqual('');
    });

    it('should return undefined if name.en.text does not exist', () => {
      expect(assignComponentName({ name: {} })).toEqual('');
    });
  });

  /*
   * Model.modelContainers
   * Model.modelContainers is the function restructures the data from api endpoint to
   * a new object inlcudes the new keys and assignes the values to each component.
   * It eventually returns an object with the keys and values back to Model.modelAppData.
   */
  describe('Model: modelContainers', () => {
    const modelContainers = Model.modelContainers;
    const defaultContainerData = {
      type: undefined,
      id: undefined,
      name: {},
      children: [],
      slots: [],
    };

    it('should have modelContainers function', () => {
      expect(modelContainers).toBeDefined();
    });

    it('should return the objcet with default key/value if there is no input', () => {
      expect(modelContainers()).toEqual(defaultContainerData);
    });

    it('should return the objcet with default key/value if the input is not an object', () => {
      expect(modelContainers('')).toEqual(defaultContainerData);
    });

    it('should return the objcet with default key/value if the input is not an object', () => {
      expect(modelContainers([])).toEqual(defaultContainerData);
    });

    it('should return return the objcet with default key/value if the input is an empty object',
      () => {
        expect(modelContainers({})).toEqual(defaultContainerData);
      }
    );
  });

  /*
   * Model.getContainerName
   * Model.getContainerName is the function to check if atributes.name exsits.
   * If it does, the function returns the value, if not, it catch the error and return an empty
   * object.
   */
  describe('Model: getContainerName', () => {
    const getContainerName = Model.getContainerName;

    it('should have getContainerName function', () => {
      expect(getContainerName).toBeDefined();
    });
  });

  /*
   * Model.createChildren
   * Model.createChildren is the function restructures the data of the children subobject of a
   * component
   */
  describe('Model: createChildren', () => {
    const createChildren = Model.createChildren;

    it('should have createChildren function', () => {
      expect(createChildren).toBeDefined();
    });
    it('should return an empty array if no data input or it is not an array', () => {
      expect(createChildren()).toEqual([]);
      expect(createChildren('')).toEqual([]);
      expect(createChildren({})).toEqual([]);
    });
  });

  /*
   * Model.createSlots
   * Model.createSlots is the function restructures the data of the slots subobject of a
   * component
   */
  describe('Model: createSlots', () => {
    const createSlots = Model.createSlots;

    it('should have createSlots function', () => {
      expect(createSlots).toBeDefined();
    });
    it('should return an empty array if no data input or the input is not an array', () => {
      expect(createSlots()).toEqual([]);
      expect(createSlots('')).toEqual([]);
      expect(createSlots({})).toEqual([]);
    });
  });
});