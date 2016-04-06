import { homepageApi } from '../../../appConfig.js';
import {
  isArray as _isArray,
  map as _map,
  contains as _contains,
  isEmpty as _isEmpty,
} from 'underscore';

// Model class extracts, cleans, and restructures the data from the Refinery.
class Model {

  /**
   * build(data)
   * It is the initial function of Model class.
   * It gets the data from the Refinery, and returns an object as the result.
   * it returns null if the input is invalid.
   *
   * @param (Array) data
   */
  build(data) {
    const defaultModelStructure = this.generateDefaultModel();

     // Make sure there's an input.
    if (!data || !(_isArray(data))) {
      return defaultModelStructure;
    }

    // Make sure the data is not empty.
    if (data.length > 0) {
      return this.modelAppData(_map(data, d => this.modelContainers(d)), defaultModelStructure);
    }

    return defaultModelStructure;
  }

  /**
   * generateDefaultModel()
   * It generates the default data model. It returns a skeleton of the data structure with an empty
   * array as the value of each item.
   */
  generateDefaultModel() {
    const componentNamesArray = this.getComponentNames(homepageApi.filters.slug);
    const defaultModelStructure = {};

    if(componentNamesArray.length) {
      _map(componentNamesArray, name => {
        defaultModelStructure[name] = {};
      });
    }

    return defaultModelStructure;
  }

  /**
   * getComponentNames(slug)
   * It extracts the names we need for the default model from the filters
   * of the endpoint where the data comes from.
   * It returns an empty array if no input.
   *
   * @param (String) slug
   */
  getComponentNames(slug) {
    const componentNamesArray = (slug) ? slug.replace(/-([a-z])/ig,
      (match, letter) => letter.toUpperCase()
    ).split('|') : [];

    return componentNamesArray;
  };

  /**
   * modelAppData(dataArray, defaultData)
   * Collect each modeled container data, and assigne them to different
   * category in defaultData based on its id. Finally, return an object with keys and values
   * that are with preset types.
   *
   * @param (Array) dataArray
   * @param (Object) defaultData
   */
  modelAppData(dataArray, defaultData) {
    /**
     * If the input is null or it dose not have a valid type, that is an array,
     * it will return an empty object with preset key: value.
     */
    if (!dataArray || !(_isArray(dataArray))) {
      return defaultData;
    }

    /**
     * If the input is valid, it will loop through the array, restructure it,
     * and assign each item to a new object, appOjectData.
     */
    if (dataArray.length > 0) {
      _map(dataArray, d => {
        const componentName = this.assignComponentName(d);

        /**
         * assignComponentName() extracts a valid name, or an empty string if no
         * valid value. If the name is an empty string, then it won't return
         * the component data.
         */
        defaultData[componentName] = (componentName) ? d : {};
      });
    }
    return defaultData;
  }

  /**
   * assignComponentName(componentDataObj)
   * Grab the old data's name object and extract the valid name string from it.
   * Assign the name string to the matched component and populate it back to
   * modelAppdata.
   *
   * @param (Object) componentDataObj
   */
  assignComponentName(componentDataObj) {
    const componentNamesArray = this.getComponentNames(homepageApi.filters.slug);

    let componentName;

    /**
     * Assign an object to the input, and check if the values inside the object
     * are valid.
     */
    try {
      const {
        slug
      } = componentDataObj;
      const nameString = slug.replace(/-([a-z])/ig, (match, letter) => {
        return letter.toUpperCase();
      });

       // Check if the name matches any item in the preset name array.
      componentName = (_contains(componentNamesArray, nameString)) ? nameString : '';
    } catch (e) {
      console.log(e);

      // If any error is raised during the assigning, it will assign the default value.
      componentName = '';
    }

    // Return the result.
    return componentName;
  }

  /**
   * modelContainers(dataObj)
   * Extract the necessary data from all the containers that are fetched from the Refinery.
   *
   * @param (Object) dataObj
   */
   
  modelContainers(dataObj) {
    /**
     * Assign an object to the input, check if the values inside the object are valid,
     * and return the result as an object.
     */
    try {
      const { type, id, children, slots } = dataObj;

      return {
        type,
        id,
        name: this.getContainerName(dataObj),
        children: children ? this.createChildren(children) : [],
        slots: slots ? this.createSlots(slots) : [],
        slug: this.getContainerSlug(dataObj),
      };
    } catch (e) {
      /**
       * If any error is raised during the assigning, it will return the default value.
       */
      return {
        type: undefined,
        id: undefined,
        name: {},
        children: [],
        slots: [],
      };
    }
  }

