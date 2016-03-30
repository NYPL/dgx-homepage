import _ from 'underscore';

/**
 * Model class extracts, cleans, and restructures the data from the Refinery.
 */

class Model {

  /**
   * build(data)
   * It is the initial function of Model class.
   * It gets the data from the Refinery, and returns an object in the end.
   * it returns null if the input is invalid.
   *
   * @param (Array) data
   */
  build(data) {
    /**
     * Make sure there's an input.
     */
    if (!data || !(_.isArray(data))) {
      return null;
    }

    /**
     * Make sure the data is not empty.
     */
    if (data.length > 0) {
      return this.modelAppData(_.map(data, d => this.modelContainers(d)));
    }

    return null;
  }

  /**
   * modelAppData(dataArray)
   * Collect each modeled container data, and assigne them to different
   * category based on its id. Finally, return an object with keys and values
   * that are with preset types.
   *
   * @param (Array) dataArray
   */
  modelAppData(dataArray) {
    /**
     * The input should be an array.
     */
    const appObjectData = {
      'What\'sHappening': [],
      Banner: [],
      LearnSomethingNew: [],
      OfNote: [],
      FromOurBlog: [],
      StaffPicks: [],
      RecommendedRecentReleases: [],
    };

    /**
     * If the input is null or it dose not have a valid type, that is an array,
     * it will return an empty object with preset key: value.
     */
    if (!dataArray || !(_.isArray(dataArray))) {
      return appObjectData;
    }

    /**
     * If the input is valid, it will loop through the array, restructure it,
     * and assign each item to a new object, appOjectData.
     */
    if (dataArray.length > 0) {
      _.map(dataArray, d => {
        const componentName = this.assignComponentName(d);

        /**
         * assignComponentName() extracts a valid name, or an empty string if no
         * valid value. If the name is an empty string, then it won't return
         * the component data.
         */
        appObjectData[componentName] = (componentName) ? d : {};
      });
    }

    return appObjectData;
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
    const componentNamesArray = [
      'What\'sHappening',
      'Banner',
      'LearnSomethingNew',
      'OfNote',
      'FromOurBlog',
      'StaffPicks',
      'RecommendedRecentReleases',
    ];

    let componentName;

    /**
     * Assign an object to the input, and check if the values inside the object
     * are valid.
     */
    try {
      const {
        name: {
          en: {
            text,
          },
        },
      } = componentDataObj;
      const nameString = text.replace(/ /g, '');

      /**
       * Check if the name matches any item in the preset name array.
       */
      componentName = (_.contains(componentNamesArray, nameString)) ? nameString : '';
    } catch (e) {
      /**
       * If any error is raised during the assigning, it will assign the default value.
       */
      componentName = '';
    }

    /**
     * Return the result.
     */
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
      /**
       * If any error is raised during the assigning, it will return the default value.
       */
      containerNameObj = {};
    }
    return containerNameObj;
  }

  /**
   * createChildren(dataArray)
   * Collect and restructure the input if an item has children object.
   *
   * @param (Array) dataArray
   */
  createChildren(dataArray) {
    if (!dataArray || !(_.isArray(dataArray))) {
      return [];
    }

    return _.map(dataArray, d => this.modelContainers(d));
  }

  /**
   * Uses ES6 Destructuring to extract author's image object properties.
   * @returns {object} returns { full-uri: (string), description: (string)}.
   */
  getAuthorImage(obj) {
    let result;
    if (!obj && _.isEmpty(obj)) {
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
    if (!dataArray || !(_.isArray(dataArray))) {
      return [];
    }

    return dataArray.map((element) => {
      if (_.isEmpty(element['current-item'])) {
        return {};
      }

      const currentItem = element['current-item'];

      /**
       * Check if different sizes of the images exist.
       */
      const bannerImage = currentItem['banner-image'] ?
        currentItem['banner-image'].attributes.uri : null;
      const rectangularImage = currentItem['rectangular-image'] ?
          currentItem['rectangular-image'].attributes.uri : null;
      const bookCoverImage = currentItem['book-cover-image'] ?
          currentItem['book-cover-image'].attributes.uri : null;
      const date = currentItem.attributes.date ? currentItem.attributes.date : null;
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
