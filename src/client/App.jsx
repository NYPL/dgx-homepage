import React from 'react';

import alt from 'dgx-alt-center';
import Iso from 'iso';

import './styles/main.scss';

import App from '../app/components/Application/Application.jsx';

import ga from 'react-ga';
import {config} from 'dgx-react-ga';

window.onload = () => {

  if (!window.ga) {
    console.log('Analytics not available - loading through React.');
    var gaOpts = { debug: true };
    // Passing in false for the dev GA code
    ga.initialize(config.google.code(false), gaOpts);
  }

  // Render Isomorphically
  Iso.bootstrap((state, meta, container) => {
    let node = document.getElementById('app');

    console.log('Application rendered Isomorphically.');

    alt.bootstrap(state);
    React.render(<App />, container);
  });
};

