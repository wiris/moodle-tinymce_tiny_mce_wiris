@editor @tinymce @tinymce_tiny_mce_wiris
Feature: Check MathType enabled  if filter disabled at course level but allow_editorplugin_active_course setting is enabled
In order to check that MathType is enabled if allow_editorplugin_active_course setting is active
I need to disable MathType at course level
Enable allow_editorplugin_active_course setting
Check if MathType is enabled

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
  Scenario: Disable MathType at course level and enable allow_editorplugin_active_course setting
    And I follow "Preferences" in the user menu
    And I follow "Editor preferences"
    And I set the following fields to these values:
      | Text editor | TinyMCE HTML editor |
    And I press "Save changes"
    And I am on "Course 1" course homepage with editing mode on
    And I navigate to "Filters" in current page administration
    And I turn MathType filter off
    And I press "Save changes"
    And I am on "Course 1" course homepage
    And I add a "Page" to section "0"
    Then "MathType" "button" should not exist
    And I navigate to "Plugins" in site administration
    And I follow "MathType by WIRIS"
    And I check editor always active
    And I press "Save changes"
    And I am on "Course 1" course homepage
    And I add a "Page" to section "0"
    Then "MathType" "button" should exist