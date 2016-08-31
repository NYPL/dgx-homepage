import React from 'react';

class SkinnyBanner extends React.Component {
  constructor(props) {
    super(props);

    this.createMarkup = this.createMarkup.bind(this);
  }

  createMarkup(bodyText) {
    return { __html: bodyText };
  }

  render() {
    const skinnyBannerStyles =
      `
        .skinnyBanner {
          background-color: #333333;
          color: white;
          font-family: Kievit-Book;
          font-weight: 400;
          min-height: 20px;
          margin: 0;
          padding: 20px 10px;
          text-decoration: none;
        }
        .contentWrapper {
          margin: 0 auto;
          max-width: 1312px;
        }
        .skinnyBannerContent {
          font-size: 17px;
          font-weight: 400;
          letter-spacing: .04em;
          line-height: 24px;
          margin: 0;
        }
        .cookieClearButton {
          background-color: transparent;
          border: none;
          color: inherit;
          cursor: pointer;
          font-family: Kievit-Book;
          font-size: 17px;
          padding: 0;
          text-decoration: underline;
        }
        @media (min-width: 768px) {
          .skinnyBanner {
            padding: 24px;
          }
        }
        @media (min-width: 1023px) {
          .skinnyBanner {
            padding: 20px 30px;
          }
        }
        @media (min-width: 1313px) {
          .skinnyBanner {
            padding: 20px 0;
          }
          .skinnyBannerContent {
            padding: 0 0 0 140px;
          }
        }
      `
    ;
    const surveyLink = (
      <a
        href="https://www.surveymonkey.com/r/BQGKY96"
        target="_blank"
        style={{ color: 'inherit' }}
      >
        survey
      </a>
    );
    const content = (
      <div className="contentWrapper">
        <p className="skinnyBannerContent">
          We've recently made changes to our website. Take a {surveyLink} and let
           us know your feedback.
        </p>
      </div>
    );

    return (
      <div className="skinnyBanner">
        <style
          dangerouslySetInnerHTML={this.createMarkup(skinnyBannerStyles)}
        >
        </style>
        {content}
      </div>
    );
  }
}

export default SkinnyBanner;
