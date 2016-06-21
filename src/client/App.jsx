import React from 'react';
import { render } from 'react-dom';
import alt from 'dgx-alt-center';
import Iso from 'iso';
// Homepage App
import App from '../app/components/Application/Application.jsx';
// Analytics
import ga from 'react-ga';
import { config } from 'dgx-react-ga';
// Styles
import './styles/main.scss';

window.onload = () => {
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
