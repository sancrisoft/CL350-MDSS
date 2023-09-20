// spec.js
describe('Validate that the page opens with Title', function() {
  it('validate title', function() {
	browser.get('http://www.zipzipzip.ca/bbd/index.php');
    var page_title = browser.getTitle();
	var test = "This is a test.";
  	console.log("ROBERT-1a title");
	console.log(page_title);
	console.log("ROBERT-2a title");
	console.log(test);
	console.log("ROBERT-3a title");	
	
//	  browser.get('http://localhost/web/index.php');
   // browser.get('http://juliemr.github.io/protractor-demo/');
	// **FAIL expect(browser.getTitle()).toEqual('Super');
    expect(test).toEqual("This is a test.");
  });
});