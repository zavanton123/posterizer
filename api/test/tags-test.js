const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const assert = require('assert');
const {Tag} = require('../src/models/models');

describe('tag test', () => {
  it('get all tags 1', done => {
    Tag.create({name: "demo"})
      .then(tag => {
        assert(tag.name === "demo");
        done();
      });
  });


  it('get all tags 2', done => {
    Tag.create({name: "demo"})
      .then(tag => {
        assert(tag.name === "demo");
        done();
      });
  });
});
