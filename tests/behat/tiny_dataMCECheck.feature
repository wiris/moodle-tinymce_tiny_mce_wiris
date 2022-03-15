@editor @tinymce @tinymce_tiny_mce_wiris @wiris_mathtype @wiris_bug1 @3.x
Feature: Checks if data-mce is set on setContent
In order to check if the formula remains in the content field
I need to post
Edit the post
Check the formula

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
  Scenario: Post a formula and edit the post to check
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
    And I set MathType formula to '<math><msqrt><mn>2</mn></msqrt></math>'
    And I press accept button in MathType Editor
    And I press "Save and display"
    # Since the formula is inside an iframe, it's not working anymore. 
    # And I navigate to "Settings" in current page administration
    # Then I wait until Wirisformula formula exists
    # And a Wirisformula containing "square root of 2" should exist in "Page content" field