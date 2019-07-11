@editor @tinymce @tinymce_tiny_mce_wiris
Feature: Check MathType disabled if filter disabled at activity forum level

  Background:
    Given the following "courses" exist:
      | fullname | shortname | format |
      | Course 1 | C1        | topics |
    And the following "course enrolments" exist:
      | user     | course | role           |
      | admin  | C1     | editingteacher |

  @javascript
  Scenario: Check MathType disabled if filter disabled at activity forum level
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
    Then "MathType" "button" should exist
    And I navigate to "Filters" in current page administration
    And I turn MathType filter off
    And I press "Save changes"
    And I am on "Course 1" course homepage
    And I follow "News Forum"
    And I press "Add a new discussion topic"
    Then "MathType" "button" should not exist