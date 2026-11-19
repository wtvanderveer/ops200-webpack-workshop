/* global it, describe, before, after */
const express = require('express');
const path = require('path');
const { JSDOM } = require('jsdom');
const expect = require('chai').expect;
const axios = require('axios');

const app = express();
app.use(express.static(path.join(__dirname, '/../public')));
app.use(express.static(path.join(__dirname, '/../dist')));

const url = 'http://localhost:8888';
let server;

// Loads the page in a headless DOM, runs bundle.js, and resolves once
// React has rendered a div inside #root (or rejects after the timeout).
function loadPage(timeout = 5000) {
  return JSDOM.fromURL(url, { resources: 'usable', runScripts: 'dangerously' })
    .then(dom => new Promise((resolve, reject) => {
      const start = Date.now();
      (function check() {
        if (dom.window.document.querySelector('#root div')) return resolve(dom);
        if (Date.now() - start > timeout) return reject(new Error('#root div never rendered'));
        return setTimeout(check, 50);
      }());
    }));
}

describe('webpack webpage', function () {
  this.timeout(6500);

  before(done => { server = app.listen(8888, done); });
  after(done => { server.close(done); });

  it('should load with status 200', () => axios.get(url)
    .then(response => expect(response.status).to.equal(200)));

  it('should render a div with react', () =>
    loadPage().then((dom) => {
      const root = dom.window.document.getElementById('root');
      // React 16 no longer adds data-reactroot on the client; it marks the
      // container it renders into with an internal _reactRootContainer key.
      const runningReact = !!root._reactRootContainer;
      dom.window.close();
      expect(runningReact).to.equal(true);
    })
  );
});
