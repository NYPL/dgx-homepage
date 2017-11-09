// Polyfill Promise for legacy browsers
import "babel-polyfill";

import React from 'react';
import { render } from 'react-dom';
import alt from 'dgx-alt-center';
import Iso from 'iso';
import FeatureFlags from 'dgx-feature-flags';
import { config, gaUtils } from 'dgx-react-ga';

// Homepage App
import App from '../app/components/Application/Application.jsx';

// Styles
import './styles/main.scss';

window.onload = () => {
  if (!window.dgxFeatureFlags) {
    window.dgxFeatureFlags = FeatureFlags.utils;
  }

  if (!window.ga) {
    const isProd = process.env.NODE_ENV === 'production';
    const gaOpts = { debug: !isProd, titleCase: false };

    gaUtils.initialize(config.google.code(isProd), gaOpts);
  }

  // Render Isomorphically
  Iso.bootstrap((state, container) => {
    alt.bootstrap(state);
    render(<App />, container);
  });

  gaUtils.trackPageview('send', 'pageview', window.location.pathname);
};
