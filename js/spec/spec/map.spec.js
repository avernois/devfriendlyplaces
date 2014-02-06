describe("Map", function() {
  describe("optionalComment", function() {
    it("should return an empty string when there is no optional comment", function() {
      expect(optionalComment("")).toBe("");
    });
	it("should return the string into braces when there is an optional comment string", function () {
	  expect(optionalComment("some spikes on wifi")).toBe("(some spikes on wifi)");
	});
  });
  
  describe("boolToStr", function() {
    it("should return 'undefined' when there is no parameter", function() {
	  expect(boolToStr()).toBe("undefined");
	});
	it("should return 'yes' when parameter is true", function() {
	  expect(boolToStr(true)).toBe("yes");
	});
	it("should return 'no' when parameter is false", function() {
	  expect(boolToStr(false)).toBe("no");
	});
  });
  
});