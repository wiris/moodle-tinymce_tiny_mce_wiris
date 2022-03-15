@filter @filter_wiris @filter_wiris_settings @wiris_settings @wiris_mathtype @tinymce @tinymce_tiny_mce_wiris @3.x
Feature: Check the Mathtype and chemtype buttons visibility on text editors
In order to check the buttons visibility in tinymce editor
As an admin
I need to change the settings on the filter wiris
and disable the mathtype and chemtype buttons

  Background:
    Given the following config values are set as admin:
      | config | value | plugin |
      | toolbar | math = wiris | editor_tinymce |
    And the following "courses" exist:
      | fullname | shortname | format |
      | Course 1 | C1        | topics |
    And the following "course enrolments" exist:
      | user     | course | role           |
      | admin  | C1     | editingteacher |
    And the "wiris" filter is "on"
    And the "urltolink" filter is "off"
    And the "mathjaxloader" filter is "off"
    And I log in as "admin"
    And I follow "Preferences" in the user menu
    And I follow "Editor preferences"
    And I set the field "Text editor" to "TinyMCE HTML editor"
    And I press "Save changes"
    And the MathType buttons visibility is set to "0"

  @javascript
  Scenario: Disable chemtype and mathtype buttons and check that it is not visible in TinyMCE toolbar
    And I am on "Course 1" course homepage with editing mode on
    And I add a "Page" to section "0"
    And I press "Toggle" in "Page content" field in TinyMCE editor
    Then I check "MathType" in "Page content" field "does not" exist in TinyMCE editor
    And I check "ChemType" in "Page content" field "does not" exist in TinyMCE editor
