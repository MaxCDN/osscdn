'use strict';

describe('Service: Paginator', function () {

  // load the service's module
  beforeEach(module('osscdnApp'));

  // instantiate service
  var Paginator;
  beforeEach(inject(function (_Paginator_) {
    Paginator = _Paginator_;
  }));

  it('should do something', function () {
    expect(!!Paginator).toBe(true);
  });

});
