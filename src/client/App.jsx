// Polyfill Promise for legacy browsers
import "babel-polyfill";

import React from 'react';
import { render } from 'react-dom';
import alt from 'dgx-alt-center';
import Iso from 'iso';
import FeatureFlags from 'dgx-feature-flags';

// Homepage App
import App from '../app/components/Application/Application.jsx';

// Styles
import './styles/main.scss';

window.onload = () => {
  if (!window.dgxFeatureFlags) {
    window.dgxFeatureFlags = FeatureFlags.utils;
  }

  // Render Isomorphically
  Iso.bootstrap((state, container) => {
    alt.bootstrap(state);
    render(<App />, container);
  });
};
