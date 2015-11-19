import React from 'react';

import alt from 'dgx-alt-center';
import Iso from 'iso';

import './styles/main.scss';

import App from '../app/components/Application/Application.jsx';


window.onload = () => {
  if (!window.ga) {
    console.log('Analytics not available - loading through React.');
    var gaOpts = { debug: false };
    // ga.initialize('UA-1420324-3', gaOpts);
  }

  // Render Isomorphically
  Iso.bootstrap((state, meta, container) => {
    let node = document.getElementById('app');

    console.log('Application rendered Isomorphically.');

    alt.bootstrap(state);
    React.render(<App />, container);
  });
};

