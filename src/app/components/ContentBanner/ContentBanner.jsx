import React from 'react';
import PropTypes from 'prop-types';
import {
  isEmpty as _isEmpty,
} from 'underscore';

import ImageItem from './ImageItem';
import TextItem from './TextItem';

const MIN_INTERVAL = 0;

class ContentBanner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewportWidth: 0,
    };

    this.handleResize = this.handleResize.bind(this);
    this.renderContentBanner = this.renderContentBanner.bind(this);
    this.handleGAClickEvent = this.handleGAClickEvent.bind(this);
  }

  componentDidMount() {
    window.setTimeout(() => { this.handleResize(); }, MIN_INTERVAL);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  /**
   * @desc Generates the appropriate markup for the content to display in the banner.
   * @param {object} item - Item used to generate content.
   */
  getBannerElement(item) {
    const { viewportWidth } = this.state;
    const content = (
      <div className={`${this.props.className}-wrapper center`}>
        <div className={`${this.props.className}-imageBox`}>
          <ImageItem
            image={item.image}
            viewportWidth={viewportWidth}
            handleOnLoad={this.props.onImageLoad}
          />
        </div>
        <TextItem
          className={`${this.props.className}-content`}
          tag={item.category}
          target={item.link}
          title={item.title}
          description={item.description}
          date={item.date}
          location={item.location}
          gaClickEvent={this.handleGAClickEvent}
          buttonText={item.buttonText}
        />
      </div>
    );

    return content;
  }

  handleGAClickEvent(action, label, event) {
    if (event) {
      event.stopPropagation();
    }
    if (action && label) {
      this.props.gaClickEvent(action, label);
    }
  }

  /**
   * @desc Handles updating the viewportWidth's state only if an instance of
   * contentBanner is initialized.
   */
  handleResize() {
    if (this.contentBanner) {
      this.setState({ viewportWidth: this.contentBanner.offsetWidth });
    }
  }

  /**
   * @desc Returns the proper DOM for the item object.
   * @param {object} item - content item.
   */
  renderContentBanner(item) {
    if (!_isEmpty(item)) {
      return this.getBannerElement(item);
    }

    const {
      tag,
      title,
      description,
    } = this.props.error;

    return (
      <div className="error">
        <h2>{tag}</h2>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  }

  render() {
    const item = this.props.items[0];

    return (
      <div
        ref={i => (this.contentBanner = i)}
        className={this.props.className}
      >
        {this.renderContentBanner(item)}
      </div>
    );
  }
}

ContentBanner.propTypes = {
  items: PropTypes.array.isRequired,
  className: PropTypes.string,
  onImageLoad: PropTypes.func,
  error: PropTypes.object,
  gaClickEvent: PropTypes.func,
};

ContentBanner.defaultProps = {
  className: 'hpContentBanner',
  items: [],
  error: {
    tag: 'ERROR',
    title: 'Something has gone wrong.',
    description: 'We\'re sorry. Information isn\'t available for this feature.',
  },
};

export default ContentBanner;
