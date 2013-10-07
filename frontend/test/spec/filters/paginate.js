'use strict';

describe('Filter: paginate', function () {

  // load the filter's module
  beforeEach(module('osscdnApp'));

  // initialize a new instance of the filter before each test
  var paginate;
  beforeEach(inject(function ($filter) {
    paginate = $filter('paginate');
  }));

  it('should return the input prefixed with "paginate filter:"', function () {
    var text = 'angularjs';
    expect(paginate(text)).toBe('paginate filter: ' + text);
  });

});
