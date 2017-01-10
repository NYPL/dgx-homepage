// Polyfill Promise for legacy browsers
import "babel-polyfill";

import React from 'react';
import { render } from 'react-dom';
import alt from 'dgx-alt-center';
import Iso from 'iso';
import FeatureFlags from 'dgx-feature-flags';

// Homepage App
import App from '../app/components/Application/Application.jsx';

// Analytics
import ga from 'react-ga';
import { config } from 'dgx-react-ga';

// Styles
import './styles/main.scss';

window.onload = () => {
  // Assign the FeatureFlags utility methods to the Global window object
  if (!window.dgxFeatureFlags) {
    window.dgxFeatureFlags = FeatureFlags.utils;
  }

  if (!window.ga) {
    const gaOpts = { debug: true };
    // Passing in false for the dev GA code
    ga.initialize(config.google.code(false), gaOpts);
  }

  // Render Isomorphically
  Iso.bootstrap((state, container) => {
    alt.bootstrap(state);
    render(<App />, container);
  });
};
