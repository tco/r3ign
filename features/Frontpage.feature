Feature: Frontpage feature
    As a user of R3IGN
    I want to know my application is working properly

    Scenario: Seeing frontpage
        Given I am on the R3IGN frontpage
        Then I should see "R3IGN" as the page title

    Scenario: Clicking the logo
        Given I am on the R3IGN frontpage
        When I click the rotating logo
        Then I should have the cookie changing
