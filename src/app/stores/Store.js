import Actions from '../actions/Actions.js';
import alt from 'dgx-alt-center';

class Store {
  constructor() {
    this.bindListeners({
      handleOfNote: Actions.UPDATE_OF_NOTE
    });

    this.on('init', () => {
      this.ofNote = [];
    });
  }

  handleOfNote(data) {
    this.ofNote = data;
  }
}

export default alt.createStore(Store, 'Store');