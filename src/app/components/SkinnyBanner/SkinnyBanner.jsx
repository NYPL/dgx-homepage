import React from 'react';

const ReturnLink = <a href="#" style={{color: 'inherit',}}>Return</a>;
const surveyLink =
  <a
    href="https://www.surveymonkey.com/r/BQGKY96"
    target="_blank"
    style={{color: 'inherit',}}
   >
    give us feedback
  </a>;

const SkinnyBanner = () => {
  const textContent =
    <p style={styles.textContent}>
      Thanks for previewing upcoming changes to our website. {ReturnLink} to the 
      current version of our website or {surveyLink} on the new version.
    </p>;

  return (
    <div style={styles.mainDIV}>
      {textContent}
    </div>
  );
};

const styles = {
  mainDIV: {
    backgroundColor: '#89806F',
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

export default SkinnyBanner;