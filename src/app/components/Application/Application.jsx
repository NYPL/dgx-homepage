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
      carouselIndexValue: HomepageStore.getState().carouselIndexValue,
      whatsHappeningIndexValue: HomepageStore.getState().whatsHappeningIndexValue,
    });
  }

  render() {
    const carouselData = this.state.carouselData.slots, 
      learnSomethingNewData = this.state.learnSomethingNewData.slots,
      ofNoteData = this.state.ofNoteData.slots,
      whatsHappeningData = this.state.whatsHappeningData.children,
      whatsHappeningIndexValue = this.state.whatsHappeningIndexValue,
      carouselIndex = this.state.carouselIndexValue,
      fromOurBlogsData = this.state.fromOurBlogsData.slots,
      staffPicksData = this.state.staffPicksData.slots,
      recommendedRecentReleasesData = this.state.recommendedRecentReleasesData.slots;

    return (
      <div className='nyplHomepageApp'>
        <Header />

        <div className='nyplHomepage'>
          <CarouselComponent id='hpCarousel' className='hpCarousel'
            items={carouselData}
            itemIndex={carouselIndex}
            methods={
              {buttonMethod: Actions.setCarouselIndexValue}
            } />
            
          <HomepageRow
            className='whatsHappeningRow hpRow nyplGrid'
            title={'What’s Happening'}
            link={'/events/'}
            seeMoreStyle={styles.redSeeMoreBtn}
            seeMoreId='whatsHappening-SeeMore'
            content={
              <TabbedComponent
                id="hpWhatsHappening"
                className="hpWhatsHappening"
                items={whatsHappeningData}
                index={whatsHappeningIndexValue}
                action={Actions.setWhatsHappeningIndexValue}/>
            } />

          <HomepageRow
            className='learnRow hpRow nyplGrid'
            title={'Learn Something New'}
            link={'/events/classes/calendar'}
            seeMoreStyle={styles.redSeeMoreBtn}
            seeMoreId='learn-SeeMore'
            content={
              <FeatureRow
                id={'hpLearn'}
                className={'hpLearn'}
                itemsToDisplay={4}
                items={learnSomethingNewData} />
            } />

          <div className='staffPicksRow bgPrimaryLibraryRed'>
            <HomepageRow
              className='hpRow nyplGrid-fullWidth'
              title={'Staff Picks'}
              link={'/staffpicks'}
              seeMoreId='staffPicks-SeeMore'
              seeMoreStyle={styles.whiteSeeMoreBtn}
              content={
                <HomepageStaffPicks
                  className={'hpStaffPicks'}
                  id={'hpStaffPicks'}
                  items={staffPicksData} />
              } />
          </div>

          <div className='bookListRow bgSecondaryLibraryRed'>
            <HomepageRow
              className={'hpRow nyplGrid-fullWidth'}
              title={'Recent Releases We Love'}
              seeMoreStyle={styles.whiteSeeMoreBtn}
              seeMoreId='bookList-seeMore'
              content={
                <BooklistWidget
                  name={'hpBooklist'}
                  id={'hpBooklist'}
                  className={'hpBooklist'}
                  bookLists={recommendedRecentReleasesData} />
              } />
          </div>

          <HomepageRow
            className='blogsRow hpRow nyplGrid'
            title={'From Our Blog'}
            link={"//nypl.org/blog"}
            seeMoreStyle={styles.redSeeMoreBtn}
            seeMoreId='blog-SeeMore'
            content={
              <BlogFeatures
                className={'hpBlogs'}
                id={'hpBlogs'}
                items={fromOurBlogsData} />
            } />

          <HomepageRow
            title={'Of Note'}
            className='ofNoteRow hpRow nyplGrid'
            seeMoreStyle={styles.redSeeMoreBtn}
            seeMoreId='ofNote-SeeMore'
            content={
              <FeatureRow
                id={'hpOfNote'}
                className={'hpOfNote'}
                items={ofNoteData} />
            } />
        </div>
        <Footer />
      </div>
    );
  }
}

const styles = {
  whiteSeeMoreBtn: {
    color: '#fff',
    border: '2px solid #fff',
    fontSize: '25px',
  },
  redSeeMoreBtn: {
    color: '#ED1C24',
    border: '2px solid #ED1C24',
    fontSize: '25px',
  }
};

export default App;
