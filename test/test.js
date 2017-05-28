let should = require('chai').should();
let extractLocationFromUrl = require('../js/map').extractLocationFromUrl;

describe('Extract the location from the url', function() {
  it('should return the location from an Url', function () {
    var location = extractLocationFromUrl('cerclon.devfriendlyplaces.net');
    location.should.equal('cerclon');
  })
})
