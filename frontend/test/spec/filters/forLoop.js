'use strict';

describe('Filter: forLoop', function () {

  // load the filter's module
  beforeEach(module('osscdnApp'));

  // initialize a new instance of the filter before each test
  var forLoop;
  beforeEach(inject(function ($filter) {
    forLoop = $filter('forLoop');
  }));

  it('should return the input prefixed with "forLoop filter:"', function () {
    var text = 'angularjs';
    expect(forLoop(text)).toBe('forLoop filter: ' + text);
  });

});
