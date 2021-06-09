import mongoose from "mongoose";
import assert from "assert";
import {Tag} from "../src/models/models";

mongoose.Promise = global.Promise;

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
