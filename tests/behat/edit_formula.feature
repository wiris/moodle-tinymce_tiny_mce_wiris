@editor @tinymce @tinymce_tiny_mce_wiris
Feature: MathType for TinyMCE

  @javascript
  Scenario: Create a formulas
    Given the following config values are set as admin:
      | config | value | plugin |
      | customtoolbar | tiny_mce_wiris_formulaEditor | editor_tinymce  |
    And I log in as "admin"
    And I follow "Preferences" in the user menu
    And I follow "Editor preferences"
    And I set the field "Text editor" to "TinyMCE HTML editor"
    And I press "Save changes"
    And I navigate to "Plugins" in site administration
    And I click on "Manage filters" "link"
    And I click on "On" "option" in the "MathType by WIRIS" "table_row"
    And I open my profile in edit mode
    And I click on "MathType" "button"
    And I switch to "wrs_modal_iframe_id" iframe
    And I wait "5" seconds
    And I set mathtype formula to "1+2"
    And I click on "//input[@class='wrs_button_accept']" "xpath_element"
    And I switch to the main frame
    And I click on "Update profile" "button"
    And I follow "Profile" in the user menu
    # Checking formula image outside edit element.
    Then "//img[@alt='1 plus 2']" "xpath_element" should exist
