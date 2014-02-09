describe("MapMaker", function() {

  var mapMaker;
  beforeEach(function(){
      mapMaker = new MapMaker();
  });

    describe("MapMaker.getCityFromHostname validation", function() {
      it("should be to return 'toulouse' from getCityFromHostname with empty hostname", function() {
        expect(mapMaker.getCityFromHostname("")).toEqual('toulouse');

      });
      
      it("should return 'toulouse' from getCityFromHostname with 'www.devfriendlyplaces.net'", function(){
         expect(mapMaker.getCityFromHostname("www.devfriendlyplaces.net")).toEqual('toulouse');
      });
      
      
      it("should return 'bordeaux' from getCityFromHostname with 'bordeaux.devfriendlyplaces.net'", function(){
         expect(mapMaker.getCityFromHostname("bordeaux.devfriendlyplaces.net")).toEqual('bordeaux');
      });
      
    });

    describe("MapMaker.placeToHtml validation", function(){
      it("should format place to HTML", function() {
         var place = {
             address: "1 rue blah",
             type: "coffee",
             url: "http://www.blah.com",
             power: {"available": true },
             wifi: {"available" : true }
            };
            
          expect(mapMaker.placeToHtml(place)).toContain("1 rue blah"); 
          expect(mapMaker.placeToHtml(place)).toContain("coffee");
          expect(mapMaker.placeToHtml(place)).toContain("http://www.blah.com");
          expect(mapMaker.placeToHtml(place)).toContain("wifi: yes");
          expect(mapMaker.placeToHtml(place)).toContain("power: yes");
      });
    });
});
