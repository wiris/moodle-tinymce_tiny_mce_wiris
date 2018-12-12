/**
 * Creates a TinyMCE instance on "example" div.
 * @param {String} lang TinyMCE language. MathType integration read this variable to set the editor lang.
 * @param {String} wiriseditorparameters JSON containing MathType Web parameters.
 */
function createEditorInstance(lang, wiriseditorparameters) {

	var dir = 'ltr';
	if (lang == 'ar' || lang == 'he'){
		dir = 'rtl';
	}

	if (typeof wiriseditorparameters == 'undefined') {
		wiriseditorparameters = {};
	}

	let tinyMCEConfiguration = {
		selector: '#example',
		height : 300,
		auto_focus:true,
		directionality : dir,
		menubar : false,
		plugins: 'tiny_mce_wiris',
		toolbar: 'code,|,bold,italic,underline,|,cut,copy,paste,|,search,|,undo,redo,|,forecolor,backcolor,|,justifyleft,justifycenter,justifyright,fontselect,fontsizeselect,|,tiny_mce_wiris_formulaEditor,tiny_mce_wiris_formulaEditorChemistry,|,fullscreen',
		init_instance_callback : "updateFunctionTimeOut",
		setup : function(ed)
		{
			ed.on('init', function()
			{
				this.getDoc().body.style.fontSize = '16px';
				this.getDoc().body.style.fontFamily = 'Arial, "Helvetica Neue", Helvetica, sans-serif';
			});
		},
		
	 };

	// This is done to test when the user doesn't initialize the editor with the language property.
	if (lang !== 'en') {
		tinyMCEConfiguration.language = lang;
	}

 	tinymce.init(tinyMCEConfiguration);
 }

function updateFunctionTimeOut() {
	setTimeout(function(){ updateFunction();}, 500);
}

// Creating TinyMCE demo instance.
if (typeof _wrs_int_langCode !== 'undefined') {
	createEditorInstance(_wrs_int_langCode, {});
} else {
	createEditorInstance('en', {});
}

/**
 * Getting data from editor using getContent TinyMCE method.
 * MathType formulas are parsed to save mode format (mathml, image or base64)
 * For more information see: http://www.wiris.com/es/plugins/docs/full-mathml-mode.
 * @return {String} TinyMCE parsed data.
 */
function getEditorData() {
	return tinymce.get('example').getContent();
}

/**
 * Changes dynamically wiriseditorparameters TinyMCE config variable.
 * @param {Json} json_params MathType Web parameters.
 */
function setParametersSpecificPlugin(wiriseditorparameters) {
	//var lang = tinyMCE.activeEditor.settings.langCode;
	//resetEditor(lang, wiriseditorparameters);
	tinyMCE.activeEditor.settings.wiriseditorparameters = wiriseditorparameters;
	var currentSettings = tinyMCE.activeEditor.settings;
	tinyMCE.activeEditor.destroy();
	tinyMCE.init(currentSettings);
}

function resetEditor(lang){
	var editor_parameters = tinyMCE.activeEditor.settings.wiriseditorparameters;
	tinymce.EditorManager.execCommand('mceRemoveEditor',true, "example");
	createEditorInstance(lang, editor_parameters);
	_wrs_modalWindow = undefined;
}

/**
 * Gets wiriseditorparameters from TinyMCE.
 * @return {Object} MathType Web parameters as JSON. An empty JSON if is not defined.
 */
function getWirisEditorParameters() {
	if (typeof tinyMCE.activeEditor.settings != 'undefined' && typeof tinyMCE.activeEditor.settings.wiriseditorparameters != 'undefined') {
		return tinyMCE.activeEditor.settings.wiriseditorparameters;
	}
	return {};
}
