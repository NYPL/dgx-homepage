import Actions from '../actions/Actions.js';
import alt from 'dgx-alt-center';

class HomepageStore {
  constructor() {
    this.bindListeners({
      handleCarouselData: Actions.UPDATE_CAROUSEL_DATA,
      handleLearnSomethingNewData: Actions.UPDATE_LEARN_SOMETHING_NEW_DATA,
      handleOfNoteData: Actions.UPDATE_OF_NOTE_DATA
    });

    this.on('init', () => {
       this.carouselData = [],
       this.learnSomethingNewData = [],
       this.ofNoteData = []
    });
  }

  handleCarouselData(data) {
    this.carouselData = data;
  }

  handleLearnSomethingNewData(data) {
    this.learnSomethingNewData = data;
  }

  handleOfNoteData(data) {
    this.ofNoteData = data;
  }
}

export default alt.createStore(HomepageStore, 'HomepageStore');

