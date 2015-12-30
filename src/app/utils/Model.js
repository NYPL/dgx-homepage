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

    container.id = data.id;
    container.slots = data.slots.map((element) => {
      return {
        title: (element['current-item'].attributes.title) ?
          element['current-item'].attributes.title : '',
        description: (element['current-item'].attributes.description) ?
          element['current-item'].attributes.description : '',
        image: (element['current-item']['rectangular-image']
          .attributes.uri['full-uri'].length) ?
          element['current-item']['rectangular-image'].attributes
          .uri['full-uri'] : '',
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

    for (let i = 0; i < data.length; i++) {
      switch (data[i].id) {
        case '0b83d3c9-3df5-40b5-bdeb-3bdf9e1947b4':
          AppDataObj.learnSomethingNew = data[i].slots;
          break;

        case 'e515e31d-4b2d-495c-a57c-9f894e13d950':
          AppDataObj.ofNote = data[i].slots;
          break;

        default:
          return;
          break;
      }
    };

    return AppDataObj;
  }

}

export default new Model;
