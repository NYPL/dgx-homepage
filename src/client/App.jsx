// Polyfill Promise for legacy browsers
import "babel-polyfill";

import React from 'react';
import { render } from 'react-dom';
import alt from 'dgx-alt-center';
import Iso from 'iso';
import FeatureFlags from 'dgx-feature-flags';
import { gaUtils } from 'dgx-react-ga';

// Homepage App
import App from '../app/components/Application/Application.jsx';

// Styles
import './styles/main.scss';

window.onload = () => {
  if (!window.dgxFeatureFlags) {
    window.dgxFeatureFlags = FeatureFlags.utils;
  }

  if (!window.ga) {
    const gaOpts = { debug: false, titleCase: false };

    gaUtils.initialize('UA-1420324-3', gaOpts);
  }

  // Render Isomorphically
  Iso.bootstrap((state, container) => {
    alt.bootstrap(state);
    render(<App />, container);
  });
};
