@editor @tinymce @tinymce_tiny_mce_wiris @wiris_mathtype
Feature: Use tiny to post with a chemistry formula
In order to check whether a chemistry formula can be displayed correctly
I need to post a chemistry formula

  Background:
    Given the following "courses" exist:
      | fullname | shortname | format |
      | Course 1 | C1        | topics |
    And the following "course enrolments" exist:
      | user     | course | role           |
      | admin  | C1     | editingteacher |
    And the "wiris" filter is "on"
    And the "urltolink" filter is "off"
    And the "mathjaxloader" filter is "off"
    And I log in as "admin"
    And the MathType buttons visibility is set to "1"

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
    And I press "ChemType" in "Page content" field in TinyMCE editor
    And I set MathType formula to '<math><mi mathvariant="normal">H</mi><mn>2</mn><mi mathvariant="normal">O</mi></math>'
    And I press accept button in MathType Editor
    And I press "Save and display"
    Then I wait until ChemTypeformula formula exists
    Then ChemType formula should exist
    And Wirisformula should has height 19 with error of 2
