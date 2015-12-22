import _ from 'underscore';

class Model {

  build(data) {
    //Make sure there's data
    if (!data) {
      return;
    }

    // Decide the type of data
    if(_.isArray(data) && data.length > 0) {
      return _.map(data, this.ofNoteModel);
    } else if (_.isObject(data) && !_.isEmpty(data)) {
      return this.ofNoteModel(data);
    } else {
      return;
    }
  };

  ofNoteModel(data) {
    let ofNoteItem = {};

    // Populated proper data into ofNoteItem
    ofNoteItem.item = data['current-item'];
    ofNoteItem.title = data['current-item'].attributes.title;
    ofNoteItem.description = data['current-item'].attributes.description;
    ofNoteItem.image = data['current-item']['rectangular-image'].attributes.uri['full-uri'];
    ofNoteItem.link = data['current-item'].attributes.url;

    return ofNoteItem;
  }

}

export default new Model;