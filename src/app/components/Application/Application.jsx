import React from 'react';
// ALT & Flux
import HomepageStore from '../../stores/HomepageStore.js';
import Actions from '../../actions/Actions.js';
// Google Analytics & Utils
import {
  trackHpRowEvent,
  trackComponentEvent,
} from '../../utils/gaHpUtils';
import slickResponsiveSettings from '../../utils/slickSettings';
// NYPL Components
import { Header, navConfig } from '@nypl/dgx-header-component';
import HomepageRow from 'dgx-homepage-row-component';
import BlogFeatures from 'dgx-blog-features-component';
import HomepageStaffPicks from 'dgx-homepage-staff-picks-component';
import BooklistWidget from 'dgx-booklist-component';
import FeatureRow from 'dgx-feature-row-component';
import TabbedComponent from 'dgx-tabbed-features-component';
import ContentBanner from 'dgx-homepage-content-banner';
import Footer from '@nypl/dgx-react-footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = HomepageStore.getState();
  }

  componentDidMount() {
    HomepageStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    HomepageStore.unlisten(this.onChange.bind(this));
  }

  onChange() {
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
        <Header navData={navConfig.current} skipNav={{ target: 'mainContent' }} />

        <div className="nyplHomepage" id="mainContent" tabIndex="-1">
          <ContentBanner
            ref={i => (this.ContentBanner = i)}
            items={carouselData.slots}
            gaClickEvent={trackComponentEvent()}
          />

          <HomepageRow
            title={whatsHappeningData.name}
            link={whatsHappeningData.link}
            className="whatsHappeningRow hpRow nyplGrid"
            seeMoreId="whatsHappening-seeMore"
            gaClickEvent={trackHpRowEvent('What\'s Happening')}
            content={
              <TabbedComponent
                id="hpWhatsHappening"
                className="hpWhatsHappening"
                items={whatsHappeningData.children}
                index={whatsHappeningIndexValue}
                action={Actions.setWhatsHappeningIndexValue}
                gaClickEvent={trackComponentEvent()}
                gaActionText="What's Happening"
              />
            }
          />

          <HomepageRow
            title={learnSomethingNewData.name}
            link={learnSomethingNewData.link}
            className="learnRow hpRow nyplGrid"
            seeMoreId="learn-seeMore"
            gaClickEvent={trackHpRowEvent('Learn Something New')}
            content={
              <FeatureRow
                id="hpLearn"
                className="hpLearn"
                itemsToDisplay={4}
                items={learnSomethingNewData.slots}
                gaClickEvent={trackComponentEvent()}
                gaActionText="Learn Something New"
              />
            }
          />

          <div className="staffPicksRow bgPrimaryLibraryRed">
            <HomepageRow
              title={staffPicksData.name}
              link={staffPicksData.link}
              className="hpRow nyplGrid-fullWidth"
              seeMoreId="staffPicks-SeeMore"
              gaClickEvent={trackHpRowEvent('Staff Picks')}
              content={
                <HomepageStaffPicks
                  className="hpStaffPicks"
                  id="hpStaffPicks"
                  items={staffPicksData.slots}
                  gaClickEvent={trackComponentEvent()}
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
              gaClickEvent={trackHpRowEvent('New and Noteworthy')}
              content={
                <BooklistWidget
                  id="hpBookList"
                  className="hpBookList"
                  slickResponsiveSettings={slickResponsiveSettings}
                  bookLists={recommendedRecentReleasesData.slots}
                  gaClickEvent={trackComponentEvent()}
                  gaActionText="New and Noteworthy"
                />
              }
            />
          </div>

          <HomepageRow
            title={fromOurBlogsData.name}
            link={fromOurBlogsData.link}
            className="blogsRow hpRow nyplGrid"
            seeMoreId="blogs-seeMore"
            gaClickEvent={trackHpRowEvent('From Our Blog')}
            content={
              <BlogFeatures
                className="hpBlogs"
                id="hpBlogs"
                items={fromOurBlogsData.slots}
                gaClickEvent={trackComponentEvent()}
              />
            }
          />

          <HomepageRow
            title={ofNoteData.name}
            link={ofNoteData.link}
            className="ofNoteRow hpRow nyplGrid"
            seeMoreId="ofNote-seeMore"
            gaClickEvent={trackHpRowEvent('Updates')}
            content={
              <FeatureRow
                id="hpOfNote"
                className="hpOfNote"
                items={ofNoteData.slots}
                gaClickEvent={trackComponentEvent()}
                gaActionText="Updates"
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
