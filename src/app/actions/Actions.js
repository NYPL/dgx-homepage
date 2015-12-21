// ACTIONS
import alt from 'dgx-alt-center';

class Actions {
  updateOfNote(data) {
    this.dispatch(data);
  }
};

export default alt.createActions(Actions);
