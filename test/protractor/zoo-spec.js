describe('Validate that the page opens with Title', function() {
  it('validate title', function() {
	browser.get('http://www.thetestroom.com/jswebapp/');
    element(by.model("person.name")).sendKeys("I will subscribe to this channel");
	element(by.binding("person.name")).getText().then(function(text) {
		console.log(text);
	});
  });
});