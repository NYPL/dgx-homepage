

var expect = require('chai').expect
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

// expect(foo).to.be.a('string');
// expect(foo).to.equal('bar');
// expect(foo).to.have.length(3);
// expect(beverages).to.have.property('tea').with.length(3);

// var assert = require('chai').assert;

describe('NYPL Homepage Unit Test: ', function() {
  describe('#indexOf()', function () {
    it('my test', function () {
      // assert.equal(-1, [1,2,3].indexOf(5));
      // assert.equal(-1, [1,2,3].indexOf(0));
      // expect(foo).to.be.a('string');
      // expect(foo).to.equal('bar');
      // expect(foo).to.have.length(3);
      // expect(beverages).to.have.property('tea').with.length(3);
      const build = Model.build;

    it('should have build function', () => {
      expect(build).toBeDefined();
    });
    });
  });
});