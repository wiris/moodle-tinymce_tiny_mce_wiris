@editor @tinymce @tinymce_tiny_mce_wiris
Feature: Check if editor can be reopened

  Background:
    Given the following "courses" exist:
      | fullname | shortname | format |
      | Course 1 | C1        | topics |
    And the following "course enrolments" exist:
      | user     | course | role           |
      | admin  | C1     | editingteacher |

  @javascript
  Scenario: Check if editor can be reopened
    And I log in as "admin"
    And I enable Mathtype filter
    And I follow "Preferences" in the user menu
    And I follow "Editor preferences"
    And I set the following fields to these values:
      | Text editor | TinyMCE HTML editor |
    And I press "Save changes"
    And I am on "Course 1" course homepage with editing mode on
    And I add a "Forum" to section "0"
    And I set the following fields to these values:
      | Forum name | News Forum |
    And I press "Save and return to course"
    And I follow "News Forum"
    And I press "Add a new discussion topic"
    And I set the following fields to these values:
      | Subject | Test MathType for Atto on Moodle |
    And I press "Toolbar Toggle"
    And I press "MathType"
    And I press cancel button in MathType Editor
    And I press "MathType"
    And I set MathType formula to '<math><mfrac><mn>1</mn><msqrt><mn>2</mn><mi>&#x3c0;</mi></msqrt></mfrac></math>'
    And I press accept button in MathType Editor
    And I press "Post to forum"
    And I follow "Test MathType for Atto on Moodle"
    Then a Wirisformula containing 'square root' should exist
    Then Wirisformula should has height 48 with error of 2