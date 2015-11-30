import React from 'react';

import Store from '../../stores/Store.js';
import HomepageRow from 'dgx-homepage-row-component';
import BlogFeatures from 'dgx-blog-features-component'
import HomepageStaffPicks from 'dgx-homepage-staff-picks-component'
import BooklistWidget from 'dgx-booklist-component'


import Header from 'dgx-header-component';
import FeatureRow from 'dgx-feature-row-component';
import { SeeMoreButton } from 'dgx-react-buttons';

let dummyContent = [
    {
      title: 'title01',
      descrption: 'descrption01',
      image: 'http://cdn-prod.www.aws.nypl.org/sites/default/files/FW.jpg',
      link: 'nypl.org'
    },
    {
      title: 'title02',
      descrption: 'descrption02',
      image: 'http://cdn-prod.www.aws.nypl.org/sites/default/files/FW.jpg',
      link: 'nypl.org'
    },
    {
      title: 'title03',
      descrption: 'descrption03',
      image: 'http://cdn-prod.www.aws.nypl.org/sites/default/files/FW.jpg',
      link: 'nypl.org'
    }
  ];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();
    this._getList = this._getList.bind(this);
  }
  
  render() {
    let angularApps = this._getList(this.state._angularApps),
      reactApps = this._getList(this.state._reactApps);

    return (
      <div className='app-wrapper'>
        <Header />
        <h2>NYPL Rocks!</h2>

        <h2>Of Note</h2>
        <FeatureRow name={'HP-OfNote'} id={'HP-OfNote'} className={'RightColumn'} items={dummyContent} />

      	<h2>Staff Picks</h2>
      	<HomepageStaffPicks name={'HP-StaffPicks'} id={'HP-StaffPicks'} className={'RightColumn'} items={[]} />

        <h2>Books We Love</h2>
        <BooklistWidget name={'HP-Booklist'} id={'HP-Booklist'} className={'RightColumn'} items={[]} />

      	<h2>From Our Blog</h2>
      	<BlogFeatures name={'HP-Blogs'} id={'HP-Blogs'} className={'RightColumn'} items={[]} />

	<HomepageRow
	title={'Of Note'}
	sideBar={
	    <div>
            <h2>Of Note</h2>
            <SeeMoreButton label='See More...'
            target={"https://encrypted.google.com/search?q=good+data"} />
            </div>
	} content={<FeatureRow
	    name={'HP-OfNote'}
	    id={'HP-OfNote'}
	    className={'RightColumn'}
	    items={[]} />
	} />
	
        <p>Our Angular Apps</p>
        <ul>
          {angularApps}
        </ul>
        <p>Our React Apps</p>
        <ul>
          {reactApps}
        </ul>
      </div>
    );
  }

  // Helper functions below the render() function:
  _getList(appsArray) {
    return appsArray.map((appName, index) => {
      return (<li key={index}>{appName}</li>);
    });
  }
}

export default App;
