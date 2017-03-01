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
 * WIRIS Plugin for tinyMCE editor settings page.
 *
 * @package    tinymce
 * @subpackage tiny_mce_wiris
 * @copyright  Maths for More S.L. <info@wiris.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$output = 'WIRIS plugin for TinyMCE (Maths) is correctly installed.';

// Checking that WIRIS plugin is installed.
$filterwiris = $CFG->dirroot . '/filter/wiris/filter.php';
if (!file_exists($filterwiris)) {
    $title = '<span style="color:#aa0000; font-size:18px;">Attention! WIRIS filter is not installed</span>';
    $info = '<a target="_blank" href="http://www.wiris.com/plugins/docs/moodle"><img style="vertical-align:-3px;"'.
        ' alt="" src="https://www.wiris.com/system/files/attachments/1689/WIRIS_manual_icon_17_17.png" /></a>';
    $output = $title . '<br />WIRIS plugin for TinyMCE needs that WIRIS plugin for Moodle 2.x is installed on your Moodle. '.
        $info;
}

$settings->add(new admin_setting_heading('tiny_mce_wiris', '', $output));
