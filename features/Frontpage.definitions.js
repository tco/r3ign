module.exports = function () {

    this.Given(/^I am on the R3IGN frontpage$/, function (callback) {
        this.visit('http://localhost:3000', callback);
    });

    this.Then(/^I should see "(.*)" as the page title$/, function (title, callback) {
        var pageTitle = this.browser.text('title');
        if (title === pageTitle) {
            callback();
        } else {
            callback(new Error("Expected to be on page with title " + title));
        }
    });

    this.When(/^I click the rotating logo$/, function(callback) {
        this.browser.setCookie({ name: 'rotateLogo', domain: 'localhost', value: 1 });
        this.browser.clickLink('#rotating-link', function() {
            callback();
        });
    });

    this.Then(/^I should have the cookie changing$/, function(callback) {
        if(this.browser.getCookie('rotateLogo') | 0 === 0) {
            callback();
        } else {
            callback(new Error("Expected rotateLogo cookie value to be 0"));
        }
    });

};
