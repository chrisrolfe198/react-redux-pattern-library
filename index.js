import React from 'react';
import { renderToString } from 'react-dom/server';
import * as components from 'test-component-library';
import ListComponent from './lib/Components/ListComponent';

const express = require('express');
const app = express();

app.get('/:component*?', function (req, res) {
  let paramsComponent = req.params;
  if (paramsComponent.component !== undefined && Object.keys(paramsComponent).length > 1) {
    const component = paramsComponent.component;
    delete paramsComponent.component;

    let componentPath = components[component];

    for (const item of Object.keys(paramsComponent)) {
      if (paramsComponent[item] && paramsComponent[item].length) {
        console.log(paramsComponent[item].replace(/^\//, ''), paramsComponent);
        componentPath = componentPath[paramsComponent[item].replace(/^\//, '')];
      }
    }

    // Loop over stuff
    if (typeof componentPath === 'function') {
      res.send(renderToString(componentPath()));
    } else if (typeof componentPath === 'object') {
      res.send(renderToString(ListComponent({
        components: Object.keys(componentPath).map(key => componentPath[key])
      })));
    } else {
      res.send('uh oh');
    }
  } else if (paramsComponent.component !== undefined && Object.keys(paramsComponent).length === 1) {
    res.send(renderToString(components[paramsComponent.component]()));
  } else {
    res.send(renderToString(ListComponent({
      components: Object.keys(components).map(key => components[key])
    })))
  }
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
})
