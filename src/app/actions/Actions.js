// ACTIONS
import alt from 'dgx-alt-center';

class Actions {
  updateHomepageData(data) {
    this.dispatch(data);
  }
};

export default alt.createActions(Actions);
