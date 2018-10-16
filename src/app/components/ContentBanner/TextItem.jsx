import React from 'react';
import PropTypes from 'prop-types';
import { RightArrowIcon } from '@nypl/dgx-svg-icons';

/**
  * @desc Verifies that the property value exists and returns it.
  *   Otherwise, returns the default value.
  * @param {object} prop - Object containing the nested value.
  * @param {string} lang - String representation of the language property name.
  * @param {string} fallback - Fallback value.
  * @returns {string} The string value for the given property match.
  */
function getProperty(prop = {}, lang, fallback) {
  const defaultValue = fallback || null;
  return prop && prop[lang] && prop[lang].text ? prop[lang].text : defaultValue;
}

/**
  * @desc Verifies that the string value exists and returns it. Otherwise, returns
  *   the fallback.
  * @param {string} string - String representation of the target property.
  * @param {string} fallback - Fallback value.
  * @returns {string} The string value for the given property match.
  */
function getString(string, fallback) {
  const defaultValue = fallback || null;
  return (typeof string === 'string' && string !== '') ? string : defaultValue;
}

const TextItem = ({
  className,
  target,
  tag,
  title,
  description,
  location,
  date,
  lang,
  gaClickEvent,
  buttonText,
}) => {
  const content = {
    url: getString(target, '#'),
    tag: getProperty(tag, lang, 'ERROR'),
    title: getProperty(title, lang, 'Something has gone wrong.'),
    desc: getProperty(description, lang),
    date: getProperty(date, lang),
    location: getString(location),
    buttonText: getProperty(buttonText, lang),
  };
  let buttonTextElm = null;
  if (content.buttonText) {
    buttonTextElm = (<span className="btn-text">{content.buttonText}</span>);
  }

  return (
    <div className={className}>
      <a
        href={content.url}
        onClick={gaClickEvent ? () => gaClickEvent('Hero', content.url) : null}
      >
        <span className={`${className}-tag`}>{content.tag}</span>
        <h1 className={`${className}-title`}>{content.title}</h1>
        {
          (content.date || content.location) ?
            <div className={`${className}-details`}>
              {content.date ? <span className={`${className}-date`}>{content.date}</span> : null}
              {content.location ?
                <span className={`${className}-location`}>{content.location}</span> : null
              }
            </div>
          :
            <div className={`${className}-description`}>
              {content.desc ? <p>{content.desc}</p> : null}
            </div>
        }
        <div className="seeMoreLink-container">
          <div
            className="seeMoreLink"
          >
            {buttonTextElm}
            <RightArrowIcon ariaHidden />
          </div>
        </div>
      </a>
    </div>
  );
};

TextItem.propTypes = {
  className: PropTypes.string,
  lang: PropTypes.string,
  target: PropTypes.string,
  location: PropTypes.string,
  tag: PropTypes.object,
  title: PropTypes.object,
  date: PropTypes.object,
  description: PropTypes.object,
  gaClickEvent: PropTypes.func,
  buttonText: PropTypes.object,
};

TextItem.defaultProps = {
  className: 'textItem',
  lang: 'en',
};

export default TextItem;
