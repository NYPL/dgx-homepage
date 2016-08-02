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
    const removeCookieScript = `
      var docCookies = {
        getItem: function (sKey) {
          if (!sKey) { return null; }
          return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        },
        setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
          if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
          var sExpires = "";
          if (vEnd) {
            switch (vEnd.constructor) {
              case Number:
                sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                break;
              case String:
                sExpires = "; expires=" + vEnd;
                break;
              case Date:
                sExpires = "; expires=" + vEnd.toUTCString();
                break;
            }
          }
          document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
          return true;
        },
        removeItem: function (sKey, sPath, sDomain) {
          if (!this.hasItem(sKey)) { return false; }
          document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
          return true;
        },
        hasItem: function (sKey) {
          if (!sKey) { return false; }
          return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        }
      };

      document.addEventListener("DOMContentLoaded", function(event) {
        var el = document.getElementById('cookieClear');
        el.addEventListener('click', function(event) {
          event.preventDefault();

          docCookies.setItem('nyplpreview', 0, 'Infinity', '/', '.nypl.org');

          // Refresh the page.
          document.location.reload(true);
        }, false);
      });`
    ;
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
    const ReturnLink = (
      <button
        id="cookieClear"
        className="cookieClearButton"
      >
        current version
      </button>
    );
    const surveyLink = (
      <a
        href="https://www.surveymonkey.com/r/BQGKY96"
        target="_blank"
        style={{ color: 'inherit' }}
      >
        feedback
      </a>
    );
    const content = (
      <div className="contentWrapper">
        <p className="skinnyBannerContent">
          Thanks for previewing upcoming changes to our website. Give us your {surveyLink} or 
          return to the {ReturnLink}.
        </p>
      </div>
    );

    return (
      <div className="skinnyBanner">
        <script
          dangerouslySetInnerHTML={this.createMarkup(removeCookieScript)}
        >
        </script>
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
