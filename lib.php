<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Library functions for WIRIS plugin for Atto.
 *
 * @package    tinymce
 * @subpackage tiny_mce_wiris
 * @copyright  Maths for More S.L. <info@wiris.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

class tinymce_tiny_mce_wiris extends editor_tinymce_plugin {
    protected $buttons = array('tiny_mce_wiris_formulaEditor', 'tiny_mce_wiris_CAS');

    protected function update_init_params(array &$params, context $context,
                                          array $options = null) {
        global $PAGE, $CFG;
        $PAGE->requires->js('/lib/editor/tinymce/plugins/tiny_mce_wiris/baseURL.js', false);

        // Add button after emoticon button in advancedbuttons3.
        $added = $this->add_button_after($params, 3, 'tiny_mce_wiris_formulaEditor', '', false);
        $added = $this->add_button_after($params, 3, 'tiny_mce_wiris_formulaEditorChemistry', '', false);
        $added = $this->add_button_after($params, 3, 'tiny_mce_wiris_CAS', '', false);

        // Add JS file, which uses default name.
        $this->add_js_plugin($params);

        $filterwiris = $CFG->dirroot . '/filter/wiris/filter.php';
        if (!file_exists($filterwiris)) {
            $PAGE->requires->js('/lib/editor/tinymce/plugins/tiny_mce_wiris/js/message.js', false);
        }
    }
}
