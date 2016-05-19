@editor @editor_tinymce @editor_tinymce_tiny_mce_wiris @javascript
Feature: TinyMCE WIRIS plugin

  Scenario: Create a formula
    Given the following config values are set as admin:
    | config | value | plugin |
    | texteditors | tinymce,atto,textarea |
    And I log in as "admin"
    And I expand "Site administration" node
    And I expand "Plugins" node
    And I expand "Filters" node
    And I follow "Manage filters"
    And I click on "On" "option" in the "Math & Science by WIRIS" "table_row"
    And I follow "Profile" in the user menu
    And I follow "Edit profile"
    And I click on "Toolbar Toggle" "button"
    And I click on "Math editor" "button"
    And I switch to "WIRISeditor" window
    And I set the field with xpath "//input[@class='wrs_focusElement']" to "1+2"
    And I click on "//input[@class='wrs_button_accept']" "xpath_element"
    And I switch to the main window
    And I click on "Update profile" "button"
    Then "//img[@alt=\"1 plus 2\"]" "xpath_element" should exist
