import React from 'react';
// ALT & Flux
import HomepageStore from '../../stores/HomepageStore.js';
import Actions from '../../actions/Actions.js';
// Utils
// import slickResponsiveSettings from '../../utils/slickSettings.js';
// NYPL Components
import Header from 'dgx-header-component';
// import HomepageRow from 'dgx-homepage-row-component';
// import BlogFeatures from 'dgx-blog-features-component';
// import HomepageStaffPicks from 'dgx-homepage-staff-picks-component';
// import BooklistWidget from 'dgx-booklist-component';
// import FeatureRow from 'dgx-feature-row-component';
// import TabbedComponent from 'dgx-tabbed-features-component';
import CarouselComponent from 'dgx-homepage-carousel-component';
//import Footer from 'dgx-react-footer';

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

  _onChange() {
    this.setState({
      whatsHappeningIndexValue: HomepageStore.getState().whatsHappeningIndexValue,
    });
  }

  render() {
    const {
      carouselData,
      whatsHappeningIndexValue,
      whatsHappeningData,
      learnSomethingNewData,
      fromOurBlogsData,
      ofNoteData,
      staffPicksData,
      recommendedRecentReleasesData,
    } = this.state;

    return (
      <div className="nyplHomepageApp">
        <Header skipNav={{ target: 'mainContent' }}/>

        <div className="nyplHomepage" id="mainContent" tabIndex="-1">
          <CarouselComponent
            ref={i => this.CarouselComponent = i}
            items={carouselData.slots}
          />
        </div>
      </div>
    );
  }
}

export default App;
