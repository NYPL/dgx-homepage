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

  // Update the state of the class
  _onChange() {
    this.setState({
      carouselIndexValue: HomepageStore.getState().carouselIndexValue,
      whatsHappeningIndexValue: HomepageStore.getState().whatsHappeningIndexValue,
    });
  }

  render() {
    const carouselData = this.state.carouselData.slots;
    const learnSomethingNewData = this.state.learnSomethingNewData.slots;
    const ofNoteData = this.state.ofNoteData.slots;
    const whatsHappeningData = this.state.whatsHappeningData.children;
    const whatsHappeningIndexValue = this.state.whatsHappeningIndexValue;
    const carouselIndex = this.state.carouselIndexValue;
    const fromOurBlogsData = this.state.fromOurBlogsData.slots;
    const staffPicksData = this.state.staffPicksData.slots;
    const recommendedRecentReleasesData = this.state.recommendedRecentReleasesData.slots;
    const slickResponsiveSettings = [
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
    ];

    return (
      <div className={'nyplHomepageApp'}>
        <Header />

        <div className={'nyplHomepage'}>
          <CarouselComponent id={'hpCarousel'} className={'hpCarousel'}
            items={carouselData}
            itemIndex={carouselIndex}
            methods={
              { buttonMethod: Actions.setCarouselIndexValue }
            }
          />

          <HomepageRow
            className={'whatsHappeningRow hpRow nyplGrid'}
            title={'What’s Happening'}
            link={'/events'}
            seeMoreId={'whatsHappening-seeMore'}
            content={
              <TabbedComponent
                id="hpWhatsHappening"
                className="hpWhatsHappening"
                items={whatsHappeningData}
                index={whatsHappeningIndexValue}
                action={Actions.setWhatsHappeningIndexValue}
              />
            }
          />

          <HomepageRow
            className={'learnRow hpRow nyplGrid'}
            title={'Learn Something New'}
            link={'/events/classes/calendar'}
            seeMoreId={'learn-seeMore'}
            content={
              <FeatureRow
                id={'hpLearn'}
                className={'hpLearn'}
                itemsToDisplay={4}
                items={learnSomethingNewData}
              />
            }
          />

          <div className={'staffPicksRow bgPrimaryLibraryRed'}>
            <HomepageRow
              className={'hpRow nyplGrid-fullWidth'}
              title={'Staff Picks'}
              link={'/staffpicks'}
              seeMoreId={'staffPicks-SeeMore'}
              content={
                <HomepageStaffPicks
                  className={'hpStaffPicks'}
                  id={'hpStaffPicks'}
                  items={staffPicksData}
                />
              }
            />
          </div>

          <div className={'bookListRow bgSecondaryLibraryRed'}>
            <HomepageRow
              className={'hpRow nyplGrid-fullWidth'}
              title={'Recent Releases We Love'}
              seeMoreId={'bookList-seeMore'}
              content={
                <BooklistWidget
                  id={'hpBookList'}
                  className={'hpBookList'}
                  slickResponsiveSettings={slickResponsiveSettings}
                  bookLists={recommendedRecentReleasesData}
                />
              }
            />
          </div>

          <HomepageRow
            className={'blogsRow hpRow nyplGrid'}
            title={'From Our Blog'}
            link={"/blog"}
            seeMoreId={'blogs-seeMore'}
            content={
              <BlogFeatures
                className={'hpBlogs'}
                id={'hpBlogs'}
                items={fromOurBlogsData}
              />
            }
          />

          <HomepageRow
            title={'Of Note'}
            className={'ofNoteRow hpRow nyplGrid'}
            seeMoreId={'ofNote-seeMore'}
            content={
              <FeatureRow
                id={'hpOfNote'}
                className={'hpOfNote'}
                items={ofNoteData}
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
