import _ from 'underscore';

class Model {

  build(data) {
    //Make sure there's data
    if (!data) {
      return;
    }

    // Decide the type of data
    if (_.isArray(data) && data.length > 0) {
      return this.modelAppData(_.map(data, this.modelContainers));
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
    container.slots = data.slots.map((element) => {

      return {
        title: (element['current-item'].attributes.title) ?
          element['current-item'].attributes.title : '',
        description: (element['current-item'].attributes.description) ?
          element['current-item'].attributes.description : '',
        image: (element['current-item']['rectangular-image']) ?
          element['current-item']['rectangular-image'].attributes
          .uri['full-uri'] : null,
        link: (element['current-item'].attributes.url.length) ?
          element['current-item'].attributes.url : ''
      };
    });

    return container;
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

    _.map(data, function(d) {
      AppDataObj[d.name.en.text] = d;
    });

    return AppDataObj;
  }

}

export default new Model;
