module.exports = function () {
    this.Given(/^I am on the R3IGN frontpage$/, function (callback) {
        this.visit('http://localhost:3000', callback);
    });

    this.When(/^I watch the frontpage$/, function (callback) {
        callback().pending();
    });

    this.Then(/^I should see "(.*)" as the page title$/, function (title, callback) {
        var pageTitle = this.browser.text('title');
        if (title === pageTitle) {
            callback();
        } else {
            callback(new Error("Expected to be on page with title " + title));
        }
    });
};
