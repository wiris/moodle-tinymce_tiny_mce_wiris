@editor @tinymce @tinymce_tiny_mce_wiris
Feature: Checks if formula can be displayed correctly in full screen
In order to check if formula can be displayed correctly in full screen
I need to write a formula
Open full screen mode
Check the formula

  Background:
    Given the following "courses" exist:
      | fullname | shortname | format |
      | Course 1 | C1        | topics |
    And the following "course enrolments" exist:
      | user     | course | role           |
      | admin  | C1     | editingteacher |
    And the "wiris" filter is "on"
    And I log in as "admin"

  @javascript
  Scenario: Write a formula and activate full screen
    And I follow "Preferences" in the user menu
    And I follow "Editor preferences"
    And I set the following fields to these values:
      | Text editor | TinyMCE HTML editor |
    And I press "Save changes"
    And I am on "Course 1" course homepage with editing mode on
    And I add a "Page" to section "0"
    And I set the following fields to these values:
      | Name | Test WIRIS local labels |
    And I press "Toggle" in "Page content" field in TinyMCE editor
    And I press "MathType" in "Page content" field in TinyMCE editor
    And I set MathType formula to '<math><msqrt><mn>2</mn><mi>&#x3c0;</mi></msqrt></math>'
    And I press accept button in MathType Editor
    And I press "Full screen" in "Page content" field in TinyMCE editor
    Then Wirisformula should has width 39 with error of 4 in full screen mode
    And I press "Full screen" in full screen mode
    And I press "Save and display"
    Then a Wirisformula containing "square root of 2 pi end root" should exist