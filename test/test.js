var should = chai.should();

describe('Extract the location from the url', function() {
  it('should return the location from an Url', function () {
    var location = extractLocationFromUrl('cerclon.devfriendlyplaces.net');
    location.should.equal('cerclon');
  })
})
