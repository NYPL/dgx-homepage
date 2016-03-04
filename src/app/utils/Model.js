import _ from 'underscore';

class Model {

  build(data) {
    //Make sure there's input
    if (!data || !(_.isArray(data))) {
      return null;
    }

    // Decide the type of data
    if (data.length > 0) {
      return this.modelAppData(_.map(data, d => {
        return this.modelContainers(d);
      }));
    }

    return null;
  };

  /**
  * modelAppData(dataArray)
  * Collect each modeled container data, and assigne them to different catagory,
  * based on its id. Finally, return an object with keys as the catagories,
  * and values as the arrays of the conatainer slots.
  *
  * @param (Array) dataArray
  */
  modelAppData(dataArray) {
    // it should get an array
    const appObjectData = {
      'What\'sHappening': [],
      Banner: [],
      LearnSomethingNew: [],
      OfNote: [],
      FromOurBlog: [],
      StaffPicks: [],
      RecommendedRecentReleases: [],
    };

    // If the input is null or it is not a valid data type, array,
    // it will return an empty object with preset key: value
    if (!dataArray || !(_.isArray(dataArray))) {
      return appObjectData;
    }

    // If the input is not an empty array, it will loop through the array,
    // and restructure the array and assign each item to the appOjectData
    if(dataArray.length > 0) {
      _.map(dataArray, d => {
        const componentName = this.assignComponentName(d);
        
        // assignComponentName() here will extract a valid name or an empty string
        // If the name is an empty string, then it won't return the component data
        appObjectData[componentName] = (componentName) ? d : {};
      })
    };

    return appObjectData;
  }

  /**
  * assignComponentName(componentDataObj)
  * Grab the old data's name object and extract the valid name.
  * Assign the name to the particular component and populate it back to app data.
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
      'RecommendedRecentReleases'
    ];

    let componentName;

    try {
      (dataObj) => {
        const {
          name: {
            en: {
              text
            }
          }
        } = dataObj;
        const nameString = text.replace(/ /g, '');

        componentName = (_.contains(componentNamesArray, nameString)) ? nameString : '';
      }(componentDataObj);

    } catch (e) {
      componentName = '';
    }

    return componentName;
  }

  /**
  * modelContainers(dataObj)
  * Model the data from each container that is fetched from the Refinery
  *
  * @param (Object) dataObj
  */
  modelContainers(dataObj) {
    try {
      const { type, id, name, children, slots } = dataObj;

      return {
        type: type,
        id: id,
        name: this.getContainerName(dataObj),
        children: children ? this.createChildren(children) : [],
        slots: slots ? this.createSlots(slots) : [],
      }
    } catch(e) {
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
  * It does not exist 
  *
  * @param (Object) dataObj
  */
  getContainerName(dataObj) {
    let containerNameObj;

    try {
      (dataObj) => {
        const {
          attributes: {
            name
          }
        } = dataObj;

        containerNameObj = (name) ? name : {};

      }(dataObj);

    } catch (e) {
      containerNameObj = {};
    }
    return containerNameObj;
  }

  /**
  * createChildren(dataArray)
  * Collect and restructure if an item has its children subobject
  *
  * @param (Array) dataArray
  */
  createChildren(dataArray) {
    if (!dataArray || !(_.isArray(dataArray))) {
      return [];
    }

    return _.map(dataArray, d => {
      return this.modelContainers(d);
    });
  }

  /**
  * createSlots(dataArray)
  * Collect and restructure if an item has its children subobject
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

      // Check if different sizes of the images exist
      let bannerImage = currentItem['banner-image'] ?
        currentItem['banner-image'].attributes.uri['full-uri'] : null,
        rectangularImage = currentItem['rectangular-image'] ?
          currentItem['rectangular-image'].attributes.uri['full-uri'] : null,
        squareImage = currentItem['square-image'] ?
          currentItem['square-image'].attributes.uri['full-uri'] : null,
        bookCoverImage = currentItem['book-cover-image'] ?
          currentItem['book-cover-image'].attributes.uri['full-uri'] : null,
        date = currentItem.attributes.date ? currentItem.attributes.date : null,
        firstName = currentItem.attributes['person-first-name'] ?
          currentItem.attributes['person-first-name'] : null,
        lastName = currentItem.attributes['person-last-name'] ?
          currentItem.attributes['person-last-name'] : null,
        authorTitle = currentItem.attributes['person-title'] ?
          currentItem.attributes['person-title'] : null,
        location = currentItem.attributes.location ? currentItem.attributes.location : null;

      return {
        title: (currentItem.attributes.title) ?
          currentItem.attributes.title : '',
        category: (currentItem.attributes.category) ?
          currentItem.attributes.category: '',
        description: (currentItem.attributes.description) ?
          currentItem.attributes.description : '',
        image: {
          bannerImage,
          rectangularImage,
          squareImage,
          bookCoverImage,
        },
        link: (currentItem.attributes.url.length) ?
          currentItem.attributes.url : '',
        date,
        author: {
          title: authorTitle,
          firstName,
          lastName,
        },
        location,
      };
    });
  }
}

export default new Model;
