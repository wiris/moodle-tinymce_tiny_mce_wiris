@editor @tinymce @tinymce_tiny_mce_wiris
Feature: Checks labes altering lang tag
In order to check if labels are correct when lang tag is altered
I need to update installed language packs
Change the language
Check the labels

  Background:
    Given the following "courses" exist:
      | fullname | shortname | format |
      | Course 1 | C1        | topics |
    And the following "course enrolments" exist:
      | user     | course | role           |
      | admin  | C1     | editingteacher |
    And outdated langpack 'es' is installed
    And the "wiris" filter is "on"
    And I log in as "admin"

  @javascript
  Scenario: Chaange the language and
    And I follow "Preferences" in the user menu
    And I follow "Editor preferences"
    And I set the following fields to these values:
      | Text editor | TinyMCE HTML editor |
    And I press "Save changes"
    And I navigate to "Site administration" in site administration
    And I follow "Language packs"
    And I press "Update all installed language packs"
    And I follow "Preferences" in the user menu
    And I follow "Preferred language"
    And I select spanish
    And I press "Save changes"
    And I am on "Course 1" course homepage
    And I navigate to "Activar edición" in current page administration
    And I add a "Página" to section "0"
    And I set the following fields to these values:
      | Nombre | Test WIRIS local labels |
    And I press "Toggle" in "Page content" field in TinyMCE editor
    And I press "MathType" in "Page content" field in TinyMCE editor
    And I set MathType formula to '<math><msqrt><mn>2</mn><mi>&#x3c0;</mi></msqrt></math>'
    And I press accept button in MathType Editor
    And I press "Guardar cambios y mostrar"
    Then a Wirisformula containing 'raíz cuadrada de 2 pi fin raíz' should exist