var expect = require("chai").expect;
var tools = require("../lib/tools");
describe("dbDESKexist()", function () {
	it("should respond with dB FOUND!", function () {
		var results = tools.dbDESKexist();
		expect(results).to.equal("dB FOUND!");
	});	
});

describe("dbWEBexist()", function () {
	it("should respond with dB FOUND!", function () {
		var results = tools.dbWEBexist();
		expect(results).to.equal("dB FOUND!");
	});	
});
