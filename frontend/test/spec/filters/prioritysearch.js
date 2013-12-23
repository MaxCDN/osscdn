'use strict';

describe('Filter: prioritysearch', function () {

  // load the filter's module
  beforeEach(module('osscdnApp'));

  // initialize a new instance of the filter before each test
  var prioritysearch;
  beforeEach(inject(function ($filter) {
    prioritysearch = $filter('prioritysearch');
  }));

  it('should return the input prefixed with "prioritysearch filter:"', function () {
    var text = 'angularjs';
    expect(prioritysearch(text)).toBe('prioritysearch filter: ' + text);
  });

});
