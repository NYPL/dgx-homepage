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
      handleRecommendedRecentReleasesData: Actions.UPDATE_RECOMMENDED_RECENT_RELEASES_DATA,
      handleWhatsHappeningData: Actions.UPDATE_WHATS_HAPPENING_DATA,
      handleFromOurBlogsData: Actions.UPDATE_FROM_OUR_BLOGS_DATA,
    });

    this.on('init', () => {
      this.carouselData = [],
      this.learnSomethingNewData = [],
      this.ofNoteData = [],
      this.carouselIndexValue = 0,
      this.staffPicksData = [],
      this.recommendedRecentReleasesData = [],
      this.whatsHappeningData = [],
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
    this.staffPicksData = data;
  }

  handleRecommendedRecentReleasesData(data) {
    this.recommendedRecentReleasesData = data;
  }

  handleWhatsHappeningData(data) {
    this.whatsHappeningData = data;
  }

  handleFromOurBlogsData(data) {
    this.fromOurBlogsData = data;
  }
}

export default alt.createStore(HomepageStore, 'HomepageStore');
