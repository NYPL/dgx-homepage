import Actions from '../actions/Actions.js';
import alt from 'dgx-alt-center';

class HomepageStore {
  constructor() {
    this.bindListeners({
      handleHomepageData: Actions.UPDATE_HOMEPAGE_DATA
    });

    this.on('init', () => {
      this.homepageData = [];
    });
  }

  handleHomepageData(data) {
    this.homepageData = data;
  }
}

export default alt.createStore(HomepageStore, 'HomepageStore');

