// ACTIONS
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
    console.log('this is action', value);
  }
};

export default alt.createActions(Actions);
