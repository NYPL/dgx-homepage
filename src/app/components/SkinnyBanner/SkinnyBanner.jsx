import React from 'react';

const styles = {
  mainDIV: {
    backgroundColor: '#54514a',
    color: 'white',
    fontFamily: 'Kievit-Medium',
    minHeight: '20px',
    margin: '0',
    padding: '20px 10px',
    textDecoration: 'none',
  },
  textContent: {
    fontSize: '16px',
    fontWeight: '300',
    letterSpacing: '.03em',
    lineHeight: '24px',
    margin: '0',
  },
};

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

          docCookies.setItem('nyplpreview', 0);

          // Refresh the page.
          document.location.reload(true);
        }, false);
      });
    `;
    const ReturnLink = (
      <button
        id="cookieClear"
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          color: 'inherit',
          cursor: 'pointer',
          fontFamily: 'Kievit-Medium',
          fontSize: '16px',
          padding: '0',
          textDecoration: 'underline',
        }}
      >
        Return
      </button>
    );
    const surveyLink = (
      <a
        href="https://www.surveymonkey.com/r/BQGKY96"
        target="_blank"
        style={{ color: 'inherit' }}
      >
        give us feedback
      </a>
    );
    const textContent = (
      <p style={styles.textContent}>
        Thanks for previewing upcoming changes to our website. {ReturnLink} to the 
        current version of our website or {surveyLink} on the new version.
      </p>
    );

    return (
      <div style={styles.mainDIV}>
        <script
          dangerouslySetInnerHTML={this.createMarkup(removeCookieScript)}
        >
        </script>
        {textContent}
      </div>
    );
  }
}

export default SkinnyBanner;
