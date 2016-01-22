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
      handleFromOurBlogsData: Actions.UPDATE_FROM_OUR_BLOGS_DATA,
    });

    this.on('init', () => {
       this.carouselData = [],
       this.learnSomethingNewData = [],
       this.ofNoteData = [],
       this.carouselIndexValue = 0,
       this.staffPicks = [],
       this.fromOurBlogsData = []
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
    this.staffPicks = data;
  }

  handleFromOurBlogsData(data) {
    this.fromOurBlogsData = data;
  }
}

export default alt.createStore(HomepageStore, 'HomepageStore');

