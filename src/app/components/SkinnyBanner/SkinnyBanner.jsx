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
      '\n' +
        '.skinnyBannerDiv {\n' +
          'background-color: #54514a;\n' +
          'color: white;\n' +
          'font-family: Kievit-Medium;\n' +
          'min-height: 20px;\n' +
          'margin: 0;\n' +
          'padding: 20px 10px;\n' +
          'text-decoration: none;\n' +
        '}\n' +
        '.textWrapper {\n' +
          '  margin: 0 auto;\n' +
          '  max-width: 1312px;\n' +
        '}\n' +
        '.skinnyBannerText {\n' +
          'font-size: 16px;\n' +
          'font-weight: 300;\n' +
          'letter-spacing: .03em;\n' +
          'line-height: 24px;\n' +
          'margin: 0;\n' +
        '}\n' +
        '.cookieClearButton {\n' +
          'background-color: transparent;\n' +
          'border: none;\n' +
          'color: inherit;\n' +
          'cursor: pointer;\n' +
          'font-family: Kievit-Medium;\n' +
          'font-size: 16px;\n' +
          'padding: 0;\n' +
          'text-decoration: underline;\n' +
        '}\n' +
        '@media (min-width: 768px) {\n' +
          '.skinnyBannerDiv {\n' +
            'padding: 24px;\n' +
          '}\n' +
        '}\n' +
        '@media (min-width: 1023px) {\n' +
          '.skinnyBannerDiv {\n' +
            'padding: 20px 30px;\n' +
          '}\n' +
        '}\n' +
        '@media (min-width: 1313px) {\n' +
          '.skinnyBannerDiv {\n' +
            'padding: 20px 0;\n' +
          '}\n' +
          '.skinnyBannerText {\n' +
            'padding: 0 0 0 140px;\n' +
          '}\n' +
        '}\n'
    ;
    const ReturnLink = (
      <button
        id="cookieClear"
        className="cookieClearButton"
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
      <div className="textWrapper">
        <p className="skinnyBannerText">
          Thanks for previewing upcoming changes to our website. {ReturnLink} to the 
          current version of our website or {surveyLink} on the new version.
        </p>
      </div>
    );

    return (
      <div className="skinnyBannerDiv">
        <script
          dangerouslySetInnerHTML={this.createMarkup(removeCookieScript)}
        >
        </script>
        <style
          dangerouslySetInnerHTML={this.createMarkup(skinnyBannerStyles)}
        >
        </style>
        {textContent}
      </div>
    );
  }
}

export default SkinnyBanner;
