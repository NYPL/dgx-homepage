import _ from 'underscore';

class Model {

  build(data) {
    //Make sure there's data
    if (!data) {
      return;
    }

    // Decide the type of data
    if(_.isArray(data) && data.length > 0) {
      return _.map(data, this.modelItems);
    } else if (_.isObject(data) && !_.isEmpty(data)) {
      return this.modelItems(data);
    } else {
      return;
    }
  };

  modelItems(data) {
    let item = {};

    item.order = data.attributes['sort-order'];
    item.componentData = data.slots.map((element) => {
      return{
        title: element['current-item'].attributes.title,
        description: element['current-item'].attributes.description,
        image: element['current-item']['rectangular-image'].attributes.uri['full-uri'],
        link: element['current-item'].attributes.url
      };
    });

    return item;
  }

}

export default new Model;
