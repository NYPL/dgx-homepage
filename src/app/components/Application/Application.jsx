import React from 'react';
import HomepageStore from '../../stores/HomepageStore.js';
import Actions from '../../actions/Actions.js';
import HomepageRow from 'dgx-homepage-row-component';
import BlogFeatures from 'dgx-blog-features-component';
import HomepageStaffPicks from 'dgx-homepage-staff-picks-component';
import BooklistWidget from 'dgx-booklist-component';
import Header from 'dgx-header-component';
import FeatureRow from 'dgx-feature-row-component';
import TabbedComponent from 'dgx-tabbed-features-component';
import CarouselComponent from 'dgx-homepage-carousel-component';
import { SeeMoreButton } from 'dgx-react-buttons';
import Footer from 'dgx-react-footer';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = HomepageStore.getState();
  }

  componentDidMount() {
    HomepageStore.listen(this._onChange.bind(this));
  }

  componentWillUnmount() {
    HomepageStore.unlisten(this._onChange.bind(this));
  }

  // Update the state of the class
  _onChange() {
    this.setState({
      carouselIndexValue: HomepageStore.getState().carouselIndexValue
    });
  }

  render() {
    const carouselData = this.state.carouselData.slots, 
      learnSomethingNewData = this.state.learnSomethingNewData.slots,
      ofNoteData = this.state.ofNoteData.slots,
      // whatsHappening is a container with four containers.
      // Each of the 'children' containers contains the slots but they are
      // currently empty.
      whatsHappeningData = this.state.whatsHappeningData,
      carouselIndex = this.state.carouselIndexValue,
      staffPicksData = this.state.staffPicksData.slots,
      booksWeLoveData = this.state.booksWeLoveData;

    return (
      <div>
        <Header />

        <div className='app-wrapper'>

          <HomepageRow
            title={'Learn Something New'}
            link={'/events/classes/calendar'}
            seeMoreStyle={styles.mobileBtn}
            seeMoreId='learn-SeeMore'
            content={
              <FeatureRow
                name={'HP-Learn'}
                id={'HP-Learn'}
                className={'RightColumn'}
                itemsToDisplay = {4}
                items={learnSomethingNewData} />
            } />


        </div>
        <Footer />
      </div>
    );
  }
}

const styles = {
  mobileBtn: {
    fontSize: '25px',
  },
  whiteSeeMoreBtn: {
    color: '#fff',
    border: '2px solid #fff',
    fontSize: '25px',
  }
};

export default App;
