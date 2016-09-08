import alt from 'dgx-alt-center';

class Actions {
  updateCarouselData(data) {
    this.dispatch(data);
  }

  updateLearnSomethingNewData(data) {
    this.dispatch(data);
  }

  updateOfNoteData(data) {
    this.dispatch(data);
  }

  setCarouselIndexValue(value) {
    this.dispatch(value);
  }

  updateStaffPicksData(data) {
    this.dispatch(data);
  }

  updateRecommendedRecentReleasesData(data) {
    this.dispatch(data);
  }

  updateWhatsHappeningData(data) {
    this.dispatch(data);
  }

  setWhatsHappeningIndexValue(value) {
    this.dispatch(value);
  }

  updateFromOurBlogsData(data) {
    this.dispatch(data);
  }
}

export default alt.createActions(Actions);
