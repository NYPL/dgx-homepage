// Polyfill Promise for legacy browsers
import "babel-polyfill";

import React from 'react';
import { render } from 'react-dom';
import alt from 'dgx-alt-center';
import Iso from 'iso';
// Homepage App
import App from '../app/components/Application/Application.jsx';
// Analytics (Used for local development. Analytics code is initialized in index.ejs)
// import { ga, config } from 'dgx-react-ga';
// Styles
import './styles/main.scss';

window.onload = () => {
  // if (!window.ga) {
  //   // Passing in false for the dev GA code
  //   ga.initialize(config.google.code(false), { debug: true });
  // }

  // Render Isomorphically
  Iso.bootstrap((state, container) => {
    alt.bootstrap(state);
    render(<App />, container);
  });
};
