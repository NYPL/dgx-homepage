var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var _ = require('underscore');
var Model = require('./../../../src/app/utils/Model.js');

describe('NYPL Homepage Utils Unit Tests', function () {
  // var Model;

  /*
   * dayFormatUppercase
   *   The input is a string of the name of the weekday.
   *
   *   Returns the name in AP style with uppercase.
   */
  describe('Model: build', function () {
    it('should have build function', function () {
      // console.log(Model.build);
      var build = Model.build;
      expect(build).toBeDefined();
    });
    // beforeEach(inject(function (_build_) {
    //   build = _build_;
    // }));

    // it('should have a dayFormatUppercase function', function () {
    //   expect(dayFormatUppercaseFilter).toBeDefined();
    //   expect(angular.isFunction(dayFormatUppercaseFilter)).toBe(true);
    // });

    // it('should convert the names of week day into AP style', function () {
    //   expect(build('')).toEqual('');
      // expect(dayFormatUppercaseFilter('Tue.')).toEqual('TUES');
      // expect(dayFormatUppercaseFilter('Thu.')).toEqual('THURS');
    // });

    // it('should be an empty string if input is NOT a name of weekday', function () {
    //   expect(dayFormatUppercaseFilter('Banana')).toEqual('');
    //   expect(dayFormatUppercaseFilter()).toBeFalsy();
    // });

    // it('should be an empty string if input is NOT given', function () {
    //   expect(dayFormatUppercaseFilter()).toEqual('');
    //   expect(dayFormatUppercaseFilter()).toBeFalsy();
    // });
  });
});