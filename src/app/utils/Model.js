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

      // Check if different sizes of the images exist
      let imageSourceBanner = (element['current-item']['banner-image']) ?
        element['current-item']['banner-image'].attributes.uri['full-uri'] :
        null,
        imageSourceRectangular =(element['current-item']['rectangular-image']) ?
          element['current-item']['rectangular-image'].attributes
          .uri['full-uri'] : null,
        imageSourceSquare = (element['current-item']['square-image']) ?
          element['current-item']['square-image'].attributes.uri['full-uri'] :
          null;

      return {
        title: (element['current-item'].attributes.title) ?
          element['current-item'].attributes.title : '',
        category: (element['current-item'].attributes.category) ?
          element['current-item'].attributes.category: '',
        description: (element['current-item'].attributes.description) ?
          element['current-item'].attributes.description : '',
        image: {
          bannerImage: imageSourceBanner,
          rectangularImage: imageSourceRectangular,
          squareImage: imageSourceSquare
        },
        link: (element['current-item'].attributes.url.length) ?
          element['current-item'].attributes.url : ''
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
