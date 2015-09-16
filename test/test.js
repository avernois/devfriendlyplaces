var should = chai.should();

describe('About locations...', function() {
  it('should return a json collection of dfd locations', function () {
    var location = extractLocationFromUrl('cerclon.devfriendlyplaces.net');
    location.should.equal('cerclon');
  })
})
