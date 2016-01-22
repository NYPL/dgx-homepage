import Actions from '../actions/Actions.js';
import alt from 'dgx-alt-center';

class HomepageStore {
  constructor() {
    this.bindListeners({
      handleCarouselData: Actions.UPDATE_CAROUSEL_DATA,
      handleLearnSomethingNewData: Actions.UPDATE_LEARN_SOMETHING_NEW_DATA,
      handleOfNoteData: Actions.UPDATE_OF_NOTE_DATA,
      handleSetCarouselIndexValue: Actions.SET_CAROUSEL_INDEX_VALUE,
      handleStaffPicksData: Actions.UPDATE_STAFF_PICKS_DATA,
      handleStaffPicksCarouselData: Actions.UPDATE_STAFF_PICKS_CAROUSEL_DATA,
      handleWhatsHappeningData: Actions.UPDATE_WHATS_HAPPENING_DATA,
    });

    this.on('init', () => {
      this.carouselData = [],
      this.learnSomethingNewData = [],
      this.ofNoteData = [],
      this.carouselIndexValue = 0,
      this.staffPicksData = [],
      this.staffPicksCarouselData = [],
      this.whatsHappeningData = []
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

  handleSetCarouselIndexValue(value) {
    this.carouselIndexValue = value;
  }

  handleStaffPicksData(data) {
    this.staffPicksData = data;
  }

  handleStaffPicksCarouselData(data) {
    this.staffPicksCarouselData = data;
  }

  handleWhatsHappeningData(data) {
    this.whatsHappeningData = data;
  }
}

export default alt.createStore(HomepageStore, 'HomepageStore');

