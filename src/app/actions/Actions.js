// ACTIONS
import alt from 'dgx-alt-center';

class Actions {
  updateLearnSomethingNewData(data) {
    this.dispatch(data);
  }

   updateOfNoteData(data) {
    this.dispatch(data);
  }
};

export default alt.createActions(Actions);
