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
      whatsHappening = this.state.whatsHappening,
      carouselIndex = this.state.carouselIndexValue,
      staffPicks = this.state.staffPicks.slots;

    return (
      <div>
        <Header />

        <div className='app-wrapper'>
          <CarouselComponent id='HP-Carousel' name='HP-Carousel'
            items={carouselData}
            itemIndex={carouselIndex}
            methods={
              {buttonMethod: Actions.setCarouselIndexValue}
            } />

          <HomepageRow
            title={'What’s Happening'}
            link={'/events/'}
            seeMoreId='whatsHappening-SeeMore'
            content={
              <TabbedComponent
                name={'HP-Events'}
                id={'HP-Events'}
                className={'RightColumn'}
                items={[]} />
            } />

          <HomepageRow
            title={'Learn Something New'}
            link={'/events/classes/calendar'}
            seeMoreId='learn-SeeMore'
            content={
              <FeatureRow
                name={'HP-Learn'}
                id={'HP-Learn'}
                className={'RightColumn'}
                // itemsToDisplay = {4}
                items={learnSomethingNewData} />
            } />

          <HomepageRow
            title={'Staff Picks'}
            link={'/staffpicks'}
            seeMoreId='staffPicks-SeeMore'
            content={
              <HomepageStaffPicks
                name={'HP-StaffPicks'}
                id={'HP-StaffPicks'}
                className={'RightColumn'}
                items={[]} />
            } />

          <HomepageRow className={`bookList homepageRow`}
            title={'Books We Love'}
            seeMoreStyle={styles.whiteSeeMoreBtn}
            seeMoreId='BookList-SeeMore'
            content={
              <BooklistWidget
                name={'HP-Booklist'}
                id={'HP-Booklist'}
                className={'bookListWidget'}
                items={[]} />
            } />

          <HomepageRow
            title={'From Our Blog'}
            link={"//nypl.org/blog"}
            seeMoreId='blog-SeeMore'
            content={
              <BlogFeatures
                name={'HP-Blogs'}
                id={'HP-Blogs'}
                className={'RightColumn'}
                items={[]} />
            } />

          <HomepageRow
            title={'Of Note'}
            seeMoreId='ofNote-SeeMore'
            content={
              <FeatureRow
                name={'HP-OfNote'}
                id={'HP-OfNote'}
                className={'RightColumn'}
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
    border: '2px solid #fff'
  }
};

export default App;
