import Actions from '../actions/Actions.js';
import alt from 'dgx-alt-center';

class HomepageStore {
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

export default alt.createStore(HomepageStore, 'HomepageStore');

