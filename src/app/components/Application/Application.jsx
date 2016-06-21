import React from 'react';
// ALT & Flux
import HomepageStore from '../../stores/HomepageStore.js';
import Actions from '../../actions/Actions.js';
// Utils
import slickResponsiveSettings from '../../utils/slickSettings.js';
// NYPL Components
import Header from 'dgx-header-component';
import HomepageRow from 'dgx-homepage-row-component';
// import BlogFeatures from 'dgx-blog-features-component';
import HomepageStaffPicks from 'dgx-homepage-staff-picks-component';
import BooklistWidget from 'dgx-booklist-component';
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
            ref={i => (this.CarouselComponent = i)}
            items={carouselData.slots}
          />

          <HomepageRow
            title={whatsHappeningData.name}
            link={whatsHappeningData.link}
            className="whatsHappeningRow hpRow nyplGrid"
            seeMoreId="whatsHappening-seeMore"
            content={
              <TabbedComponent
                id="hpWhatsHappening"
                className="hpWhatsHappening"
                items={whatsHappeningData.children}
                index={whatsHappeningIndexValue}
                action={Actions.setWhatsHappeningIndexValue}
              />
            }
          />

          <HomepageRow
            title={learnSomethingNewData.name}
            link={learnSomethingNewData.link}
            className="learnRow hpRow nyplGrid"
            seeMoreId="learn-seeMore"
            content={
              <FeatureRow
                id="hpLearn"
                className="hpLearn"
                itemsToDisplay={4}
                items={learnSomethingNewData.slots}
              />
            }
          />

          <div className="staffPicksRow bgPrimaryLibraryRed">
            <HomepageRow
              title={staffPicksData.name}
              link={staffPicksData.link}
              className="hpRow nyplGrid-fullWidth"
              seeMoreId="staffPicks-SeeMore"
              content={
                <HomepageStaffPicks
                  className="hpStaffPicks"
                  id="hpStaffPicks"
                  items={staffPicksData.slots}
                />
              }
            />
          </div>

          <div className="bookListRow bgSecondaryLibraryRed">
            <HomepageRow
              title={recommendedRecentReleasesData.name}
              link={recommendedRecentReleasesData.link}
              className="hpRow nyplGrid-fullWidth"
              seeMoreId="bookList-seeMore"
              content={
                <BooklistWidget
                  id="hpBookList"
                  className="hpBookList"
                  slickResponsiveSettings={slickResponsiveSettings}
                  bookLists={recommendedRecentReleasesData.slots}
                />
              }
            />
          </div>

          <HomepageRow
            title={fromOurBlogsData.name}
            link={fromOurBlogsData.link}
            className="blogsRow hpRow nyplGrid"
            seeMoreId="blogs-seeMore"
            content={
              <BlogFeatures
                className="hpBlogs"
                id="hpBlogs"
                items={fromOurBlogsData.slots}
              />
            }
          />

          <HomepageRow
            title={ofNoteData.name}
            link={ofNoteData.link}
            className="ofNoteRow hpRow nyplGrid"
            seeMoreId="ofNote-seeMore"
            content={
              <FeatureRow
                id="hpOfNote"
                className="hpOfNote"
                items={ofNoteData.slots}
              />
            }
          />

        </div>

        <Footer id="footer" className="footer" />
      </div>
    );
  }
}

export default App;