  /**
   * getContainerName(dataObj)
   * Check if attributes.name exists and return it as an object.
   *
   * @param (Object) dataObj
   */
  getContainerName(dataObj) {
    let containerNameObj;

    /**
     * Assign an object to the input, check if the values inside the object are valid,
     * and return the result as an object.
     */
    try {
      ((Obj) => {
        const {
          attributes: {
            name = {},
          },
        } = Obj;

        containerNameObj = name;
      })(dataObj);
    } catch (e) {

      // If any error is raised during the assigning, it will return the default value.
      containerNameObj = {};
    }
    return containerNameObj;
  }

  /**
   * getContainerSlug(dataObj)
   * Check if attributes.slug exists and return it as a string.
   *
   * @param (Object) dataObj
   */
  getContainerSlug(dataObj) {
    let containerSlug;

    /**
     * Assign an object to the input, check if the values inside the object are valid,
     * and return the result as an object.
     */
    try {
      ((Obj) => {
        const {
          attributes: {
            slug = '',
          },
        } = Obj;

        containerSlug = slug;
      })(dataObj);
    } catch (e) {

      // If any error is raised during the assigning, it will return the default value.
      containerSlug = '';
    }
    return containerSlug;
  }

  /**
   * createChildren(dataArray)
   * Collect and restructure the input if an item has children object.
   *
   * @param (Array) dataArray
   */
  createChildren(dataArray) {
    if (!dataArray || !(_isArray(dataArray))) {
      return [];
    }

    return _map(dataArray, d => this.modelContainers(d));
  }

  /**
   * Uses ES6 Destructuring to extract author's image object properties.
   * @returns {object} returns { full-uri: (string), description: (string)}.
   */
  getAuthorImage(obj) {
    let result;
    if (!obj && _isEmpty(obj)) {
      return null;
    }

    try {
      const {
        'related-node': {
          authors: [
            {
              headshot: {
                attributes: {
                  uri: image = null,
                },
              },
            },
            ...rest
          ],
        },
      } = obj;

      result = image;
    } catch (e) {
      result = null;
    }

    return result;
  }

  /**
   * createSlots(dataArray)
   * Collect and restructure if an item has slot object.
   *
   * @param (Array) dataArray
   */
  createSlots(dataArray) {
    if (!dataArray || !(_isArray(dataArray))) {
      return [];
    }

    return dataArray.map((element) => {
      if (_isEmpty(element['current-item'])) {
        return {};
      }

      const currentItem = element['current-item'];


      // Check if different sizes of the images exist.
      const bannerImage = currentItem['banner-image'] ?
        currentItem['banner-image'].attributes.uri : null;
      const rectangularImage = currentItem['rectangular-image'] ?
          currentItem['rectangular-image'].attributes.uri : null;
      const bookCoverImage = currentItem['book-cover-image'] ?
          currentItem['book-cover-image'].attributes.uri : null;
      const date = currentItem.attributes.date ? currentItem.attributes.date : null;
      const shortTitle = (currentItem.attributes && currentItem.attributes['banner-short-title']) ?
        currentItem.attributes['banner-short-title'] : null;
      const firstName = currentItem.attributes['person-first-name'] ?
          currentItem.attributes['person-first-name'] : null;
      const lastName = currentItem.attributes['person-last-name'] ?
          currentItem.attributes['person-last-name'] : null;
      const authorTitle = currentItem.attributes['person-title'] ?
          currentItem.attributes['person-title'] : null;
      const location = currentItem.attributes.location ? currentItem.attributes.location : null;
      const authorImage = this.getAuthorImage(currentItem);

      return {
        title: (currentItem.attributes.title) ?
          currentItem.attributes.title : '',
        category: (currentItem.attributes.category) ?
          currentItem.attributes.category : '',
        description: (currentItem.attributes.description) ?
          currentItem.attributes.description : '',
        shortTitle,
        image: {
          bannerImage,
          rectangularImage,
          bookCoverImage,
        },
        link: (currentItem.attributes.url.length) ?
          currentItem.attributes.url : '',
        date,
        author: {
          title: authorTitle,
          firstName,
          lastName,
          image: authorImage,
        },
        location,
      };
    });
  }
}

export default new Model;
