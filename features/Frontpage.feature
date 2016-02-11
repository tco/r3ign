Feature: Frontpage feature
    As a user of R3IGN
    I want to know my application is working properly
    So that I can concentrate on building awesome applications

    Scenario: Seeing frontpage
        Given I am on the R3IGN frontpage
        When I watch the frontpage
        Then I should see "R3IGN" as the page title
