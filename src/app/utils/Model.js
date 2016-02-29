import _ from 'underscore';

class Model {

  build(data) {
    //Make sure there's data
    if (!data) {
      return null;
    }

    // Decide the type of data
    if (_.isArray(data) && data.length > 0) {
      return this.modelAppData(_.map(data, d => {
        return this.modelContainers(d);
      }));
    } else if (_.isObject(data) && !_.isEmpty(data)) {
      // *modelAppData can't handle object
      return this.modelAppData(this.modelContainers(data));
    } else {
      return null;
    }
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
    // Should have a type check here, typeof data === object, or === array
    // it should get an array
    let appObjectData = {
      'What\'sHappening': [],
      Banner: [],
      LearnSomethingNew: [],
      OfNote: [],
      FromOurBlog: [],
      StaffPicks: [],
      RecommendedRecentReleases: [],
    },
    arrayTest = ['What\'sHappening', 'Banner', 'LearnSomethingNew', 
    'OfNote', 'FromOurBlog', 'StaffPicks', 'RecommendedRecentReleases'];

    if (!dataArray || !(_.isArray(dataArray))) {
      return appObjectData;
    }

    if(dataArray.length > 0) {
      _.map(dataArray, d => {
        let name = d.name.en.text.replace(/ /g, '');

        if (arrayTest.includes(name)) {
          appObjectData[d.name.en.text.replace(/ /g, '')] = d;
        }
      })
    };

    return appObjectData;
  }

  /**
  * modelContainers(dataObj)
  * Model the data from each container that is fetched from the Refinery
  *
  * @param (Object) dataObj
  */
  modelContainers(dataObj) {
    let container = {};

    container.type = dataObj.type;
    container.id = dataObj.id;
    container.name = dataObj.attributes.name || {};
    container.slots = dataObj.slots ? this.createSlots(dataObj.slots) : [];
    container.children = dataObj.children ? this.createChildren(dataObj.children) : [];

    return container;
  }

  /**
  * createChildren(dataArray)
  * Collect and restructure if an item has its children subobject
  *
  * @param (Array) dataArray
  */
  createChildren(dataArray) {
    if (!dataArray) {
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
    if (!dataArray) {
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
