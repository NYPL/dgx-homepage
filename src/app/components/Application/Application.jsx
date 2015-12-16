
import React from 'react';
import Store from '../../stores/Store.js';
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

    this.state = Store.getState();
  }

  render() {
    return (
      <div>
        <Header skipNav={{target: 'maincontent'}}/>

        <div className="app-wrapper" id="maincontent" tabIndex="-1">
          <CarouselComponent id="HP-Carousel" name="HP-Carousel" items={[]}/>

          <HomepageRow
          title={'What’s Happening'}
          sideBar={
            <div>
            <h2>What’s Happening</h2>
            <SeeMoreButton label="See More..."
            target={"/events/"} />
            </div>
          } content={<TabbedComponent
            name={'HP-Events'}
            id={'HP-Events'}
            className={'RightColumn'}
            items={[]} />
          } />

          <HomepageRow
          title={'Learn Something New'}
          sideBar={
            <div>
            <h2>Learn Something New</h2>
            <SeeMoreButton label="See More..."
            target={"/events/classes/calendar"} />
            </div>
          } content={<FeatureRow
            name={'HP-Learn'}
            id={'HP-Learn'}
            className={'RightColumn'}
            items={[]} />
          } />

          <HomepageRow
          title={'Staff Picks'}
          sideBar={
            <div>
            <h2>Staff Picks</h2>
            <SeeMoreButton label="See More..."
            target={"/staff-picks"} />
            </div>
          } content={
            <HomepageStaffPicks
            name={'HP-StaffPicks'}
            id={'HP-StaffPicks'}
            className={'RightColumn'}
            items={[]} />
          } />

          <HomepageRow
          title={'Books We Love'}
          sideBar={
            <div>
            <h2>Books We Love</h2>
            <SeeMoreButton label="See More..."
            target={"//nypl.org/blog"} />
            </div>
          } content={
            <BooklistWidget
            name={'HP-Booklist'}
            id={'HP-Booklist'}
            className={'RightColumn'}
            items={[]} />
          } />

          <HomepageRow
          title={'From Our Blog'}
          sideBar={
            <div>
            <h2>From Our Blog</h2>
            <SeeMoreButton label="See More..."
            target={"//nypl.org/blog"} />
            </div>
          } content={
            <BlogFeatures
            name={'HP-Blogs'}
            id={'HP-Blogs'}
            className={'RightColumn'}
            items={[]} />
          } />

          <HomepageRow
          title={'Of Note'}
          sideBar={
            <div>
            <h2>Of Note</h2>
            <SeeMoreButton label="See More..."
            target={"https://encrypted.google.com/search?q=good+data"} />
            </div>
          } content={<FeatureRow
            name={'HP-OfNote'}
            id={'HP-OfNote'}
            className={'RightColumn'}
            items={[]} />
          } />

        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
