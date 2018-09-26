import React from 'react';
import PropTypes from 'prop-types';

class ImageItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.handleOnError = this.handleOnError.bind(this);

    this.state = {
      loaded: false,
    };
  }

  componentWillUpdate() {
    if (!this.state.loaded) {
      this.handleOnLoad();
    }
  }

  /**
   * @desc Calculates whether a large or small image should be rendered.
   * @param {object} obj - An image object with uri values.
   * @param {number} viewportWidth - The width of the image viewport.
   * @param {number} breakpoint - The current media query breakpoint.
   * @return {object} Returns a string uri of the image to be rendered.
   */
  getImageSrcByViewport(obj, viewportWidth, breakpoint) {
    if (!obj) {
      return '';
    }

    if (viewportWidth > breakpoint) {
      return this.getImage(obj, 'large');
    }
    return this.getImage(obj, 'small');
  }

  /**
   * @desc This function assigns the proper banner image source or defaults to an empty string.
   * @param {object} obj - An image object with its uri values.
   * @param {string} type - What type we want, small or large.
   * @return {string} it returns a string representation of image source or its fallback.
   */
  getImage(obj = {}, type) {
    if (type === 'small') {
      return (obj && obj.mobileBannerImage && obj.mobileBannerImage['full-uri']) ?
        obj.mobileBannerImage['full-uri'] : '';
    }
    if (type === 'large') {
      return (obj && obj.bannerImage && obj.bannerImage['full-uri']) ?
        obj.bannerImage['full-uri'] : '';
    }
    return '';
  }

  /**
   * @desc This function assigns the proper alt text or a fallback.
   * @param {object} obj has the contents of the image object with description.
   * @return {string} Returns the image's alt text or a fallback.
   */
  getImageAlt(obj = {}) {
    let alt;

    try {
      const {
        bannerImage: {
          alt: desc,
        },
      } = obj;

      alt = desc;
    } catch (e) {
      alt = 'We are sorry. This image is not available.';
    }

    return alt;
  }

  /**
   * @desc This function is called on every image load, assigns loaded class when fired.
   * @param {object} Prototype.event global for onLoad method
   */
  handleOnLoad(event) {
    this.setState({ loaded: true });
    if (this.props.handleOnLoad) {
      this.props.handleOnLoad(event);
    }
  }

  /**
   * @desc This function is called on an error image load. Fires an optional handle function.
   */
  handleOnError() {
    if (this.props.handleOnError) {
      this.props.handleOnError();
    }
  }

  render() {
    const {
      image,
      viewportWidth,
      viewportBreakpoint,
    } = this.props;

    const alt = this.getImageAlt(image);
    const imgSrc = this.getImageSrcByViewport(image, viewportWidth, viewportBreakpoint);
    const loadedClass = this.state.loaded ? 'loaded' : 'notLoded';

    return (
      <img
        ref="image"
        className={loadedClass}
        src={imgSrc}
        alt={alt}
        onLoad={this.handleOnLoad}
        onError={this.handleOnError}
        tabIndex="0"
      />
    );
  }
}

ImageItem.propTypes = {
  image: PropTypes.object,
  handleOnLoad: PropTypes.func,
  handleOnError: PropTypes.func,
  viewportWidth: PropTypes.number,
  viewportBreakpoint: PropTypes.number,
};

ImageItem.defaultProps = {
  viewportBreakpoint: 769,
};

export default ImageItem;
