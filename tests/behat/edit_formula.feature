@editor @tinymce @tinymce_tiny_mce_wiris @wiris_mathtype
Feature: MathType for TinyMCE
  In order to check if formula can be created correctly in tiny
  I need to create a formula in the user profile

  Background:
    Given the following "courses" exist:
      | fullname | shortname | format |
      | Course 1 | C1        | topics |
    And the following "course enrolments" exist:
      | user     | course | role           |
      | admin  | C1     | editingteacher |
    And the "wiris" filter is "on"
    And the "urltolink" filter is "off"
    And I log in as "admin"

  @javascript
  Scenario: Post a chemistry formula
    And I follow "Preferences" in the user menu
    And I follow "Editor preferences"
    And I set the following fields to these values:
      | Text editor | TinyMCE HTML editor |
    And I press "Save changes"
    And I am on "Course 1" course homepage with editing mode on
    And I add a "Page" to section "0"
    And I set the following fields to these values:
      | Name | Test MathType for Atto on Moodle |
    And I press "Toggle" in "Page content" field in TinyMCE editor
    And I press "MathType" in "Page content" field in TinyMCE editor
    And I set MathType formula to '<math><msqrt><mn>2</mn></msqrt></math>'
    And I press accept button in MathType Editor
    And I press "Save and display"
    Then I wait until Wirisformula formula exists
