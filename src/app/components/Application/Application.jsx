import React from 'react';
// ALT & Flux
import HomepageStore from '../../stores/HomepageStore.js';
import Actions from '../../actions/Actions.js';
// NYPL Components
import HomepageRow from 'dgx-homepage-row-component';
import BlogFeatures from 'dgx-blog-features-component';
import HomepageStaffPicks from 'dgx-homepage-staff-picks-component';
import BooklistWidget from 'dgx-booklist-component';
import Header from 'dgx-header-component';
import FeatureRow from 'dgx-feature-row-component';
import TabbedComponent from 'dgx-tabbed-features-component';
import CarouselComponent from 'dgx-homepage-carousel-component';
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

  _onChange() {
    this.setState({
      carouselIndexValue: HomepageStore.getState().carouselIndexValue,
      whatsHappeningIndexValue: HomepageStore.getState().whatsHappeningIndexValue,
    });
  }

  render() {
    //const carouselData = this.state.carouselData.slots;
    //const learnSomethingNewData = this.state.learnSomethingNewData.slots;
    //const ofNoteData = this.state.ofNoteData.slots;
    //const whatsHappeningData = this.state.whatsHappeningData.children;
    //const whatsHappeningIndexValue = this.state.whatsHappeningIndexValue;
    //const carouselIndex = this.state.carouselIndexValue;
    const fromOurBlogsData = this.state.fromOurBlogsData.slots;
    //const staffPicksData = this.state.staffPicksData.slots;
    //const recommendedRecentReleasesData = this.state.recommendedRecentReleasesData.slots;
    /*const slickResponsiveSettings = [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1230,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 915,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 830,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 675,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 2,
        },
      },
    ];*/

    console.log(fromOurBlogsData);

    return (
      <div className="nyplHomepageApp">
        <Header />

        <div className="nyplHomepage">

          <HomepageRow
            title="From Our Blog"
            link="/blog"
            className="blogsRow hpRow nyplGrid"
            seeMoreId="blogs-seeMore"
            content={
              <BlogFeatures
                className="hpBlogs"
                id="hpBlogs"
                items={fromOurBlogsData}
              />
            }
          />

        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
