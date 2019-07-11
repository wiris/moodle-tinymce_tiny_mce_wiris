@editor @tinymce @tinymce_tiny_mce_wiris
Feature: Checks labes altering lang tag

  Background:
    Given the following "courses" exist:
      | fullname | shortname | format |
      | Course 1 | C1        | topics |
    And outdated langpack 'es' is installed
    And the following "course enrolments" exist:
      | user     | course | role           |
      | admin  | C1     | editingteacher |

  @javascript
  Scenario: Checks labes altering lang tag
    And I log in as "admin"
    And I enable Mathtype filter
    And I follow "Preferences" in the user menu
    And I follow "Editor preferences"
    And I set the following fields to these values:
      | Text editor | TinyMCE HTML editor |
    And I press "Save changes"
    And I navigate to "Language packs" node in "Site administration"
    And I press "Update all installed language packs"
    And I follow "Preferences" in the user menu
    And I follow "Preferred language"
    And I select spanish
    And I press "Save changes"
    And I am on "Course 1" course homepage
    And I navigate to "Activar edición" in current page administration
    And I add a "Foro" to section "0"
    And I set the following fields to these values:
      | Nombre del foro | News Forum |
    And I press "Guardar cambios y regresar al curso"
    And I follow "News Forum"
    And I press "Añadir un nuevo tema de discusión"
    And I set the following fields to these values:
      | Asunto | Test MathType for TiyMCE on Moodle |
    And I press "Barra Toggle"
    And I press "MathType"
    And I set MathType formula to '<math><msqrt><mn>2</mn><mi>&#x3c0;</mi></msqrt></math>'
    And I press accept button in MathType Editor
    And I press "Enviar al foro"
    And I follow "Test MathType for TiyMCE on Moodle"
    Then a Wirisformula containing 'raíz cuadrada de 2 pi fin raíz' should exist