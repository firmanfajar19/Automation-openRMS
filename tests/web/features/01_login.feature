@web @login-web @login @regression
Feature: Login page openRMS on Desktop Website

  Background: [Desktop] User Successfully Access Login Page
    Given [Desktop] User Open Browser and Navigate to Login Page
    Then [Desktop] User See Login Page

  @login-web01 @login-success
  Scenario Outline: [Desktop] User Successfully Login to openRMS at <LOCATION>
    When [Desktop] User Input "REGISTERED_EMAIL" in Email Field
    And [Desktop] User Input "REGISTERED_PASSWORD" in Password Field
    And [Desktop] User Choose "<LOCATION>" for this session
    And [Desktop] User Click Login Button
    Then [Desktop] User Successfully Login to openRMS as "Super User (admin)" at "<LOCATION>"

    Examples:
      | LOCATION          |
      | Inpatient Ward    |
      | Outpatient Clinic |
      | Isolation Ward    |
      | Pharmacy          |
      | Laboratory        |
      | Registration Desk |

  @login-web02 @login-failed
  Scenario Outline: [Desktop] User Failed Login to openRMS with <EMAIL> and <PASSWORD>
    When [Desktop] User Input "<EMAIL>" in Email Field
    And [Desktop] User Input "<PASSWORD>" in Password Field
    And [Desktop] User Choose "Inpatient Ward" for this session
    And [Desktop] User Click Login Button
    Then [Desktop] User Failed Login to openRMS and See Validation Credentials "<ERROR_MESSAGE>" at Login Page

    Examples:
      | EMAIL                | PASSWORD            | ERROR_MESSAGE       |
      | UNREGISTERED_EMAIL   | REGISTERED_PASSWORD | INVALID_CREDENTIALS |
      | REGISTERED_EMAIL     | PASSWORD_INVALID    | INVALID_CREDENTIALS |
      | INVALID_FORMAT_EMAIL | REGISTERED_PASSWORD | INVALID_CREDENTIALS |

  @login-web03 @login-failed
  Scenario: [Desktop] User Failed Login to openRMS without Choose Location
    When [Desktop] User Input "REGISTERED_EMAIL" in Email Field
    And [Desktop] User Input "REGISTERED_PASSWORD" in Password Field
    And [Desktop] User Click Login Button
    Then [Desktop] User Failed Login to openRMS and See Validation Location "INVALID_LOCATION" at Login Page

  @login-web04
  Scenario: [Desktop] User Forgot Password
    When [Desktop] User Click "Can't log in?" Link
    Then [Desktop] User See "DIALOG_ACCOUNT_RECOVERY_MESSAGE" to Recovery Account
    And [Desktop] User Click Okay Button
    Then [Desktop] User See Popup Instructions to Recovery Account Closed

  @login-web05
  Scenario: [Desktop] User See Password Text Shown
    When [Desktop] User Input "REGISTERED_PASSWORD" in Password Field
    And [Desktop] User Click Show Password Toggle Button
    Then [Desktop] User See Password Text Shown

  @login-web06
  Scenario: [Desktop] User See Password Text Hidden
    When [Desktop] User Input "REGISTERED_PASSWORD" in Password Field
    And [Desktop] User Click Show Password Toggle Button Twice
    Then [Desktop] User See Password Text Hidden

  @login-web07 @login-logout
  Scenario: [Desktop] User Logout Successfully
    When [Desktop] User Input "REGISTERED_EMAIL" in Email Field
    And [Desktop] User Input "REGISTERED_PASSWORD" in Password Field
    And [Desktop] User Choose "Inpatient Ward" for this session
    And [Desktop] User Click Login Button
    Then [Desktop] User Successfully Login to openRMS as "Super User (admin)" at "Inpatient Ward"
    And [Desktop] User Click Logout Button
    Then [Desktop] User See Login Page
