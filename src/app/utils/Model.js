import _ from 'underscore';

class Model {

  build(data) {
    //Make sure there's data
    if (!data) {
      return;
    }

    // Decide the type of data
    if (_.isArray(data) && data.length > 0) {
      return this.modelAppData(_.map(data, d => {
        return this.modelContainers(d);
      }));
    } else if (_.isObject(data) && !_.isEmpty(data)) {
      return this.modelAppData(this.modelContainers(data));
    } else {
      return;
    }
  };

  /**
  * modelContainers(data)
  * Model the data from each container that is fetched from the Refinery
  *
  * @param (Array) data
  */
  modelContainers(data) {
    let container = {};

    container.type = data.type;
    container.id = data.id;
    container.name = data.attributes.name;
    container.slots = data.slots ? this.createSlots(data.slots) : null;
    container.children = data.children ? this.createChildren(data.children) : null;

    return container;
  }

  createChildren(children) {
    if (!children) {
      return [];
    }

    return _.map(children, c => {
      return this.modelContainers(c);
    });
  }

  createSlots(slots) {
    if (!slots) {
      return [];
    }

    return slots.map((element) => {
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

  /**
  * modelAppData(data)
  * Collect each modeled container data, and assigne them to different catagory,
  * based on its id. Finally, return an object with keys as the catagories,
  * and values as the arrays of the conatainer slots.
  *
  * @param (Array) data
  */
  modelAppData(data) {
    let AppDataObj = {};

    _.map(data, (d) => {
      AppDataObj[d.name.en.text.replace(/ /g, '')] = d;
    });

    return AppDataObj;
  }

}

export default new Model;
