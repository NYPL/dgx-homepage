import React from 'react';
import HomepageStore from '../../stores/HomepageStore.js';
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

// import _ from 'underscore';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = HomepageStore.getState();
  }

  render() {
    let ofNoteData = this.state.ofNote;

    return (
      <div>
        <Header />

        <div className="app-wrapper">
          <CarouselComponent id="HP-Carousel" name="HP-Carousel" items={[]} />

          <HomepageRow
            title={'What’s Happening'}
            link={"/events/"}
            content={
              <TabbedComponent
                name={'HP-Events'}
                id={'HP-Events'}
                className={'RightColumn'}
                items={[]} />
              } />

          <HomepageRow
            title={'Learn Something New'}
            link={"/events/classes/calendar"}
            content={
              <FeatureRow
                name={'HP-Learn'}
                id={'HP-Learn'}
                className={'RightColumn'}
                items={[]} />
            } />

          <HomepageRow
            title={'Staff Picks'}
            link={"/staff-picks"}
            className='StaffPicks homepageRow visuallyHidden'
            content={
              <HomepageStaffPicks
                name={'HP-StaffPicks'}
                id={'HP-StaffPicks'}
                className={'RightColumn'}
                items={[]} />
            } />

          <HomepageRow className={`bookList homepageRow`}
            title={'Books We Love'}
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
            content={
              <BlogFeatures
                name={'HP-Blogs'}
                id={'HP-Blogs'}
                className={'RightColumn'}
                items={[]} />
              } />

          <HomepageRow
            title={'Of Note'}
            content={<FeatureRow
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

export default App;
