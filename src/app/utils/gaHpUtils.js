import { gaUtils } from 'dgx-react-ga';

/**
 * trackHpEvent()
 * A function that utilizes the gaUtils.trackEvent function to establish
 * 'Homepage' as the global event category.
 */
const trackHpEvent = gaUtils.trackEvent('Homepage');

/**
 * trackHpRowEvent(label)
 * A curried function that returns a function with label as the param to
 * trigger the trackHpEvent function with 'Homepage' as the established category.
 * The action parameter is defined within the component.
 * @param (String) label used for google analytics
 */
const trackHpRowEvent = (label) => (
  (action) => {
    trackHpEvent(action, label);
  }
);

/**
 * trackComponentEvent()
 * A curried function that returns a function with action & label as params to
 * trigger the trackHpEvent function with 'Homepage' as the established category.
 */
const trackComponentEvent = () => (
  (action, label) => {
    trackHpEvent(action, label);
  }
);

export {
  trackHpEvent,
  trackHpRowEvent,
  trackComponentEvent,
};
