var WirisPlugin =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _coreSrc = __webpack_require__(1);

	var _coreSrc2 = _interopRequireDefault(_coreSrc);

	var _parser = __webpack_require__(3);

	var _parser2 = _interopRequireDefault(_parser);

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _image = __webpack_require__(9);

	var _image2 = _interopRequireDefault(_image);

	var _configuration = __webpack_require__(10);

	var _configuration2 = _interopRequireDefault(_configuration);

	var _listeners = __webpack_require__(14);

	var _listeners2 = _interopRequireDefault(_listeners);

	var _backwardslib = __webpack_require__(23);

	var _backwardslib2 = _interopRequireDefault(_backwardslib);

	var _polyfills = __webpack_require__(24);

	var _polyfills2 = _interopRequireDefault(_polyfills);

	var _integrationmodel = __webpack_require__(22);

	var _integrationmodel2 = _interopRequireDefault(_integrationmodel);

	var _mathml = __webpack_require__(6);

	var _mathml2 = _interopRequireDefault(_mathml);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
	    Core: _coreSrc2.default,
	    Parser: _parser2.default,
	    Image: _image2.default,
	    MathML: _mathml2.default,
	    Util: _util2.default,
	    Configuration: _configuration2.default,
	    Listeners: _listeners2.default,
	    IntegrationModel: _integrationmodel2.default
	};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _stringmanager = __webpack_require__(13);

	var _stringmanager2 = _interopRequireDefault(_stringmanager);

	var _contentmanager = __webpack_require__(15);

	var _contentmanager2 = _interopRequireDefault(_contentmanager);

	var _modal = __webpack_require__(17);

	var _modal2 = _interopRequireDefault(_modal);

	var _serviceprovider = __webpack_require__(8);

	var _serviceprovider2 = _interopRequireDefault(_serviceprovider);

	var _parser = __webpack_require__(3);

	var _parser2 = _interopRequireDefault(_parser);

	var _latex = __webpack_require__(4);

	var _latex2 = _interopRequireDefault(_latex);

	var _mathml2 = __webpack_require__(6);

	var _mathml3 = _interopRequireDefault(_mathml2);

	var _customeditors = __webpack_require__(19);

	var _customeditors2 = _interopRequireDefault(_customeditors);

	var _configuration = __webpack_require__(10);

	var _configuration2 = _interopRequireDefault(_configuration);

	var _jsvariables = __webpack_require__(20);

	var _jsvariables2 = _interopRequireDefault(_jsvariables);

	var _event = __webpack_require__(21);

	var _event2 = _interopRequireDefault(_event);

	var _listeners = __webpack_require__(14);

	var _listeners2 = _interopRequireDefault(_listeners);

	var _integrationmodel = __webpack_require__(22);

	var _integrationmodel2 = _interopRequireDefault(_integrationmodel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Class representing MathType integration Core. This class is the integration entry point. Manages integration
	 * initialization (services, languages), events, and the insertion of the formulas in the edititon area.
	 *
	 */
	var Core = function () {
	    /**
	     * Core class constructor. Admits a string containing the configurationjs service
	     * which loads all JavaScript configuration generated in the backend. This file is needed
	     * to instantiate the serviceProvider class (all services lives in the same path).
	     */
	    function Core() {
	        _classCallCheck(this, Core);

	        /**
	         * Language. Needed for accessibility and locales.
	         * @type {string} language - 'en' by default.
	         */
	        this.language = 'en';

	        /**
	         * Edit mode. Admit 'images' and 'latex' values.
	         * @type {string}
	         */
	        this.editMode = 'images';

	        /**
	         * Modal dialog.
	         * @type {ModalDialog}
	         */
	        this.modalDialog = null;

	        /**
	         * Core custom editors. By default only chemistry editor.
	         * @type {CustomEditors}
	         */
	        this.customEditors = new _customeditors2.default();
	        var chemEditorParams = {
	            name: 'Chemistry',
	            toolbar: 'chemistry',
	            icon: 'chem.png',
	            confVariable: 'chemEnabled',
	            title: 'ChemType',
	            tooltip: 'Insert a chemistry formula - ChemType' // TODO: Localize tooltip.
	        };
	        this.customEditors.addEditor('chemistry', chemEditorParams);

	        /**
	         * Environment properties. This object contains data about the integration platform.
	         * @type {Object}
	         * @property {string} editor - Editor name. Usually the HTML editor.
	         * @property {string} mode - Save mode. Xml by default
	         * @property {string} version - Plugin version.
	         */
	        this.environment = {};

	        /**
	         * Edit properties. This object.
	         * @type {Object}
	         * @property {boolean} isNewElement - Indicates if the edit formula is a new one or not.
	         * @property {Img} temporalImage - Image of the formula edited. Null if the formula is a new one.
	         * @property {Range} latexRange - LaTeX formula range.
	         * @property {Range} range - Image range.
	         * @property {string} editMode - Edition mode. Images by default.
	         */
	        this.editionProperties = {
	            isNewElement: true,
	            temporalImage: null,
	            latexRange: null,
	            range: null

	            /**
	             * Integration model.
	             * @type {IntegrationModel}
	             */
	        };this.integrationModel = null;

	        /**
	         * ContentManager instance.
	         * @type {ContentManager}
	         */
	        this.contentManager = null;

	        /**
	         * Information about the current browser.
	         * @type {string}
	         */
	        this.browser = function get_browser() {
	            var ua = navigator.userAgent;
	            if (ua.search("Edge/") >= 0) {
	                return "EDGE";
	            } else if (ua.search("Chrome/") >= 0) {
	                return "CHROME";
	            } else if (ua.search("Trident/") >= 0) {
	                return "IE";
	            } else if (ua.search("Firefox/") >= 0) {
	                return "FIREFOX";
	            } else if (ua.search("Safari/") >= 0) {
	                return "SAFARI";
	            }
	        }();

	        /**
	         * Plugin listeners.
	         * @type {Array}
	         */
	        this.listeners = new _listeners2.default();
	    }

	    /**
	     * Initializes the core.
	     * @param {string} integrationPath path to the integration root folder.
	     */


	    Core.prototype.init = function init(integrationPath) {
	        this.load(integrationPath);
	    };

	    /**
	     * Sets the integration model object.
	     * @param {IntegrationModel} integrationModel
	     */


	    Core.prototype.setIntegrationModel = function setIntegrationModel(integrationModel) {
	        this.integrationModel = integrationModel;
	    };

	    /**
	     * This method set an object containing environment properties. The structure for the an
	     * environment object is the following:
	     * - editor - Integration editor (normally the HTML editor).
	     * - mode - Save mode.
	     * - version - Plugin version.
	     * @param {object} environmentObject - And object containing environment properties.
	     */


	    Core.prototype.setEnvironment = function setEnvironment(environmentObject) {
	        if ('editor' in environmentObject) {
	            this.environment.editor = environmentObject.editor;
	        }
	        if ('mode' in environmentObject) {
	            this.environment.mode = environmentObject.mode;
	        }
	        if ('version' in environmentObject) {
	            this.environment.version = environmentObject.version;
	        }
	    };

	    /**
	     * Get modal dialog
	     * @returns {ModalDialog} Modal Window core instance.
	     */


	    Core.prototype.getModalDialog = function getModalDialog() {
	        return this.modalDialog;
	    };

	    /**
	     * This method inits the Core class doing the following:
	     *
	     * Calls (async) to configurationjs service, converting the response JSON into javascript variables
	     * Once the configurationjs has been loaded
	     * @ignore
	     */


	    Core.prototype.load = function load(integrationPath) {
	        var httpRequest = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	        this.integrationPath = integrationPath.indexOf("/") == 0 || integrationPath.indexOf("http") == 0 ? integrationPath : _util2.default.concatenateUrl(this.integrationModel.getPath(), integrationPath);
	        httpRequest.open('GET', this.integrationPath, false);
	        // Async request.
	        httpRequest.onload = function (e) {
	            var _this = this;

	            if (httpRequest.readyState === 4) {
	                // Loading configuration variables.
	                var jsonConfiguration = JSON.parse(httpRequest.responseText);
	                var variables = Object.keys(jsonConfiguration);
	                _configuration2.default.addConfiguration(jsonConfiguration);
	                // Adding JavaScript (not backend) configuration variables.
	                _configuration2.default.addConfiguration(_jsvariables2.default);
	                // Load service paths.
	                this.loadServicePaths();
	                // Load lang file.
	                this.loadLangFile();
	                this.loadCSS();
	                // Fire 'onLoad' event. All integration must listen this event in order to know if the plugin has been properly loaded.
	                // We need to wait until stringManager has been loaded.
	                if (Core.stringManager === null) {
	                    var stringManagerListener = _listeners2.default.newListener('onLoad', function () {
	                        _this.listeners.fire('onLoad', {});
	                    });
	                    Core.stringManager.addListener(stringManagerListener);
	                } else {
	                    this.listeners.fire('onLoad', {});
	                }
	            }
	        }.bind(this);
	        httpRequest.send(null);
	    };

	    /**
	     * Instantiate a new ServiceProvider path (static) and calculate all the backend services
	     * paths using Core integrationPath as base path.
	     */


	    Core.prototype.loadServicePaths = function loadServicePaths() {
	        // Services path (tech dependant).
	        var createImagePath = this.integrationPath.replace('configurationjs', 'createimage');
	        var showImagePath = this.integrationPath.replace('configurationjs', 'showimage');
	        var createImagePath = this.integrationPath.replace('configurationjs', 'createimage');
	        var getMathMLPath = this.integrationPath.replace('configurationjs', 'getmathml');
	        var servicePath = this.integrationPath.replace('configurationjs', 'service');

	        // Some backend integrations (like Java o Ruby) have an absolute backend path,
	        // for example: /app/service. For them we calculate the absolute URL path, i.e
	        // protocol://domain:port/app/service
	        if (this.integrationPath.indexOf("/") == 0) {
	            var serverPath = this.getServerPath();
	            showImagePath = serverPath + showImagePath;
	            createImagePath = serverPath + createImagePath;
	            getMathMLPath = serverPath + getMathMLPath;
	            servicePath = serverPath + servicePath;
	        }

	        _serviceprovider2.default.setServicePath('showimage', showImagePath);
	        _serviceprovider2.default.setServicePath('createimage', createImagePath);
	        _serviceprovider2.default.setServicePath('service', servicePath);
	        _serviceprovider2.default.setServicePath('getmathml', getMathMLPath);
	    };

	    /**
	     * Get the base URL (i.e the URL on core.js lives).
	     * @ignore
	     */


	    Core.prototype.getServerPath = function getServerPath() {
	        var url = this.integrationModel.getPath();
	        var hostNameIndex = url.indexOf("/", url.indexOf("/") + 2);
	        return url.substr(0, hostNameIndex);
	    };

	    /**
	     * Loads language file using core.js as relative path.
	     * @ignore
	     */


	    Core.prototype.loadLangFile = function loadLangFile() {
	        // Translated languages.
	        var languages = 'ar,ca,cs,da,de,en,es,et,eu,fi,fr,gl,he,hr,hu,it,ja,ko,nl,no,pl,pt,pt_br,ru,sv,tr,zh,el';

	        var langArray = languages.split(',');
	        var lang = this.language;

	        if (langArray.indexOf(lang) == -1) {
	            lang = lang.substr(0, 2);
	        }

	        if (langArray.indexOf(lang) == -1) {
	            lang = 'en';
	        }

	        var script = document.createElement('script');
	        script.type = 'text/javascript';
	        script.src = this.integrationModel.getPath() + '/' + this.integrationModel.langFolderName + '/' + lang + '/strings.js';
	        // When strings are loaded, it loads into stringManager
	        script.onload = function () {
	            Core.getStringManager().loadStrings(wrs_strings);
	        };
	        document.getElementsByTagName('head')[0].appendChild(script);
	    };

	    /**
	     * It appends css files to the html header.
	     * @ignore
	     */


	    Core.prototype.loadCSS = function loadCSS() {
	        var fileRef = document.createElement("link");
	        fileRef.setAttribute("rel", "stylesheet");
	        fileRef.setAttribute("type", "text/css");
	        fileRef.setAttribute("href", _util2.default.concatenateUrl(this.integrationModel.getPath(), '/core/modal.css'));
	        document.getElementsByTagName("head")[0].appendChild(fileRef);
	    };

	    /**
	     * Add a plugin listener.
	     * @param {object} listener
	     */


	    Core.prototype.addListener = function addListener(listener) {
	        this.listeners.add(listener);
	    };

	    /**
	     * Add a global plugin listener.
	     * @param {object} listener
	     */


	    Core.addGlobalListener = function addGlobalListener(listener) {
	        Core.globalListeners.add(listener);
	    };

	    /**
	     * Inserts or modifies formulas in a specified target.
	     * @param {object} focusElement Element to be focused
	     * @param {object} windowTarget Window where the editable content is
	     * @param {string} mathml Mathml code
	     * @param {object} wirisProperties Extra attributes for the formula (like background color or font size).
	     * @ignore
	     */


	    Core.prototype.updateFormula = function updateFormula(focusElement, windowTarget, mathml, wirisProperties) {
	        // Before update listener.
	        // Params on beforeUpdate listener
	        // - mathml
	        // - editMode (read only)
	        // - wirisProperties
	        // - language (read only).
	        var e = new _event2.default();

	        e.mathml = mathml;

	        // Cloning wirisProperties object
	        // We don't want wirisProperties object modified.
	        e.wirisProperties = {};

	        for (var attr in wirisProperties) {
	            e.wirisProperties[attr] = wirisProperties[attr];
	        }

	        // Read only.
	        e.language = this.language;
	        e.editMode = this.editMode;

	        if (this.listeners.fire('onBeforeFormulaInsertion', e)) {
	            return;
	        }

	        if (Core.globalListeners.fire('onBeforeFormulaInsertion', e)) {
	            return;
	        }

	        mathml = e.mathml;
	        wirisProperties = e.wirisProperties;

	        // Setting empty params for after.
	        e = new _event2.default();
	        e.editMode = this.editMode;
	        e.windowTarget = windowTarget;
	        e.focusElement = focusElement;

	        if (mathml.length == 0) {
	            this.insertElementOnSelection(null, focusElement, windowTarget);
	        } else if (this.editMode == 'latex') {
	            e.latex = _latex2.default.getLatexFromMathML(mathml);
	            // this.integrationModel.getNonLatexNode is an integration wrapper to have special behaviours for nonLatex.
	            // Not all the integrations have special behaviours for nonLatex.
	            if (!!this.integrationModel.fillNonLatexNode && !e.latex) {
	                this.integrationModel.fillNonLatexNode(e, windowTarget, mathml);
	            } else {
	                e.node = windowTarget.document.createTextNode('$$' + e.latex + '$$');
	                _latex2.default.cache.populate(e.latex, mathml);
	            }
	            this.insertElementOnSelection(e.node, focusElement, windowTarget);
	        } else if (this.editMode == 'iframes') {
	            var iframe = wrs_mathmlToIframeObject(windowTarget, mathml);
	            this.insertElementOnSelection(iframe, focusElement, windowTarget);
	        } else {
	            e.node = _parser2.default.mathmlToImgObject(windowTarget.document, mathml, wirisProperties, this.language);
	            this.insertElementOnSelection(e.node, focusElement, windowTarget);
	        }

	        if (this.listeners.fire('onAfterFormulaInsertion', e)) {
	            return;
	        }

	        if (Core.globalListeners.fire('onAfterFormulaInsertion', e)) {
	            return;
	        }
	    };

	    /**
	     * Sets the caret after 'node' and focus node owner document.
	     * @param {Object} node node that it will be behind the caret after the execution.
	     * @ignore
	     */


	    Core.prototype.placeCaretAfterNode = function placeCaretAfterNode(node) {
	        this.integrationModel.getSelection();
	        var nodeDocument = node.ownerDocument;
	        if (typeof nodeDocument.getSelection !== 'undefined') {
	            var range = nodeDocument.createRange();
	            range.setStartAfter(node);
	            range.collapse(true);
	            var selection = nodeDocument.getSelection();
	            selection.removeAllRanges();
	            selection.addRange(range);
	            nodeDocument.body.focus();
	        }
	    };

	    /**
	     * Replaces a selection with an element.
	     * @param {object} element Element
	     * @param {object} focusElement Element to be focused
	     * @param {object} windowTarget Target
	     * @ignore
	     */


	    Core.prototype.insertElementOnSelection = function insertElementOnSelection(element, focusElement, windowTarget) {
	        if (this.editionProperties.isNewElement) {
	            if (focusElement.type == "textarea") {
	                _util2.default.updateTextArea(focusElement, element.textContent);
	            } else if (document.selection && document.getSelection == 0) {
	                var range = windowTarget.document.selection.createRange();
	                windowTarget.document.execCommand('InsertImage', false, element.src);

	                if (!('parentElement' in range)) {
	                    windowTarget.document.execCommand('delete', false);
	                    range = windowTarget.document.selection.createRange();
	                    windowTarget.document.execCommand('InsertImage', false, element.src);
	                }

	                if ('parentElement' in range) {
	                    var temporalObject = range.parentElement();

	                    if (temporalObject.nodeName.toUpperCase() == 'IMG') {
	                        temporalObject.parentNode.replaceChild(element, temporalObject);
	                    } else {
	                        // IE9 fix: parentNode() does not return the IMG node, returns the parent DIV node. In IE < 9, pasteHTML does not work well.
	                        range.pasteHTML(_util2.default.createObjectCode(element));
	                    }
	                }
	            } else {
	                var editorSelection = this.integrationModel.getSelection();
	                var _range = void 0;
	                // In IE is needed keep the range due to after focus the modal window it can't be retrieved the last selection.
	                if (this.editionProperties.range) {
	                    _range = this.editionProperties.range;
	                    this.editionProperties.range = null;
	                } else {
	                    _range = editorSelection.getRangeAt(0);
	                }

	                // Delete if something was surrounded.
	                _range.deleteContents();

	                var node = _range.startContainer;
	                var position = _range.startOffset;

	                if (node.nodeType == 3) {
	                    // TEXT_NODE.
	                    node = node.splitText(position);
	                    node.parentNode.insertBefore(element, node);
	                } else if (node.nodeType == 1) {
	                    // ELEMENT_NODE.
	                    node.insertBefore(element, node.childNodes[position]);
	                }

	                this.placeCaretAfterNode(element);
	            }
	        } else if (this.editionProperties.latexRange) {
	            if (document.selection && document.getSelection == 0) {
	                this.editionProperties.isNewElement = true;
	                this.editionProperties.latexRange.select();
	                this.insertElementOnSelection(element, focusElement, windowTarget);
	            } else {
	                var parentNode = this.editionProperties.latexRange.startContainer;
	                this.editionProperties.latexRange.deleteContents();
	                this.editionProperties.latexRange.insertNode(element);
	                this.placeCaretAfterNode(element);
	            }
	        } else if (focusElement.type == "textarea") {
	            var item = void 0;
	            // Wrapper for some integrations that can have special behaviours to show latex.
	            if (typeof this.integrationModel.getSelectedItem !== 'undefined') {
	                item = this.integrationModel.getSelectedItem(focusElement, false);
	            } else {
	                item = _util2.default.getSelectedItemOnTextarea(focusElement);
	            }
	            _util2.default.updateExistingTextOnTextarea(focusElement, element.textContent, item.startPosition, item.endPosition);
	        } else {
	            if (!element) {
	                // Editor empty, formula has been erased on edit.
	                this.editionProperties.temporalImage.parentNode.removeChild(this.editionProperties.temporalImage);
	            }
	            this.editionProperties.temporalImage.parentNode.replaceChild(element, this.editionProperties.temporalImage);
	            this.placeCaretAfterNode(element);
	        }
	    };

	    /**
	     * Opens a new modal dialog.
	     * @param {string} language Language code for the editor
	     * @param {object} target The editable element
	     * @param {boolean} isIframe Specifies if the target is an iframe or not
	     * @param {boolean} isModal Specifies if the target is a modal window or not
	     * @return {object} The opened window
	     * @ignore
	     */


	    Core.prototype.openModalDialog = function openModalDialog(language, target, isIframe) {
	        // Textarea elements don't have normal document ranges. It only accepts latex edit.
	        this.editMode = 'images';

	        // In IE is needed keep the range due to after focus the modal window it can't be retrieved the last selection.
	        try {
	            if (isIframe) {
	                // Is needed focus the target first.
	                target.contentWindow.focus();
	                var selection = target.contentWindow.getSelection();
	                this.editionProperties.range = selection.getRangeAt(0);
	            } else {
	                // Is needed focus the target first.
	                target.focus();
	                var selection = getSelection();
	                this.editionProperties.range = selection.getRangeAt(0);
	            }
	        } catch (e) {
	            this.editionProperties.range = null;
	        }

	        if (isIframe === undefined) {
	            isIframe = true;
	        }

	        this.editionProperties.latexRange = null;

	        if (target) {
	            var selectedItem;
	            if (typeof this.integrationModel.getSelectedItem !== 'undefined') {
	                selectedItem = this.integrationModel.getSelectedItem(target, isIframe);
	            } else {
	                selectedItem = _util2.default.getSelectedItem(target, isIframe);
	            }

	            // Check LaTeX if and only if the node is a text node (nodeType==3).
	            if (selectedItem !== null && selectedItem.node.nodeType === 3) {
	                if (!!this.integrationModel.getMathmlFromTextNode) {
	                    // If integration has this function it isn't set range due to we don't
	                    // know if it will be put into a textarea as a text or image.
	                    var mathml = this.integrationModel.getMathmlFromTextNode(selectedItem.node, selectedItem.caretPosition);
	                    if (mathml) {
	                        this.editMode = 'latex';
	                        this.editionProperties.isNewElement = false;
	                        this.editionProperties.temporalImage = document.createElement('img');
	                        this.editionProperties.temporalImage.setAttribute(_configuration2.default.get('imageMathmlAttribute'), _mathml3.default.safeXmlEncode(mathml));
	                    }
	                } else {
	                    var latexResult = _latex2.default.getLatexFromTextNode(selectedItem.node, selectedItem.caretPosition);
	                    if (latexResult) {
	                        var _mathml = _latex2.default.getMathMLFromLatex(latexResult.latex);
	                        this.editMode = 'latex';
	                        this.editionProperties.isNewElement = false;
	                        this.editionProperties.temporalImage = document.createElement('img');
	                        this.editionProperties.temporalImage.setAttribute(_configuration2.default.get('imageMathmlAttribute'), _mathml3.default.safeXmlEncode(_mathml));
	                        var windowTarget = isIframe ? target.contentWindow : window;

	                        if (target.tagName.toLowerCase() !== 'textarea') {
	                            if (document.selection) {
	                                var leftOffset = 0;
	                                var previousNode = latexResult.startNode.previousSibling;

	                                while (previousNode) {
	                                    leftOffset += _util2.default.getNodeLength(previousNode);
	                                    previousNode = previousNode.previousSibling;
	                                }

	                                this.editionProperties.latexRange = windowTarget.document.selection.createRange();
	                                this.editionProperties.latexRange.moveToElementText(latexResult.startNode.parentNode);
	                                this.editionProperties.latexRange.move('character', leftOffset + latexResult.startPosition);
	                                this.editionProperties.latexRange.moveEnd('character', latexResult.latex.length + 4); // Plus 4 for the '$$' characters.
	                            } else {
	                                this.editionProperties.latexRange = windowTarget.document.createRange();
	                                this.editionProperties.latexRange.setStart(latexResult.startNode, latexResult.startPosition);
	                                this.editionProperties.latexRange.setEnd(latexResult.endNode, latexResult.endPosition);
	                            }
	                        }
	                    }
	                }
	            } else if (target.tagName.toLowerCase() === 'textarea') {
	                // By default editMode is 'images', but when target is a textarea it needs to be 'latex'.
	                this.editMode = 'latex';
	            }
	        }

	        // Setting an object with the editor parameters.
	        // Editor parameters can be customized in several ways:
	        // 1 - editorAttributes: Contains the default editor attributes, usually the metrics in a comma separated string. Always exists.
	        // 2 - editorParameters: Object containing custom editor parameters. These parameters are defined in the backend. So they affects
	        //     all integration instance.

	        // The backend send the default editor attributes in a coma separated with the following structure:
	        // key1=value1,key2=value2...
	        var defaultEditorAttributesArray = _configuration2.default.get('editorAttributes').split(", ");
	        var defaultEditorAttributes = {};
	        for (var i = 0, len = defaultEditorAttributesArray.length; i < len; i++) {
	            var tempAtribute = defaultEditorAttributesArray[i].split('=');
	            var key = tempAtribute[0];
	            var value = tempAtribute[1];
	            defaultEditorAttributes[key] = value;
	        }
	        // Custom editor parameters.
	        var editorAttributes = {};
	        _extends(editorAttributes, defaultEditorAttributes, _configuration2.default.get('editorParameters'));
	        editorAttributes.language = this.language;
	        editorAttributes.rtl = this.integrationModel.rtl;

	        var contentManagerAttributes = {};
	        contentManagerAttributes.editorAttributes = editorAttributes;
	        contentManagerAttributes.language = this.language;
	        contentManagerAttributes.customEditors = this.customEditors;
	        contentManagerAttributes.environment = this.environment;

	        if (this.modalDialog == null) {
	            this.modalDialog = new _modal2.default(editorAttributes);
	            this.contentManager = new _contentmanager2.default(contentManagerAttributes);
	            // When an instance of ContentManager is created we need to wait until the ContentManager is ready
	            // by listening 'onLoad' event
	            var listener = _listeners2.default.newListener('onLoad', function () {
	                this.contentManager.isNewElement = this.editionProperties.isNewElement;
	                if (this.editionProperties.temporalImage != null) {
	                    var mathML = _mathml3.default.safeXmlDecode(this.editionProperties.temporalImage.getAttribute(_configuration2.default.get('imageMathmlAttribute')));
	                    this.contentManager.mathML = mathML;
	                }
	            }.bind(this));
	            this.contentManager.addListener(listener);
	            this.contentManager.init();
	            this.modalDialog.setContentManager(this.contentManager);
	            this.contentManager.setModalDialogInstance(this.modalDialog);
	        } else {
	            this.contentManager.isNewElement = this.editionProperties.isNewElement;
	            if (this.editionProperties.temporalImage != null) {
	                var mathML = _mathml3.default.safeXmlDecode(this.editionProperties.temporalImage.getAttribute(_configuration2.default.get('imageMathmlAttribute')));
	                this.contentManager.mathML = mathML;
	            }
	        }
	        this.contentManager.setIntegrationModel(this.integrationModel);
	        this.modalDialog.open();
	    };

	    /**
	     * Get the Core instance of the ServiceProvider class.
	     * @returns {ServiceProvider} ServiceProvider instance.  .
	     */


	    Core.getServiceProvider = function getServiceProvider() {
	        return Core.serviceProvider;
	    };

	    /**
	     * Get Core StringManager class.
	     * @returns {StringManager} StringManager instance
	     */


	    Core.getStringManager = function getStringManager() {
	        return Core.stringManager;
	    };

	    /**
	     * Adds textarea events.
	     * @param {object} textarea Target
	     * @param {function} clickHandler Function to run when user clicks the textarea.
	     */


	    Core.prototype.addTextareaEvents = function addTextareaEvents(textarea, clickHandler) {
	        if (clickHandler) {
	            _util2.default.addEvent(textarea, 'click', function (event) {
	                var realEvent = event ? event : window.event;
	                clickHandler(textarea, realEvent);
	            });
	        }
	    };

	    /**
	     * Return an object with all custom editors.
	     */


	    Core.prototype.getCustomEditors = function getCustomEditors() {
	        return this.customEditors;
	    };

	    return Core;
	}();

	/**
	 * Plugin static listeners.
	 * @type {Array}
	 * @description Array containing pluginListeners.
	 */


	exports.default = Core;
	Core.globalListeners = new _listeners2.default();

	/**
	 * Class to manage plugin locales.
	 * @type {StringManager}
	 */
	Core.stringManager = new _stringmanager2.default();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _parser = __webpack_require__(3);

	var _parser2 = _interopRequireDefault(_parser);

	var _mathml = __webpack_require__(6);

	var _mathml2 = _interopRequireDefault(_mathml);

	var _configuration = __webpack_require__(10);

	var _configuration2 = _interopRequireDefault(_configuration);

	var _latex = __webpack_require__(4);

	var _latex2 = _interopRequireDefault(_latex);

	var _constants = __webpack_require__(7);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This class represents an utility class.
	 */
	var Util = function () {
	    function Util() {
	        _classCallCheck(this, Util);
	    }

	    /**
	     * Fires an element event.
	     * @param {object} element element where event should be fired.
	     * @param {string} event event to fire.
	     * @ignore
	     */
	    Util.fireEvent = function fireEvent(element, event) {
	        if (document.createEvent) {
	            var eventObject = document.createEvent('HTMLEvents');
	            eventObject.initEvent(event, true, true);
	            return !element.dispatchEvent(eventObject);
	        }

	        var eventObject = document.createEventObject();
	        return element.fireEvent('on' + event, eventObject);
	    };

	    /**
	     * Cross-browser addEventListener/attachEvent function.
	     * @param {object} element Element target
	     * @param {event} event Event
	     * @param {function} func Function to run
	     * @ignore
	     */


	    Util.addEvent = function addEvent(element, event, func) {
	        if (element.addEventListener) {
	            element.addEventListener(event, func, true);
	        } else if (element.attachEvent) {
	            element.attachEvent('on' + event, func);
	        }
	    };

	    /**
	     * Cross-browser removeEventListener/detachEvent function.
	     * @param {object} element Element target
	     * @param {event} event Event
	     * @param {function} func Function to run
	     * @ignore
	     */


	    Util.removeEvent = function removeEvent(element, event, func) {
	        if (element.removeEventListener) {
	            element.removeEventListener(event, func, true);
	        } else if (element.detachEvent) {
	            element.detachEvent('on' + event, func);
	        }
	    };

	    /**
	     * Adds element events.
	     * @param {object} target Target
	     * @param {function} doubleClickHandler Function to run when user double clicks the element
	     * @param {function} mousedownHandler Function to run when user mousedowns the element
	     * @param {function} mouseupHandler Function to run when user mouseups the element
	     * @ignore
	     */


	    Util.addElementEvents = function addElementEvents(target, doubleClickHandler, mousedownHandler, mouseupHandler) {
	        if (doubleClickHandler) {
	            Util.addEvent(target, 'dblclick', function (event) {
	                var realEvent = event ? event : window.event;
	                var element = realEvent.srcElement ? realEvent.srcElement : realEvent.target;
	                doubleClickHandler(element, realEvent);
	            });
	        }

	        if (mousedownHandler) {
	            Util.addEvent(target, 'mousedown', function (event) {
	                var realEvent = event ? event : window.event;
	                var element = realEvent.srcElement ? realEvent.srcElement : realEvent.target;
	                mousedownHandler(element, realEvent);
	            });
	        }

	        if (mouseupHandler) {
	            Util.addEvent(target, 'mouseup', function (event) {
	                var realEvent = event ? event : window.event;
	                var element = realEvent.srcElement ? realEvent.srcElement : realEvent.target;
	                mouseupHandler(element, realEvent);
	            });
	        }
	    };

	    /**
	     * Checks if a determined array contains a determined element.
	     * @param {array} stack
	     * @param {object} element
	     * @return bool
	     * @ignore
	     */


	    Util.arrayContains = function arrayContains(stack, element) {
	        for (var i = stack.length - 1; i >= 0; --i) {
	            if (stack[i] === element) {
	                return i;
	            }
	        }

	        return -1;
	    };

	    /**
	     * Adds a specific className to given element
	     * @param  {object} element
	     * @param  {string} className
	     * @ignore
	     */


	    Util.addClass = function addClass(element, className) {
	        if (!Util.containsClass(element, className)) {
	            element.className += " " + className;
	        }
	    };

	    /**
	     * Checks if an element contains a class.
	     * @param {object} element
	     * @param {string} className
	     * @return bool
	     * @ignore
	     */


	    Util.containsClass = function containsClass(element, className) {
	        if (element == null || !('className' in element)) {
	            return false;
	        }

	        var currentClasses = element.className.split(' ');

	        for (var i = currentClasses.length - 1; i >= 0; --i) {
	            if (currentClasses[i] == className) {
	                return true;
	            }
	        }

	        return false;
	    };

	    /**
	     * Remove a specific class
	     * @param {object} element
	     * @param {string} className
	     * @ignore
	     */


	    Util.removeClass = function removeClass(element, className) {
	        var newClassName = '';
	        var classes = element.className.split(" ");

	        for (var i = 0; i < classes.length; i++) {
	            if (classes[i] != className) {
	                newClassName += classes[i] + " ";
	            }
	        }
	        element.className = newClassName.trim();
	    };

	    /**
	     * Converts old xmlinitialtext attribute (with «») to the correct one(with §lt;§gt;)
	     * @param {string} text String containtg safeXml characters
	     * @return {string} String with the safeXml charaters parsed.
	     * @ignore
	     */


	    Util.convertOldXmlinitialtextAttribute = function convertOldXmlinitialtextAttribute(text) {
	        // Used to fix a bug with Cas imported from Moodle 1.9 to Moodle 2.x.
	        // This could be removed in future.
	        var val = 'value=';

	        var xitpos = text.indexOf('xmlinitialtext');
	        var valpos = text.indexOf(val, xitpos);
	        var quote = text.charAt(valpos + val.length);
	        var startquote = valpos + val.length + 1;
	        var endquote = text.indexOf(quote, startquote);

	        var value = text.substring(startquote, endquote);

	        var newvalue = value.split('«').join('§lt;');
	        newvalue = newvalue.split('»').join('§gt;');
	        newvalue = newvalue.split('&').join('§');
	        newvalue = newvalue.split('¨').join('§quot;');

	        text = text.split(value).join(newvalue);
	        return text;
	    };

	    /**
	     * Cross-browser solution for creating new elements.
	     *
	     * It fixes some browser bugs.
	     *
	     * @param {string} elementName The tag name of the wished element.
	     * @param {object} attributes An object where each key is a wished attribute name and each value is its value.
	     * @param {object} creator Optional param. If supplied, this function will use the "createElement" method from this param. Else, "document" will be used.
	     * @return {object} The DOM element with the specified attributes assignated.
	     * @ignore
	     */


	    Util.createElement = function createElement(elementName, attributes, creator) {
	        if (attributes === undefined) {
	            attributes = {};
	        }

	        if (creator === undefined) {
	            creator = document;
	        }

	        var element;

	        /*
	        * Internet Explorer fix:
	        * If you create a new object dynamically, you can't set a non-standard attribute.
	        * For example, you can't set the "src" attribute on an "applet" object.
	        * Other browsers will throw an exception and will run the standard code.
	        */

	        try {
	            var html = '<' + elementName;

	            for (var attributeName in attributes) {
	                html += ' ' + attributeName + '="' + Util.htmlEntities(attributes[attributeName]) + '"';
	            }

	            html += '>';
	            element = creator.createElement(html);
	        } catch (e) {
	            element = creator.createElement(elementName);

	            for (var attributeName in attributes) {
	                element.setAttribute(attributeName, attributes[attributeName]);
	            }
	        }

	        return element;
	    };

	    /**
	     * Creates new object using its html code.
	     * @param {string} objectCode html code
	     * @return {object} html object.
	     * @ignore
	     */


	    Util.createObject = function createObject(objectCode, creator) {
	        if (creator === undefined) {
	            creator = document;
	        }

	        // Internet Explorer can't include "param" tag when is setting an innerHTML property.
	        objectCode = objectCode.split('<applet ').join('<span wirisObject="WirisApplet" ').split('<APPLET ').join('<span wirisObject="WirisApplet" '); // It is a 'span' because 'span' objects can contain 'br' nodes.
	        objectCode = objectCode.split('</applet>').join('</span>').split('</APPLET>').join('</span>');

	        objectCode = objectCode.split('<param ').join('<br wirisObject="WirisParam" ').split('<PARAM ').join('<br wirisObject="WirisParam" '); // It is a 'br' because 'br' can't contain nodes.
	        objectCode = objectCode.split('</param>').join('</br>').split('</PARAM>').join('</br>');

	        var container = Util.createElement('div', {}, creator);
	        container.innerHTML = objectCode;

	        function recursiveParamsFix(object) {
	            if (object.getAttribute && object.getAttribute('wirisObject') == 'WirisParam') {
	                var attributesParsed = {};

	                for (var i = 0; i < object.attributes.length; ++i) {
	                    if (object.attributes[i].nodeValue !== null) {
	                        attributesParsed[object.attributes[i].nodeName] = object.attributes[i].nodeValue;
	                    }
	                }

	                var param = Util.createElement('param', attributesParsed, creator);

	                // IE fix.
	                if (param.NAME) {
	                    param.name = param.NAME;
	                    param.value = param.VALUE;
	                }

	                param.removeAttribute('wirisObject');
	                object.parentNode.replaceChild(param, object);
	            } else if (object.getAttribute && object.getAttribute('wirisObject') == 'WirisApplet') {
	                var attributesParsed = {};

	                for (var i = 0; i < object.attributes.length; ++i) {
	                    if (object.attributes[i].nodeValue !== null) {
	                        attributesParsed[object.attributes[i].nodeName] = object.attributes[i].nodeValue;
	                    }
	                }

	                var applet = Util.createElement('applet', attributesParsed, creator);
	                applet.removeAttribute('wirisObject');

	                for (var i = 0; i < object.childNodes.length; ++i) {
	                    recursiveParamsFix(object.childNodes[i]);

	                    if (object.childNodes[i].nodeName.toLowerCase() == 'param') {
	                        applet.appendChild(object.childNodes[i]);
	                        --i; // When we insert the object child into the applet, object loses one child.
	                    }
	                }

	                object.parentNode.replaceChild(applet, object);
	            } else {
	                for (var i = 0; i < object.childNodes.length; ++i) {
	                    recursiveParamsFix(object.childNodes[i]);
	                }
	            }
	        }

	        recursiveParamsFix(container);
	        return container.firstChild;
	    };

	    /**
	     * Converts an object to its HTML code.
	     * @param {object} object DOM object..
	     * @return {string} HTML code.
	     * @ignore
	     */


	    Util.createObjectCode = function createObjectCode(object) {

	        // In case that the image was not created, the object can be null or undefined.
	        if (typeof object == 'undefined' || object == null) {
	            return;
	        }

	        if (object.nodeType == 1) {
	            // ELEMENT_NODE.
	            var output = '<' + object.tagName;

	            for (var i = 0; i < object.attributes.length; ++i) {
	                if (object.attributes[i].specified) {
	                    output += ' ' + object.attributes[i].name + '="' + Util.htmlEntities(object.attributes[i].value) + '"';
	                }
	            }

	            if (object.childNodes.length > 0) {
	                output += '>';

	                for (var i = 0; i < object.childNodes.length; ++i) {
	                    output += Util.createObject(object.childNodes[i]);
	                }

	                output += '</' + object.tagName + '>';
	            } else if (object.nodeName == 'DIV' || object.nodeName == 'SCRIPT') {
	                output += '></' + object.tagName + '>';
	            } else {
	                output += '/>';
	            }

	            return output;
	        }

	        if (object.nodeType == 3) {
	            // TEXT_NODE.
	            return Util.htmlEntities(object.nodeValue);
	        }

	        return '';
	    };

	    /**
	     * Concatenates to URL paths.
	     * @param {string} path1 - first URL path
	     * @param {string} path2 - second URL path
	     * @returns {string} new URL.
	     */


	    Util.concatenateUrl = function concatenateUrl(path1, path2) {
	        var separator = "";
	        if (path1.indexOf("/") != path1.length && path2.indexOf("/") != 0) {
	            separator = "/";
	        }
	        return (path1 + separator + path2).replace(/([^:]\/)\/+/g, "$1");
	    };

	    /**
	     * Parses a text and replaces all HTML special characters by their entities.
	     * @param {string} input Text to be paresed.
	     * @return {string} the input text with all their special characters replaced by their entities.
	     * @ignore
	     */


	    Util.htmlEntities = function htmlEntities(input) {
	        return input.split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;').split('"').join('&quot;');
	    };

	    /**
	     * Parses a text and replaces all the HTML entities by their characters.
	     * @param {string} input Text to be parsed
	     * @return {string} The input text with all their entities replaced by characters.
	     * @ignore
	     */


	    Util.htmlEntitiesDecode = function htmlEntitiesDecode(input) {
	        return input.split('&quot;').join('"').split('&gt;').join('>').split('&lt;').join('<').split('&amp;').join('&');
	    };

	    /**
	     * Cross-browser httpRequest creation.
	     * @return {object} httpRequest request object.
	     * @ignore
	     */


	    Util.createHttpRequest = function createHttpRequest() {
	        var currentPath = window.location.toString().substr(0, window.location.toString().lastIndexOf('/') + 1);
	        if (currentPath.substr(0, 7) == 'file://') {
	            throw Core.getStringManager().getString('exception_cross_site');
	        }

	        if (typeof XMLHttpRequest != 'undefined') {
	            return new XMLHttpRequest();
	        }

	        try {
	            return new ActiveXObject('Msxml2.XMLHTTP');
	        } catch (e) {
	            try {
	                return new ActiveXObject('Microsoft.XMLHTTP');
	            } catch (oc) {}
	        }

	        return false;
	    };

	    /**
	     * Gets the content from an URL.
	     * @param {string} url target URL.
	     * @param {object} postVariables post variables. Null if a GET query should be done.
	     * @return {string} content of the target URL.
	     * @ignore
	     */


	    Util.getContent = function getContent(url, postVariables) {
	        var currentPath = window.location.toString().substr(0, window.location.toString().lastIndexOf('/') + 1);
	        var httpRequest = Util.createHttpRequest();

	        if (httpRequest) {
	            if ((typeof postVariables === 'undefined' ? 'undefined' : _typeof(postVariables)) === undefined || typeof postVariables == 'undefined') {
	                httpRequest.open('GET', url, false);
	            } else if (url.substr(0, 1) == '/' || url.substr(0, 7) == 'http://' || url.substr(0, 8) == 'https://') {
	                httpRequest.open('POST', url, false);
	            } else {
	                httpRequest.open('POST', currentPath + url, false);
	            }

	            if (postVariables !== undefined) {
	                httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
	                httpRequest.send(Util.httpBuildQuery(postVariables));
	            } else {
	                httpRequest.send(null);
	            }

	            return httpRequest.responseText;
	        }

	        alert(Core.getStringManager().getString('browser_no_compatible'));

	        return '';
	    };

	    /**
	     * Converts a hash to a HTTP query.
	     * @param {hash} properties A key-value Hash
	     * @return {string} A HTTP query containing all the key value pairs with all the shpecial characters replaced by their entities.
	     * @ignore
	     */


	    Util.httpBuildQuery = function httpBuildQuery(properties) {
	        var result = '';

	        for (var i in properties) {
	            if (properties[i] != null) {
	                result += Util.urlEncode(i) + '=' + Util.urlEncode(properties[i]) + '&';
	            }
	        }

	        // Deleting last '&' empty character.
	        if (result.substring(result.length - 1) == '&') {
	            result = result.substring(0, result.length - 1);
	        }

	        return result;
	    };

	    /**
	     * Convert a hash to string  sorting keys to get a deterministic output
	     * @param {hash} h a key-value hash
	     * @return{string} A string with the form key1=value1...keyn=valuen
	     * @ignore
	     */


	    Util.propertiesToString = function propertiesToString(h) {
	        // 1. Sort keys. We sort the keys because we want a deterministic output.
	        var keys = [];
	        for (var key in h) {
	            if (h.hasOwnProperty(key)) {
	                keys.push(key);
	            }
	        }

	        var n = keys.length;
	        for (var i = 0; i < n; i++) {
	            for (var j = i + 1; j < n; j++) {
	                var s1 = keys[i];
	                var s2 = keys[j];
	                if (Util.compareStrings(s1, s2) > 0) {
	                    // Swap.
	                    keys[i] = s2;
	                    keys[j] = s1;
	                }
	            }
	        }

	        // 2. Generate output.
	        var output = '';
	        for (var i = 0; i < n; i++) {
	            var key = keys[i];
	            output += key;
	            output += "=";
	            var value = h[key];
	            value = value.replace("\\", "\\\\");
	            value = value.replace("\n", "\\n");
	            value = value.replace("\r", "\\r");
	            value = value.replace("\t", "\\t");

	            output += value;
	            output += "\n";
	        }
	        return output;
	    };

	    /**
	     * Compare two strings using charCodeAt method
	     * @param {string} a first string to compare.
	     * @param {string} b second string to compare
	     * @return {int} the int difference between a and b
	     * @ignore
	     */


	    Util.compareStrings = function compareStrings(a, b) {
	        var i;
	        var an = a.length;
	        var bn = b.length;
	        var n = an > bn ? bn : an;
	        for (i = 0; i < n; i++) {
	            var c = Util.fixedCharCodeAt(a, i) - Util.fixedCharCodeAt(b, i);
	            if (c != 0) {
	                return c;
	            }
	        }
	        return a.length - b.length;
	    };

	    /**
	     * Fix charCodeAt() javascript function to handle non-Basic-Multilingual-Plane characters.
	     * @param {string} str String
	     * @param {int} idx An integer greater than or equal to 0 and less than the length of the string
	     * @return {int} An integer representing the UTF-16 code of the string at the given index.
	     * @ignore
	     */

	    Util.fixedCharCodeAt = function fixedCharCodeAt(str, idx) {
	        idx = idx || 0;
	        var code = str.charCodeAt(idx);
	        var hi, low;

	        /* High surrogate (could change last hex to 0xDB7F to treat high
	        private surrogates as single characters) */

	        if (0xD800 <= code && code <= 0xDBFF) {
	            hi = code;
	            low = str.charCodeAt(idx + 1);
	            if (isNaN(low)) {
	                throw Core.getStringManager().getString('exception_high_surrogate');
	            }
	            return (hi - 0xD800) * 0x400 + (low - 0xDC00) + 0x10000;
	        }

	        if (0xDC00 <= code && code <= 0xDFFF) {
	            // Low surrogate.
	            /* We return false to allow loops to skip this iteration since should have
	            already handled high surrogate above in the previous iteration. */
	            return false;
	        }
	        return code;
	    };

	    Util.urlToAssArray = function urlToAssArray(url) {
	        var i;
	        i = url.indexOf("?");
	        if (i > 0) {
	            var query = url.substring(i + 1);
	            var ss = query.split("&");
	            var h = new Object();
	            for (i = 0; i < ss.length; i++) {
	                var s = ss[i];
	                var kv = s.split("=");
	                if (kv.length > 1) {
	                    h[kv[0]] = decodeURIComponent(kv[1].replace(/\+/g, ' '));
	                }
	            }
	            return h;
	        } else {
	            return new Object();
	        }
	    };

	    /**
	     * URL encode function.
	     * @param {string} clearString Input string to be encoded
	     * @return {string} encoded string.
	     * @ignore
	     */


	    Util.urlEncode = function urlEncode(clearString) {
	        var output = '';
	        // Method encodeURIComponent doesn't encode !'()*~ .
	        output = encodeURIComponent(clearString);
	        return output;
	    };

	    // TODO: To parser?
	    /**
	     * Converts the HTML of a image into the output code that WIRIS must return.
	     * By default returns the mathml stored on data-mahml attribute (if imgCode is a formula)
	     * or the Wiriscas attribute of a WIRIS applet.
	     * @param {string} imgCode the html code from a formula or a CAS image.
	     * @param {bool} convertToXml True if the image should be converted to xml.
	     * @param {bool} convertToSafeXml True if the image should be conerte to safeXmll
	     * @return {string} the Xml or safeXml of a WIRIS image.
	     * @ignore
	     */


	    Util.getWIRISImageOutput = function getWIRISImageOutput(imgCode, convertToXml, convertToSafeXml) {
	        var imgObject = Util.createObject(imgCode);

	        if (imgObject) {
	            if (imgObject.className == _configuration2.default.get('imageClassName') || imgObject.getAttribute(_configuration2.default.get('imageMathmlAttribute'))) {
	                if (!convertToXml) {
	                    return imgCode;
	                }

	                var xmlCode = imgObject.getAttribute(_configuration2.default.get('imageMathmlAttribute'));

	                if (xmlCode == null) {
	                    xmlCode = imgObject.getAttribute('alt');
	                }

	                if (!convertToSafeXml) {
	                    xmlCode = _mathml2.default.safeXmlDecode(xmlCode);
	                }

	                return xmlCode;
	            } else if (imgObject.className == _configuration2.default.get('CASClassName')) {
	                var appletCode = imgObject.getAttribute(_configuration2.default.get('CASMathmlAttribute'));
	                appletCode = _mathml2.default.safeXmlDecode(appletCode);
	                var appletObject = Util.createObject(appletCode);
	                appletObject.setAttribute('src', imgObject.src);
	                var object = appletObject;
	                var appletCodeToBeInserted = Util.createObjectCode(appletObject);

	                if (convertToSafeXml) {
	                    appletCodeToBeInserted = _mathml2.default.safeXmlEncode(appletCodeToBeInserted);
	                }

	                return appletCodeToBeInserted;
	            }
	        }

	        return imgCode;
	    };

	    /**
	     * Gets the node length in characters.
	     * @param {object} node HTML node.
	     * @return {int} node length
	     * @ignore
	     */


	    Util.getNodeLength = function (_getNodeLength) {
	        function getNodeLength(_x) {
	            return _getNodeLength.apply(this, arguments);
	        }

	        getNodeLength.toString = function () {
	            return _getNodeLength.toString();
	        };

	        return getNodeLength;
	    }(function (node) {
	        var staticNodeLengths = {
	            'IMG': 1,
	            'BR': 1
	        };
	        if (node.nodeType == 3) {
	            // TEXT_NODE.
	            return node.nodeValue.length;
	        }

	        if (node.nodeType == 1) {
	            // ELEMENT_NODE.
	            var length = staticNodeLengths[node.nodeName.toUpperCase()];

	            if (length === undefined) {
	                length = 0;
	            }

	            for (var i = 0; i < node.childNodes.length; ++i) {
	                length += getNodeLength(node.childNodes[i]);
	            }

	            return length;
	        }

	        return 0;
	    });

	    /**
	     * Gets the selected node or text.
	     * If the caret is on a text node, concatenates it with all the previous and next text nodes.
	     * @param {object} target The editable element
	     * @param {boolean} isIframe Specifies if the target is an iframe or not
	     * @param {forceGetSelection} If true, ignores IE system to get the current selection and uses window.getSelection()
	     * @return {object} An object with the 'node' key setted if the item is an element or the keys 'node' and 'caretPosition' if the element is text
	     * @ignore
	     */


	    Util.getSelectedItem = function getSelectedItem(target, isIframe, forceGetSelection) {
	        var windowTarget;

	        if (isIframe) {
	            windowTarget = target.contentWindow;
	            windowTarget.focus();
	        } else {
	            windowTarget = window;
	            target.focus();
	        }

	        if (document.selection && !forceGetSelection) {
	            var range = windowTarget.document.selection.createRange();

	            if (range.parentElement) {
	                if (range.htmlText.length > 0) {
	                    if (range.text.length == 0) {
	                        return Util.getSelectedItem(target, isIframe, true);
	                    }

	                    return null;
	                }

	                windowTarget.document.execCommand('InsertImage', false, '#');
	                var temporalObject = range.parentElement();

	                if (temporalObject.nodeName.toUpperCase() != 'IMG') {
	                    // IE9 fix: parentElement() does not return the IMG node, returns the parent DIV node. In IE < 9, pasteHTML does not work well.
	                    range.pasteHTML('<span id="wrs_openEditorWindow_temporalObject"></span>');
	                    temporalObject = windowTarget.document.getElementById('wrs_openEditorWindow_temporalObject');
	                }

	                var node;
	                var caretPosition;

	                if (temporalObject.nextSibling && temporalObject.nextSibling.nodeType == 3) {
	                    // TEXT_NODE.
	                    node = temporalObject.nextSibling;
	                    caretPosition = 0;
	                } else if (temporalObject.previousSibling && temporalObject.previousSibling.nodeType == 3) {
	                    // TEXT_NODE.
	                    node = temporalObject.previousSibling;
	                    caretPosition = node.nodeValue.length;
	                } else {
	                    node = windowTarget.document.createTextNode('');
	                    temporalObject.parentNode.insertBefore(node, temporalObject);
	                    caretPosition = 0;
	                }

	                temporalObject.parentNode.removeChild(temporalObject);

	                return {
	                    'node': node,
	                    'caretPosition': caretPosition
	                };
	            }

	            if (range.length > 1) {
	                return null;
	            }

	            return {
	                'node': range.item(0)
	            };
	        }

	        if (windowTarget.getSelection) {
	            var selection = windowTarget.getSelection();

	            try {
	                var range = selection.getRangeAt(0);
	            } catch (e) {
	                var range = windowTarget.document.createRange();
	            }

	            var node = range.startContainer;

	            if (node.nodeType == 3) {
	                // TEXT_NODE.
	                return {
	                    'node': node,
	                    'caretPosition': range.startOffset
	                };
	            }

	            if (node != range.endContainer) {
	                return null;
	            }

	            if (node.nodeType == 1) {
	                // ELEMENT_NODE.
	                var position = range.startOffset;

	                if (node.childNodes[position]) {
	                    return {
	                        'node': node.childNodes[position]
	                    };
	                }
	            }
	        }

	        return null;
	    };

	    /**
	     * Returns null if there isn't any item or if it is malformed.
	     * Otherwise returns a div DOM node containing the mathml image and the cursor position inside the textarea.
	     * @param {object} textarea DOM Element.
	     * @ignore
	     */


	    Util.getSelectedItemOnTextarea = function getSelectedItemOnTextarea(textarea) {
	        var textNode = document.createTextNode(textarea.value);
	        var textNodeValues = _latex2.default.getLatexFromTextNode(textNode, textarea.selectionStart);
	        if (textNodeValues === null) {
	            return null;
	        };

	        return {
	            'node': textNode,
	            'caretPosition': textarea.selectionStart,
	            'startPosition': textNodeValues.startPosition,
	            'endPosition': textNodeValues.endPosition
	        };
	    };

	    /**
	     * Looks for elements that match the given name in a HTML code string.
	     * Important: this function is very concrete for WIRIS code. It takes as preconditions lots of behaviors that are not the general case.
	     *
	     * @param {string} code HTML code
	     * @param {string} name Element names
	     * @param {boolean} autoClosed True if the elements are autoClosed.
	     * @return {array} An array containing all HTML elements of code matching the name argument.
	     * @ignore
	     */


	    Util.getElementsByNameFromString = function getElementsByNameFromString(code, name, autoClosed) {
	        var elements = [];
	        var code = code.toLowerCase();
	        name = name.toLowerCase();
	        var start = code.indexOf('<' + name + ' ');

	        while (start != -1) {
	            // Look for nodes.
	            var endString;

	            if (autoClosed) {
	                endString = '>';
	            } else {
	                endString = '</' + name + '>';
	            }

	            var end = code.indexOf(endString, start);

	            if (end != -1) {
	                end += endString.length;

	                elements.push({
	                    'start': start,
	                    'end': end
	                });
	            } else {
	                end = start + 1;
	            }

	            start = code.indexOf('<' + name + ' ', end);
	        }

	        return elements;
	    };

	    /**
	     * Decode a base64 to its numeric value
	     *
	     * @param  {String} el base64 character.
	     * @return {int} base64 char numeric value.
	     * @ignore
	     */


	    Util.decode64 = function decode64(el) {

	        var PLUS = '+'.charCodeAt(0);
	        var SLASH = '/'.charCodeAt(0);
	        var NUMBER = '0'.charCodeAt(0);
	        var LOWER = 'a'.charCodeAt(0);
	        var UPPER = 'A'.charCodeAt(0);
	        var PLUS_URL_SAFE = '-'.charCodeAt(0);
	        var SLASH_URL_SAFE = '_'.charCodeAt(0);
	        var code = el.charCodeAt(0);

	        if (code === PLUS || code === PLUS_URL_SAFE) {
	            return 62; // Char '+'.
	        }
	        if (code === SLASH || code === SLASH_URL_SAFE) {
	            return 63; // Char '/'.
	        }
	        if (code < NUMBER) {
	            return -1; // No match.
	        }
	        if (code < NUMBER + 10) {
	            return code - NUMBER + 26 + 26;
	        }
	        if (code < UPPER + 26) {
	            return code - UPPER;
	        }
	        if (code < LOWER + 26) {
	            return code - LOWER + 26;
	        }
	    };

	    /**
	     * Converts a base64 string to a array of bytes.
	     * @param  {String} b64String base64 string.
	     * @param  {int} len dimension of byte array (by default whole string).
	     * @return {Array} Byte array.
	     * @ignore
	     */


	    Util.b64ToByteArray = function b64ToByteArray(b64String, len) {

	        var tmp;

	        if (b64String.length % 4 > 0) {
	            throw new Error('Invalid string. Length must be a multiple of 4'); // Tipped base64. Length is fixed.
	        }

	        var arr = new Array();

	        if (!len) {
	            // All b64String string.
	            var placeHolders = b64String.charAt(b64String.length - 2) === '=' ? 2 : b64String.charAt(b64String.length - 1) === '=' ? 1 : 0;
	            var l = placeHolders > 0 ? b64String.length - 4 : b64String.length;
	        } else {
	            var l = len;
	        }

	        for (var i = 0; i < l; i += 4) {
	            // Ignoring code checker standards (bitewise operators).
	            // See https://tracker.moodle.org/browse/CONTRIB-5862 for further information.
	            // @codingStandardsIgnoreStart
	            tmp = Util.decode64(b64String.charAt(i)) << 18 | Util.decode64(b64String.charAt(i + 1)) << 12 | Util.decode64(b64String.charAt(i + 2)) << 6 | Util.decode64(b64String.charAt(i + 3));

	            arr.push(tmp >> 16 & 0xFF);
	            arr.push(tmp >> 8 & 0xFF);
	            arr.push(tmp & 0xFF);
	            // @codingStandardsIgnoreEnd
	        }

	        if (placeHolders) {
	            if (placeHolders === 2) {
	                // Ignoring code checker standards (bitewise operators).
	                // @codingStandardsIgnoreStart
	                tmp = Util.decode64(b64String.charAt(i)) << 2 | Util.decode64(b64String.charAt(i + 1)) >> 4;
	                arr.push(tmp & 0xFF);
	            } else if (placeHolders === 1) {
	                tmp = Util.decode64(b64String.charAt(i)) << 10 | Util.decode64(b64String.charAt(i + 1)) << 4 | Util.decode64(b64String.charAt(i + 2)) >> 2;
	                arr.push(tmp >> 8 & 0xFF);
	                arr.push(tmp & 0xFF);
	                // @codingStandardsIgnoreEnd
	            }
	        }

	        return arr;
	    };

	    /**
	     * Returns the first 32-bit signed integer from a byte array.
	     * @param  {Array} bytes array of bytes.
	     * @return {int} 32-bit signed integer.
	     * @ignore
	     */


	    Util.readInt32 = function readInt32(bytes) {
	        if (bytes.length < 4) {
	            return false;
	        }
	        var int32 = bytes.splice(0, 4);
	        // @codingStandardsIgnoreStart
	        return int32[0] << 24 | int32[1] << 16 | int32[2] << 8 | int32[3] << 0;
	        // @codingStandardsIgnoreEnd
	    };

	    /**
	     * Read the first byte from a byte array.
	     * @param  {array} bytes byte array.
	     * @return {int} first byte of the byte array.
	     * @ignore
	     */


	    Util.readByte = function readByte(bytes) {
	        // @codingStandardsIgnoreStart
	        return bytes.shift() << 0;
	        // @codingStandardsIgnoreEnd
	    };

	    /**
	     * Read an arbitrary number of bytes, from a fixed position on a byte array.
	     * @param  {array} bytes byte array.
	     * @param  {int} post start position.
	     * @param  {int} len number of bytes to read.
	     * @return {array} byte array.
	     * @ignore
	     */


	    Util.readBytes = function readBytes(bytes, pos, len) {
	        return bytes.splice(pos, len);
	    };

	    /**
	     * Inserts or modifies formulas or CAS on a textarea.
	     * @param {object} textarea Target
	     * @param {string} text Text to add in the textarea. For example, if you want to add the link to the image, you can call this function as (textarea, Parser.createImageSrc(mathml));
	     * @ignore
	     */


	    Util.updateTextArea = function updateTextArea(textarea, text) {
	        if (textarea && text) {
	            textarea.focus();

	            if (textarea.selectionStart != null) {
	                var selectionEnd = textarea.selectionEnd;
	                textarea.value = textarea.value.substring(0, textarea.selectionStart) + text + textarea.value.substring(textarea.selectionEnd, textarea.value.length);
	                textarea.selectionEnd = selectionEnd + text.length;
	            } else {
	                var selection = document.selection.createRange();
	                selection.text = text;
	            }
	        }
	    };

	    /**
	     * Modifies existing formula on a textarea.
	     * @param {object} textarea Target
	     * @param {string} text Text to add in the textarea. For example, if you want to add the link to the image, you can call this function as Util.updateTextarea(textarea, Parser.createImageSrc(mathml));
	     * @param {number} start Beginning index from textarea where it needs to be replaced by text.
	     * @param {number} end Ending index from textarea where it needs to be replaced by text
	     * @ignore
	     */


	    Util.updateExistingTextOnTextarea = function updateExistingTextOnTextarea(textarea, text, start, end) {
	        textarea.focus();
	        textarea.value = textarea.value.substring(0, start) + text + textarea.value.substring(end, textarea.value.length);
	        textarea.selectionEnd = start + text.length;
	    };

	    /**
	     * Add a parameter to a URL (GET).
	     * @param {string} path - URL path
	     * @param {string} parameter - parameter
	     * @param {string} value - value
	     */


	    Util.addArgument = function addArgument(path, parameter, value) {
	        var sep;
	        if (path.indexOf("?") > 0) {
	            sep = "&";
	        } else {
	            sep = "?";
	        }
	        return path + sep + parameter + "=" + value;
	    };

	    return Util;
	}();

	exports.default = Util;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _core = __webpack_require__(1);

	var _core2 = _interopRequireDefault(_core);

	var _latex = __webpack_require__(4);

	var _latex2 = _interopRequireDefault(_latex);

	var _mathml = __webpack_require__(6);

	var _mathml2 = _interopRequireDefault(_mathml);

	var _image = __webpack_require__(9);

	var _image2 = _interopRequireDefault(_image);

	var _accessibility = __webpack_require__(11);

	var _accessibility2 = _interopRequireDefault(_accessibility);

	var _serviceprovider = __webpack_require__(8);

	var _serviceprovider2 = _interopRequireDefault(_serviceprovider);

	var _configuration = __webpack_require__(10);

	var _configuration2 = _interopRequireDefault(_configuration);

	var _constants = __webpack_require__(7);

	var _constants2 = _interopRequireDefault(_constants);

	var _md = __webpack_require__(12);

	var _md2 = _interopRequireDefault(_md);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This class represent a MahML parser. Converts MathML into formulas depending on the
	 * image format (SVG, PNG, base64) and the save mode (XML, safeXML, Image) configured in the backend.
	 */
	var Parser = function () {
	    function Parser() {
	        _classCallCheck(this, Parser);
	    }

	    /**
	     * Converts mathml to img object.
	     * @param {object} creator Object with the "createElement" method
	     * @param {string} mathml MathML code
	     * @param {object} wirisProperties object containing WIRIS custom properties
	     * @param {language} language Custom language for accessibility.
	     * @return {object} And image containing the formula image corresponding to mathml string.
	     * @ignore
	     */
	    Parser.mathmlToImgObject = function mathmlToImgObject(creator, mathml, wirisProperties, language) {
	        var width;
	        var height;
	        var baseline;
	        var imgObject = creator.createElement('img');
	        imgObject.align = 'middle';
	        imgObject.style.maxWidth = 'none';
	        var data = wirisProperties ? wirisProperties : {};

	        data['mml'] = mathml;
	        data['lang'] = language;
	        // Request metrics of the generated image.
	        data['metrics'] = 'true';
	        data['centerbaseline'] = 'false';

	        // Full base64 method (edit & save).
	        if (_configuration2.default.get('saveMode') == 'base64' && _configuration2.default.get('editMode') == 'default') {
	            data['base64'] = true;
	        }

	        // Render js params: _wrs_int_wirisProperties contains some js render params. Since mathml can support render params, js params should be send only to editor, not to render.

	        imgObject.className = _configuration2.default.get('imageClassName');

	        if (mathml.indexOf('class="') != -1) {
	            // We check here if the MathML has been created from a customEditor (such chemistry)
	            // to add data-custom-editor attribute to img object (if necessary).
	            var mathmlSubstring = mathml.substring(mathml.indexOf('class="') + 'class="'.length, mathml.length);
	            mathmlSubstring = mathmlSubstring.substring(0, mathmlSubstring.indexOf('"'));
	            mathmlSubstring = mathmlSubstring.substring(4, mathmlSubstring.length);
	            imgObject.setAttribute('data-custom-editor', mathmlSubstring);
	        }

	        // Performance enabled.
	        if (_configuration2.default.get('wirisPluginPerformance') && (_configuration2.default.get('saveMode') == 'xml' || _configuration2.default.get('saveMode') == 'safeXml')) {

	            var result = JSON.parse(Parser.createShowImageSrc(mathml, data, language));
	            if (result["status"] == 'warning') {
	                // POST call.
	                // if the mathml is malformed, this function will throw an exception.
	                try {
	                    result = JSON.parse(_serviceprovider2.default.getService('showimage', data));
	                } catch (e) {
	                    return;
	                }
	            }
	            result = result.result;
	            if (result['format'] == 'png') {
	                imgObject.src = 'data:image/png;base64,' + result['content'];
	            } else {
	                imgObject.src = 'data:image/svg+xml;charset=utf8,' + _util2.default.urlEncode(result['content']);
	            }
	            imgObject.setAttribute(_configuration2.default.get('imageMathmlAttribute'), _mathml2.default.safeXmlEncode(mathml));
	            _image2.default.setImgSize(imgObject, result['content'], true);

	            if (_configuration2.default.get('enableAccessibility')) {
	                if (typeof result.alt == 'undefined') {
	                    imgObject.alt = _accessibility2.default.mathMLToAccessible(mathml, language, data);
	                } else {
	                    imgObject.alt = result.alt;
	                }
	            }
	        } else {
	            var result = Parser.createImageSrc(mathml, data);
	            imgObject.setAttribute(_configuration2.default.get('imageMathmlAttribute'), _mathml2.default.safeXmlEncode(mathml));
	            imgObject.src = result;
	            _image2.default.setImgSize(imgObject, result, _configuration2.default.get('saveMode') == 'base64' && _configuration2.default.get('editMode') == 'default' ? true : false);
	            if (_configuration2.default.get('enableAccessibility')) {
	                imgObject.alt = _accessibility2.default.mathMLToAccessible(mathml, language, data);
	            }
	        }

	        if (typeof Parser.observer != 'undefined') {
	            Parser.observer.observe(imgObject);
	        }

	        // Role math https://www.w3.org/TR/wai-aria/roles#math.
	        imgObject.setAttribute('role', 'math');
	        return imgObject;
	    };

	    /**
	     * Gets formula image src with AJAX.
	     * @param {mathml} Mathml code.
	     * @param {object} data wiris properties object.
	     * @return string Image src.
	     * @ignore
	     */


	    Parser.createImageSrc = function createImageSrc(mathml, data) {
	        // Full base64 method (edit & save).
	        if (_configuration2.default.get('saveMode') == 'base64' && _configuration2.default.get('editMode') == 'default') {
	            data['base64'] = true;
	        }

	        var result = _serviceprovider2.default.getService('createimage', data);

	        if (result.indexOf('@BASE@') != -1) {
	            // Replacing '@BASE@' with the base URL of createimage.
	            var baseParts = _core2.default.getServiceProvider().getServicePath('createimage').split('/');
	            baseParts.pop();
	            result = result.split('@BASE@').join(baseParts.join('/'));
	        }

	        return result;
	    };

	    /**
	     * Parses initial HTML code. If the HTML contains data generated by WIRIS, this data would be converted as following:
	     * <pre>
	     * MathML code: Image containing the corresponding MathML formulas.
	     * MathML code with LaTeX annotation : LaTeX.
	     * </pre>
	     * @param {string} code HTML code with data generated by MathType.
	     * @param {string} language Language for the formula.
	     * @return {string} HTML code with the WIRIS data converted into LaTeX and images.
	     */


	    Parser.initParse = function initParse(code, language) {
	        /* Note: The code inside this function has been inverted.
	        If you invert again the code then you cannot use correctly LaTeX
	        in Moodle.
	        */
	        code = Parser.initParseSaveMode(code, language);
	        return Parser.initParseEditMode(code);
	    };

	    /**
	     * Parses initial HTML code depending on the save mode.
	     * @param {string} code HTML code to be parsed
	     * @param {string} language Language for the formula.
	     * @return {string} HTML code parsed.
	     * @ignore
	     */


	    Parser.initParseSaveMode = function initParseSaveMode(code, language) {
	        if (_configuration2.default.get('saveMode')) {
	            // Converting XML to tags.
	            code = _latex2.default.parseMathmlToLatex(code, _constants2.default.safeXmlCharacters);
	            code = _latex2.default.parseMathmlToLatex(code, _constants2.default.xmlCharacters);
	            // Safe XML and XML must be parsed regardeless of save mode.
	            // Order is important here, safeXml must be parsed first in order to avoid conflicts with data-mathml img attribute.
	            code = Parser.parseSafeAppletsToObjects(code);
	            code = Parser.parseMathmlToImg(code, _constants2.default.safeXmlCharacters, language);
	            code = Parser.parseMathmlToImg(code, _constants2.default.xmlCharacters, language);

	            if (_configuration2.default.get('saveMode') == 'base64' && _configuration2.default.get('editMode') == 'image') {
	                code = Parser.codeImgTransform(code, 'base642showimage');
	            }
	        }

	        var appletList = _util2.default.getElementsByNameFromString(code, 'applet', false);
	        var carry = 0; // While replacing applets with images, the indexes of the found applets changes respecting the original code, so this carry is needed.

	        for (var i = 0; i < appletList.length; ++i) {
	            var appletCode = code.substring(appletList[i].start + carry, appletList[i].end + carry);

	            // The second control in the if is used to find WIRIS applet which don't have Wiriscas class (as it was in old CAS applets).
	            if (appletCode.indexOf(' class="' + _configuration2.default.get('CASClassName') + '"') != -1 || appletCode.toUpperCase().indexOf('WIRIS') != -1) {
	                if (appletCode.indexOf(' src="') != -1) {
	                    var srcStart = appletCode.indexOf(' src="') + ' src="'.length;
	                    var srcEnd = appletCode.indexOf('"', srcStart);
	                    var src = appletCode.substring(srcStart, srcEnd);
	                } else {
	                    // This should happen only with old CAS imported from Moodle 1 to Moodle 2.
	                    if (typeof _wrs_conf_pluginBasePath != 'undefined') {
	                        var src = _wrs_conf_pluginBasePath + '/integration/showcasimage.php?formula=noimage';
	                    } else {
	                        var src = '';
	                    }
	                    if (appletCode.indexOf(' class="' + _configuration2.default.get('CASClassName') + '"') == -1) {
	                        var closeSymbol = appletCode.indexOf('>');
	                        var appletTag = appletCode.substring(0, closeSymbol);
	                        var newAppletTag = appletTag.split(' width=').join(' class="Wiriscas" width=');
	                        appletCode = appletCode.split(appletTag).join(newAppletTag);
	                        appletCode = appletCode.split('\'').join('"');
	                    }
	                }

	                // Double click to edit has been removed here.
	                var imgCode = '<img align="middle" class="' + _configuration2.default.get('CASClassName') + '" ' + _configuration2.default.get('CASMathmlAttribute') + '="' + _mathml2.default.safeXmlEncode(appletCode) + '" src="' + src + '" />';

	                code = code.substring(0, appletList[i].start + carry) + imgCode + code.substring(appletList[i].end + carry);
	                carry += imgCode.length - (appletList[i].end - appletList[i].start);
	            }
	        }

	        return code;
	    };

	    /**
	     * Parses initial HTML code depending on the edit mode.
	     * @param {string} code HTML code.
	     * @return {string} parsed HTML code.
	     * @ignore
	     */


	    Parser.initParseEditMode = function initParseEditMode(code) {
	        if (_util2.default.arrayContains(_configuration2.default.get('parseModes'), 'latex') != -1) {
	            var imgList = _util2.default.getElementsByNameFromString(code, 'img', true);
	            var token = 'encoding="LaTeX">';
	            var carry = 0; // While replacing images with latex, the indexes of the found images changes respecting the original code, so this carry is needed.

	            for (var i = 0; i < imgList.length; ++i) {
	                var imgCode = code.substring(imgList[i].start + carry, imgList[i].end + carry);

	                if (imgCode.indexOf(' class="' + _configuration2.default.get('imageClassName') + '"') != -1) {
	                    var mathmlStartToken = ' ' + _configuration2.default.get('imageMathmlAttribute') + '="';
	                    var mathmlStart = imgCode.indexOf(mathmlStartToken);

	                    if (mathmlStart == -1) {
	                        mathmlStartToken = ' alt="';
	                        mathmlStart = imgCode.indexOf(mathmlStartToken);
	                    }

	                    if (mathmlStart != -1) {
	                        mathmlStart += mathmlStartToken.length;
	                        var mathmlEnd = imgCode.indexOf('"', mathmlStart);
	                        var mathml = _mathml2.default.safeXmlDecode(imgCode.substring(mathmlStart, mathmlEnd));
	                        var latexStartPosition = mathml.indexOf(token);

	                        if (latexStartPosition != -1) {
	                            latexStartPosition += token.length;
	                            var latexEndPosition = mathml.indexOf('</annotation>', latexStartPosition);
	                            var latex = mathml.substring(latexStartPosition, latexEndPosition);

	                            var replaceText = '$$' + _util2.default.htmlEntitiesDecode(latex) + '$$';
	                            code = code.substring(0, imgList[i].start + carry) + replaceText + code.substring(imgList[i].end + carry);
	                            carry += replaceText.length - (imgList[i].end - imgList[i].start);
	                        }
	                    }
	                }
	            }
	        }

	        return code;
	    };

	    /**
	     * Parses end HTML code. The end HTML code is HTML code with embedded images or LaTeX formulas created with MathType. <br>
	     * By default this method converts the formula images and LaTeX strings in MathML. <br>
	     * If image mode is enabled the images will not be converted into MathML. For further information see {@link http://www.wiris.com/plugins/docs/full-mathml-mode}.
	     * @param {string} code String to be parsed.
	     * @param {object} wirisProperties Extra attributes for the formula.
	     * @param {string} language Language for the formula.
	     * @return {string}
	     */


	    Parser.endParse = function endParse(code, wirisProperties, language) {
	        code = Parser.endParseEditMode(code, wirisProperties, language);
	        return Parser.endParseSaveMode(code);
	    };

	    /**
	     * Parses end HTML code depending on the edit mode.
	     * @param {string} code HTML code to be parsed.
	     * @param {object} wirisProperties Extra formula attributes.
	     * @param {string} language Language for the formula.
	     * @return {string}
	     * @ignore
	     */


	    Parser.endParseEditMode = function endParseEditMode(code, wirisProperties, language) {
	        // Converting LaTeX to images.

	        if (_util2.default.arrayContains(_configuration2.default.get('parseModes'), 'latex') != -1) {
	            var output = '';
	            var endPosition = 0;
	            var startPosition = code.indexOf('$$');
	            while (startPosition != -1) {
	                output += code.substring(endPosition, startPosition);
	                endPosition = code.indexOf('$$', startPosition + 2);

	                if (endPosition != -1) {
	                    // Before, it was a condition here to execute the next codelines 'latex.indexOf('<') == -1'.
	                    // We don't know why it was used, but seems to have a conflict with latex formulas that contains '<'.
	                    var latex = code.substring(startPosition + 2, endPosition);
	                    latex = _util2.default.htmlEntitiesDecode(latex);
	                    var mathml = _latex2.default.getMathMLFromLatex(latex, true);
	                    output += mathml;
	                    endPosition += 2;
	                } else {
	                    output += '$$';
	                    endPosition = startPosition + 2;
	                }

	                startPosition = code.indexOf('$$', endPosition);
	            }

	            output += code.substring(endPosition, code.length);
	            code = output;
	        }

	        return code;
	    };

	    /**
	     * Parses end HTML code depending on the save mode.
	     * @param {string} code HTML code
	     * @return {string}
	     * @ignore
	     */


	    Parser.endParseSaveMode = function endParseSaveMode(code) {
	        var output = '';
	        var convertToXml = false;
	        var convertToSafeXml = false;

	        if (_configuration2.default.get('saveMode')) {
	            if (_configuration2.default.get('saveMode') == 'safeXml') {
	                convertToXml = true;
	                convertToSafeXml = true;
	                code = Parser.codeImgTransform(code, 'img2mathml');
	            } else if (_configuration2.default.get('saveMode') == 'xml') {
	                convertToXml = true;
	                code = Parser.codeImgTransform(code, 'img2mathml');
	            } else if (_configuration2.default.get('saveMode') == 'base64' && _configuration2.default.get('editMode') == 'image') {
	                code = Parser.codeImgTransform(code, 'img264');
	            }
	        }

	        return code;
	    };

	    Parser.createShowImageSrc = function createShowImageSrc(mathml, data, language) {
	        var dataMd5 = [];
	        var renderParams = 'mml,color,centerbaseline,zoom,dpi,fontSize,fontFamily,defaultStretchy,backgroundColor,format';
	        var renderParamsArray = renderParams.split(',');
	        for (var key in renderParamsArray) {
	            var param = renderParamsArray[key];
	            if (typeof data[param] != 'undefined') {
	                dataMd5[param] = data[param];
	            }
	        }
	        // Data variables to get.
	        var dataObject = {};
	        for (var key in data) {
	            // We don't need mathml in this request we try to get cached so we only need the formula md5 calculated before.
	            if (key != 'mml') {
	                dataObject[key] = data[key];
	            }
	        }
	        dataObject.formula = com.wiris.js.JsPluginTools.md5encode(_util2.default.propertiesToString(dataMd5));
	        dataObject.lang = typeof language == 'undefined' ? 'en' : language;
	        dataObject.version = _configuration2.default.get('version');

	        var result = _serviceprovider2.default.getService('showimage', _util2.default.httpBuildQuery(dataObject), true);
	        return result;
	    };

	    /**
	     * Transform html img tags inside a html code to mathml, base64 img tags (i.e with base64 on src) or showimage img tags (i.e with showimage.php on src)
	     *
	     * @param  {String} code html code
	     * @param  {String} mode base642showimage or img2mathml or img264 transform.
	     * @return {String} html code transformed.
	     * @ignore
	     */


	    Parser.codeImgTransform = function codeImgTransform(code, mode) {
	        var output = '';

	        var endPosition = 0;
	        var pattern = /<img/gi;
	        var patternLength = pattern.source.length;

	        while (pattern.test(code)) {
	            var startPosition = pattern.lastIndex - patternLength;
	            output += code.substring(endPosition, startPosition);

	            var i = startPosition + 1;

	            while (i < code.length && endPosition <= startPosition) {
	                var character = code.charAt(i);

	                if (character == '"' || character == '\'') {
	                    var characterNextPosition = code.indexOf(character, i + 1);

	                    if (characterNextPosition == -1) {
	                        i = code.length; // End while.
	                    } else {
	                        i = characterNextPosition;
	                    }
	                } else if (character == '>') {
	                    endPosition = i + 1;
	                }

	                ++i;
	            }

	            if (endPosition < startPosition) {
	                // The img tag is stripped.
	                output += code.substring(startPosition, code.length);
	                return output;
	            }
	            var imgCode = code.substring(startPosition, endPosition);
	            var imgObject = _util2.default.createObject(imgCode);
	            var xmlCode = imgObject.getAttribute(_configuration2.default.get('imageMathmlAttribute'));
	            var convertToXml;
	            var convertToSafeXml;

	            if (mode == 'base642showimage') {
	                if (xmlCode == null) {
	                    xmlCode = imgObject.getAttribute('alt');
	                }
	                xmlCode = _mathml2.default.safeXmlDecode(xmlCode);
	                imgCode = Parser.mathmlToImgObject(document, xmlCode, null, null);
	                output += _util2.default.createObjectCode(imgCode);
	            } else if (mode == 'img2mathml') {
	                if (_configuration2.default.get('saveMode')) {
	                    if (_configuration2.default.get('saveMode') == 'safeXml') {
	                        convertToXml = true;
	                        convertToSafeXml = true;
	                    } else if (_configuration2.default.get('saveMode') == 'xml') {
	                        convertToXml = true;
	                        convertToSafeXml = false;
	                    }
	                }
	                output += _util2.default.getWIRISImageOutput(imgCode, convertToXml, convertToSafeXml);
	            } else if (mode == 'img264') {

	                if (xmlCode == null) {
	                    xmlCode = imgObject.getAttribute('alt');
	                }
	                xmlCode = _mathml2.default.safeXmlDecode(xmlCode);

	                var properties = {};
	                properties['base64'] = 'true';
	                imgCode = Parser.mathmlToImgObject(document, xmlCode, properties, null);
	                // Metrics.
	                _image2.default.setImgSize(imgCode, imgCode.src, true);

	                output += _util2.default.createObjectCode(imgCode);
	            }
	        }
	        output += code.substring(endPosition, code.length);
	        return output;
	    };

	    /**
	     * Converts all occurrences of safe applet code to the corresponding code.
	     * @param {string} content String containging valid applet code <APPLET>...</APPLET>
	     * @return {string} String with all the applet code conerted to safe tags.
	     * @ignore
	     */


	    Parser.parseSafeAppletsToObjects = function parseSafeAppletsToObjects(content) {
	        var output = '';
	        var appletTagBegin = _constants2.default.safeXmlCharacters.tagOpener + 'APPLET';
	        var appletTagEnd = _constants2.default.safeXmlCharacters.tagOpener + '/APPLET' + _constants2.default.safeXmlCharacters.tagCloser;
	        var upperCaseContent = content.toUpperCase();
	        var start = upperCaseContent.indexOf(appletTagBegin);
	        var end = 0;
	        var applet;

	        while (start != -1) {
	            output += content.substring(end, start);
	            end = upperCaseContent.indexOf(appletTagEnd, start);

	            if (end == -1) {
	                end = content.length - 1;
	            } else {
	                end += appletTagEnd.length;
	            }

	            applet = _util2.default.convertOldXmlinitialtextAttribute(content.substring(start, end));

	            output += _mathml2.default.safeXmlDecode(applet);
	            start = upperCaseContent.indexOf(appletTagBegin, end);
	        }

	        output += content.substring(end, content.length);
	        return output;
	    };

	    /**
	     * Converts all occurrences of mathml code to the corresponding image.
	     * @param {string} content An string with valid MathML code. The matml code doesn't contain semantics.
	     * @param {object} characters An object containing xmlCharacters or safeXmlCharacters relation.
	     * @param {string} language String containging a valid language code in order to generate formula accesibilty.
	     * @return {string} The input string with all the MathML ocurrences replaced by the corresponding image.
	     * @ignore
	     */


	    Parser.parseMathmlToImg = function parseMathmlToImg(content, characters, language) {
	        var output = '';
	        var mathTagBegin = characters.tagOpener + 'math';
	        var mathTagEnd = characters.tagOpener + '/math' + characters.tagCloser;
	        var start = content.indexOf(mathTagBegin);
	        var end = 0;

	        while (start != -1) {
	            output += content.substring(end, start);
	            // Avoid WIRIS images to be parsed.
	            var imageMathmlAtrribute = content.indexOf(_configuration2.default.get('imageMathmlAttribute'));
	            end = content.indexOf(mathTagEnd, start);

	            if (end == -1) {
	                end = content.length - 1;
	            } else if (imageMathmlAtrribute != -1) {
	                // First close tag of img attribute
	                // If a mathmlAttribute exists should be inside a img tag.
	                end += content.indexOf("/>", start);
	            } else {
	                end += mathTagEnd.length;
	            }

	            if (!_mathml2.default.isMathmlInAttribute(content, start) && imageMathmlAtrribute == -1) {
	                var mathml = content.substring(start, end);
	                mathml = characters == _constants2.default.safeXmlCharacters ? _mathml2.default.safeXmlDecode(mathml) : _mathml2.default.mathMLEntities(mathml);
	                output += _util2.default.createObjectCode(Parser.mathmlToImgObject(document, mathml, null, language));
	            } else {
	                output += content.substring(start, end);
	            }

	            start = content.indexOf(mathTagBegin, end);
	        }

	        output += content.substring(end, content.length);
	        return output;
	    };

	    return Parser;
	}();

	// Mutation observers to avoid wiris image formulas class be removed.


	exports.default = Parser;
	if (typeof MutationObserver !== 'undefined') {
	    var mutationObserver = new MutationObserver(function (mutations) {

	        mutations.forEach(function (mutation) {

	            if (mutation.oldValue === _configuration2.default.get('imageClassName') && mutation.attributeName === 'class' && mutation.target.className.indexOf(_configuration2.default.get('imageClassName')) == -1) {

	                mutation.target.className = _configuration2.default.get('imageClassName');
	            }
	        });
	    });

	    Parser.observer = Object.create(mutationObserver);
	    Parser.observer.Config = { attributes: true, attributeOldValue: true };
	    // We use own default config.
	    Parser.observer.observe = function name(target) {
	        this.__proto__.observe(target, this.Config);
	    };
	}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _cache = __webpack_require__(5);

	var _cache2 = _interopRequireDefault(_cache);

	var _mathml = __webpack_require__(6);

	var _mathml2 = _interopRequireDefault(_mathml);

	var _serviceprovider = __webpack_require__(8);

	var _serviceprovider2 = _interopRequireDefault(_serviceprovider);

	var _constants = __webpack_require__(7);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This class represents a LaTeX parser. Manages the services which allows to convert
	 * LaTeX into MathML and MathML into LaTeX.
	 */
	var Latex = function () {
	    function Latex() {
	        _classCallCheck(this, Latex);
	    }

	    /**
	     * Converts MathML to LaTeX by calling mathml2latex service. For text services
	     * we call a text service with the param mathml2latex.
	     * @param {string} mathml MathML String
	     * @return {string} MathML corresponding LaTeX.
	     * @ignore
	     */
	    Latex.getLatexFromMathML = function getLatexFromMathML(mathml) {
	        var data = {
	            'service': 'mathml2latex',
	            'mml': mathml
	        };

	        var jsonResponse = JSON.parse(_serviceprovider2.default.getService('service', data));

	        var latex;

	        if (jsonResponse.status == "ok") {
	            latex = jsonResponse.result.text;
	        }

	        return latex;
	    };
	    /**
	     * Converts LaTeX to MathML by calling latex2mathml service. For text services
	     * we call a text service with the param latex2mathml.
	     * @param {string} latex String
	     * @param {bool} includeLatexOnSemantics If true LaTeX would me included into MathML semantics.
	     * @return {string} converted mathML
	     * @ignore
	     */


	    Latex.getMathMLFromLatex = function getMathMLFromLatex(latex, includeLatexOnSemantics) {
	        if (Latex.cache.get(latex)) {
	            return Latex.cache.get(latex);
	        }
	        var data = {
	            'service': 'latex2mathml',
	            'latex': latex
	        };

	        if (includeLatexOnSemantics) {
	            data['saveLatex'] = '';
	        }

	        var jsonResponse = JSON.parse(_serviceprovider2.default.getService('service', data));

	        var output;
	        if (jsonResponse.status == "ok") {
	            var output = jsonResponse.result.text;
	            output = output.split("\r").join('').split("\n").join(' ');
	            // Populate LatexCache.
	            Latex.cache.populate(latex, output);
	        } else {
	            output = "$$" + latex + "$$";
	        }
	        return output;
	    };

	    /**
	     * Converts all occurrences of mathml code to LATEX. The MathML code should containing <annotation encoding="LaTeX"/> to be converted.
	     * @param {string} content A string containing MathML valid code.
	     * @param {Object} characters An object containing special characters.
	     * @return {string} String with all MathML annotated occurrences replaced by the corresponding LaTeX code.
	     * @ignore
	     */


	    Latex.parseMathmlToLatex = function parseMathmlToLatex(content, characters) {
	        var output = '';
	        var mathTagBegin = characters.tagOpener + 'math';
	        var mathTagEnd = characters.tagOpener + '/math' + characters.tagCloser;
	        var openTarget = characters.tagOpener + 'annotation encoding=' + characters.doubleQuote + 'LaTeX' + characters.doubleQuote + characters.tagCloser;
	        var closeTarget = characters.tagOpener + '/annotation' + characters.tagCloser;
	        var start = content.indexOf(mathTagBegin);
	        var end = 0;
	        var mathml, startAnnotation, closeAnnotation;

	        while (start != -1) {
	            output += content.substring(end, start);
	            end = content.indexOf(mathTagEnd, start);

	            if (end == -1) {
	                end = content.length - 1;
	            } else {
	                end += mathTagEnd.length;
	            }

	            mathml = content.substring(start, end);

	            startAnnotation = mathml.indexOf(openTarget);
	            if (startAnnotation != -1) {
	                startAnnotation += openTarget.length;
	                closeAnnotation = mathml.indexOf(closeTarget);
	                var latex = mathml.substring(startAnnotation, closeAnnotation);
	                if (characters == _constants2.default.safeXmlCharacters) {
	                    latex = _mathml2.default.safeXmlDecode(latex);
	                }
	                output += '$$' + latex + '$$';
	                // Populate latex into cache.
	                Latex.cache.populate(latex, mathml);
	            } else {
	                output += mathml;
	            }

	            start = content.indexOf(mathTagBegin, end);
	        }

	        output += content.substring(end, content.length);
	        return output;
	    };

	    /**
	     * Extracts the latex of a determined position in a text.
	     * @param {string} textNode test to extract LaTeX
	     * @param {int} caretPosition starting position to find LaTeX.
	     * @param {object} latexTags optional parameter representing tags between latex is inserted. It has the 'open' attribute for the open tag and the 'close' attribute for the close tag.
	     * @return {object} An object with 3 keys: 'latex', 'start' and 'end'. Null if latex is not found.
	     * @ignore
	     */


	    Latex.getLatexFromTextNode = function getLatexFromTextNode(textNode, caretPosition, latexTags) {
	        // TODO: Set LaTeX Tags as Core variable. Fix the call to this function (third argument).
	        // Tags used for LaTeX formulas.
	        var defaultLatexTags = {
	            'open': '$$',
	            'close': '$$'
	        };
	        // latexTags is an optional parameter. If is not set, use default latexTags.
	        if (typeof latexTags == 'undefined' || latexTags == null) {
	            latexTags = defaultLatexTags;
	        }
	        // Looking for the first textNode.
	        var startNode = textNode;

	        while (startNode.previousSibling && startNode.previousSibling.nodeType == 3) {
	            // TEXT_NODE.
	            startNode = startNode.previousSibling;
	        }

	        // Finding latex.

	        /**
	         * It gets the next latex position and node from a specific node and position.
	         * @param {Object} currentNode node where searching latex.
	         * @param {number} currentPosition current position inside the currentNode.
	         * @param {Object} latexTagsToUse tags used at latex beggining and latex final.
	         * @param {boolean} tag tag which search.
	         */
	        function getNextLatexPosition(currentNode, currentPosition, tag) {

	            var position = currentNode.nodeValue.indexOf(tag, currentPosition);

	            while (position == -1) {
	                currentNode = currentNode.nextSibling;

	                if (!currentNode) {
	                    // TEXT_NODE.
	                    return null; // Not found.
	                }

	                position = currentNode.nodeValue ? currentNode.nodeValue.indexOf(latexTags.close) : -1;
	            }

	            return {
	                'node': currentNode,
	                'position': position
	            };
	        }

	        function isPrevious(node, position, endNode, endPosition) {
	            if (node == endNode) {
	                return position <= endPosition;
	            }

	            while (node && node != endNode) {
	                node = node.nextSibling;
	            }

	            return node == endNode;
	        }

	        var start;
	        var end = {
	            'node': startNode,
	            'position': 0
	        };
	        // Is supposed that open and close tags has the same length.
	        var tagLength = latexTags.open.length;
	        do {
	            var start = getNextLatexPosition(end.node, end.position, latexTags.open);

	            if (start == null || isPrevious(textNode, caretPosition, start.node, start.position)) {
	                return null;
	            }

	            var end = getNextLatexPosition(start.node, start.position + tagLength, latexTags.close);

	            if (end == null) {
	                return null;
	            }

	            end.position += tagLength;
	        } while (isPrevious(end.node, end.position, textNode, caretPosition));

	        // Isolating latex.
	        var latex;

	        if (start.node == end.node) {
	            latex = start.node.nodeValue.substring(start.position + tagLength, end.position - tagLength);
	        } else {
	            latex = start.node.nodeValue.substring(start.position + tagLength, start.node.nodeValue.length);
	            var currentNode = start.node;

	            do {
	                currentNode = currentNode.nextSibling;

	                if (currentNode == end.node) {
	                    latex += end.node.nodeValue.substring(0, end.position - tagLength);
	                } else {
	                    latex += currentNode.nodeValue ? currentNode.nodeValue : '';
	                }
	            } while (currentNode != end.node);
	        }

	        return {
	            'latex': latex,
	            'startNode': start.node,
	            'startPosition': start.position,
	            'endNode': end.node,
	            'endPosition': end.position
	        };
	    };

	    return Latex;
	}();

	// Static property.


	exports.default = Latex;
	Latex.cache = new _cache2.default();

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Class representing a client cache class. This class contains
	 * pairs of string (key/value) which can be retrieved in any moment. Usually used
	 * to store Ajax calls for text services.
	 */
	var TextCache = function () {
	    function TextCache() {
	        _classCallCheck(this, TextCache);

	        this.cache = [];
	    }

	    /**
	     * This method populates a key/value pair into the cache property.
	     * @param {string} key - The cache key, usually the service string parameter.
	     * @param {string} value - The cache value, usually the service response.
	     */


	    TextCache.prototype.populate = function populate(key, value) {
	        this.cache[key] = value;
	    };

	    /**
	     * This method retrieves a cache value. Usually called before call a text service.
	     * @param {string} key - The cache key, usually the service string parameter.
	     * @return {string} value - The cache value, if exists. False otherwise.
	     */


	    TextCache.prototype.get = function get(key) {
	        if (this.cache.hasOwnProperty(key)) {
	            return this.cache[key];
	        } else {
	            return false;
	        }
	    };

	    return TextCache;
	}();

	exports.default = TextCache;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _constants = __webpack_require__(7);

	var _constants2 = _interopRequireDefault(_constants);

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This class represents a class to manage MathML objects.
	 */
	var MathML = function () {
	    function MathML() {
	        _classCallCheck(this, MathML);
	    }

	    /**
	     * Checks if the mathml at position i is inside an HTML attribute or not.
	     * @param {string} content A string containing MathML code.
	     * @param {string} i Search index.
	     * @return {bool} True if is inside an HTML attribute. In other case, false.
	     * @ignore
	     */
	    MathML.isMathmlInAttribute = function isMathmlInAttribute(content, i) {
	        // Regex = '^[\'"][\\s]*=[\\s]*[\\w-]+([\\s]*("[^"]*"|\'[^\']*\')[\\s]*=[\\s]*[\\w-]+[\\s]*)*[\\s]+gmi<';
	        var math_att = '[\'"][\\s]*=[\\s]*[\\w-]+'; // "=att OR '=att
	        var att_content = '"[^"]*"|\'[^\']*\''; // "blabla" OR 'blabla'
	        var att = '[\\s]*(' + att_content + ')[\\s]*=[\\s]*[\\w-]+[\\s]*'; // "blabla"=att OR 'blabla'=att
	        var atts = '(' + att + ')*'; // "blabla"=att1 "blabla"=att2
	        var regex = '^' + math_att + atts + '[\\s]+gmi<'; // "=att "blabla"=att1 "blabla"=att2 gmi< .
	        var expression = new RegExp(regex);

	        var actual_content = content.substring(0, i);
	        var reversed = actual_content.split('').reverse().join('');
	        var exists = expression.test(reversed);

	        return exists;
	    };

	    /**
	     * Decodes an encoded MathML with standard XML tags.
	     * We use these entities because IE doesn't support html entities on its attributes sometimes. Yes, sometimes.
	     * @param {string} input String to be decoded.
	     * @return {string} Decoded string.
	     * @ignore
	     */


	    MathML.safeXmlDecode = function safeXmlDecode(input) {
	        // Decoding entities.
	        input = input.split(_constants2.default.safeXmlCharactersEntities.tagOpener).join(_constants2.default.safeXmlCharacters.tagOpener);
	        input = input.split(_constants2.default.safeXmlCharactersEntities.tagCloser).join(_constants2.default.safeXmlCharacters.tagCloser);
	        input = input.split(_constants2.default.safeXmlCharactersEntities.doubleQuote).join(_constants2.default.safeXmlCharacters.doubleQuote);
	        // Added to fix problem due to import from 1.9.x.
	        input = input.split(_constants2.default.safeXmlCharactersEntities.realDoubleQuote).join(_constants2.default.safeXmlCharacters.realDoubleQuote);

	        // Blackboard.
	        if ('_wrs_blackboard' in window && window._wrs_blackboard) {
	            input = input.split(_constants2.default.safeBadBlackboardCharacters.ltElement).join(_constants2.default.safeGoodBlackboardCharacters.ltElement);
	            input = input.split(_constants2.default.safeBadBlackboardCharacters.gtElement).join(_constants2.default.safeGoodBlackboardCharacters.gtElement);
	            input = input.split(_constants2.default.safeBadBlackboardCharacters.ampElement).join(_constants2.default.safeGoodBlackboardCharacters.ampElement);
	        }

	        // Decoding characters.
	        input = input.split(_constants2.default.safeXmlCharacters.tagOpener).join(_constants2.default.xmlCharacters.tagOpener);
	        input = input.split(_constants2.default.safeXmlCharacters.tagCloser).join(_constants2.default.xmlCharacters.tagCloser);
	        input = input.split(_constants2.default.safeXmlCharacters.doubleQuote).join(_constants2.default.xmlCharacters.doubleQuote);
	        input = input.split(_constants2.default.safeXmlCharacters.ampersand).join(_constants2.default.xmlCharacters.ampersand);
	        input = input.split(_constants2.default.safeXmlCharacters.quote).join(_constants2.default.xmlCharacters.quote);

	        // We are replacing $ by & when its part of an entity for retrocompatibility. Now, the standard is replace § by &.
	        var returnValue = '';
	        var currentEntity = null;

	        for (var i = 0; i < input.length; ++i) {
	            var character = input.charAt(i);

	            if (currentEntity == null) {
	                if (character == '$') {
	                    currentEntity = '';
	                } else {
	                    returnValue += character;
	                }
	            } else {
	                if (character == ';') {
	                    returnValue += '&' + currentEntity + ';';
	                    currentEntity = null;
	                } else if (character.match(/([a-zA-Z0-9#._-] | '-')/)) {
	                    // Character is part of an entity.
	                    currentEntity += character;
	                } else {
	                    returnValue += '$' + currentEntity; // Is not an entity.
	                    currentEntity = null;
	                    --i; // Parse again the current character.
	                }
	            }
	        }

	        return returnValue;
	    };

	    /**
	     * Encodes a MathML with standard XML tags to a MMathML encoded with safe XML tags.
	     * We use these entities because IE doesn't support html entities on its attributes sometimes. Yes, sometimes.
	     * @param {string} input to be encoded
	     * @return {string} Encoded string.
	     * @ignore
	     */


	    MathML.safeXmlEncode = function safeXmlEncode(input) {
	        input = input.split(_constants2.default.xmlCharacters.tagOpener).join(_constants2.default.safeXmlCharacters.tagOpener);
	        input = input.split(_constants2.default.xmlCharacters.tagCloser).join(_constants2.default.safeXmlCharacters.tagCloser);
	        input = input.split(_constants2.default.xmlCharacters.doubleQuote).join(_constants2.default.safeXmlCharacters.doubleQuote);
	        input = input.split(_constants2.default.xmlCharacters.ampersand).join(_constants2.default.safeXmlCharacters.ampersand);
	        input = input.split(_constants2.default.xmlCharacters.quote).join(_constants2.default.safeXmlCharacters.quote);

	        return input;
	    };

	    /**
	     * Converts special symbols (> 128) to entities and replaces all textual entities by its number entities.
	     * @param {string} mathml MathML string containing - or not - special symbols
	     * @return {string} MathML with all textual entities replaced.
	     * @ignore
	     */


	    MathML.mathMLEntities = function mathMLEntities(mathml) {
	        var toReturn = '';

	        for (var i = 0; i < mathml.length; ++i) {

	            var character = mathml.charAt(i);

	            // Parsing > 128 characters.
	            if (mathml.codePointAt(i) > 128) {
	                toReturn += '&#' + mathml.codePointAt(i) + ';';
	                // For UTF-32 characters we need to move the index one position.
	                if (mathml.codePointAt(i) > 0xffff) {
	                    i++;
	                }
	            } else if (character == '&') {
	                var end = mathml.indexOf(';', i + 1);

	                if (end >= 0) {
	                    var container = document.createElement('span');
	                    container.innerHTML = mathml.substring(i, end + 1);
	                    toReturn += '&#' + _util2.default.fixedCharCodeAt(container.innerText || container.textContent, 0) + ';';
	                    i = end;
	                } else {
	                    toReturn += character;
	                }
	            } else {
	                toReturn += character;
	            }
	        }

	        return toReturn;
	    };

	    /**
	     * Add wrs::type attribute to mathml if the mathml has been created with a custom editor
	     * for example, chemistry.
	     * @param {string} mathml a MathML string created with a custom editor, like chemistry.
	     * @param {string} custom editor name.
	     * @return {string} The MathML string with his class containing the editor toolbar string.
	     * @ignore
	     */


	    MathML.addEditorAttribute = function addEditorAttribute(mathml, customEditor) {
	        var toReturn = '';

	        var start = mathml.indexOf('<math');
	        if (start == 0) {
	            var end = mathml.indexOf('>');
	            if (mathml.indexOf("class") == -1) {
	                // Adding custom editor type.
	                toReturn = mathml.substr(start, end) + ' class="wrs_' + customEditor + '">';
	                toReturn += mathml.substr(end + 1, mathml.length);
	                return toReturn;
	            }
	        }
	        return mathml;
	    };

	    /**
	     * Add annotation tag to mathml without it (mathml comes from LaTeX string)
	     * @param  {string} mathml MathML code generated by a LaTeX string.
	     * @param  {string} latex Original LaTeX string
	     * @param  {string} withoutLatexTranslate True if not exists latex translation from mathml.
	     * @param  {string} encoding - encoding attribute.
	     * @return {string} new mathml containing LaTeX code on annotation tag.
	     * @ignore
	     */


	    MathML.insertSemanticsMathml = function insertSemanticsMathml(mathml, latex, encoding) {

	        // If latex is empty, insert semantics doesn't provide information. We can avoid semantics insertion and return the mathml.
	        if (latex == "") {
	            return mathml;
	        }

	        var firstEndTag = '>';
	        var mathTagEnd = '<' + '/math' + '>';
	        var openSemantics = '<' + 'semantics' + '>';
	        var closeSemantics = '<' + '/semantics' + '>';
	        var openTarget = '<annotation encoding="' + encoding + '">';
	        var closeTarget = '<' + '/annotation' + '>';
	        var mrowOpen = '<mrow>';
	        var mrowClose = '</mrow>';

	        var indexMathBegin = mathml.indexOf(firstEndTag);
	        var indexMathEnd = mathml.indexOf(mathTagEnd);
	        var mathBeginExists = mathml.substring(mathml.indexOf('<'), mathml.indexOf('>')).indexOf('math');

	        if (indexMathBegin != -1 && indexMathEnd != -1 && mathBeginExists) {
	            var mathmlContent = mathml.substring(indexMathBegin + 1, indexMathEnd);
	            if (mathmlContent.indexOf(mrowOpen) != 0) {
	                var mathmlContentSemantics = openSemantics + mrowOpen + mathmlContent + mrowClose + openTarget + latex + closeTarget + closeSemantics;
	            } else {
	                var mathmlContentSemantics = openSemantics + mathmlContent + openTarget + latex + closeTarget + closeSemantics;
	            }
	            return mathml.replace(mathmlContent, mathmlContentSemantics);
	        } else {
	            return mathml;
	        }
	    };

	    /**
	     * Removes annotation tag to mathml.
	     * @param {string} mathml Valid MathML.
	     * @param {string}
	     */


	    MathML.removeSemanticsMathml = function removeSemanticsMathml(mathml, encoding) {
	        var mathTagEnd = '<' + '/math' + '>';
	        var openSemantics = '<' + 'semantics' + '>';
	        var openAnnotation = '<annotation encoding="' + encoding + '">';

	        var mathmlWithoutSemantics = mathml;
	        var startSemantics = mathml.indexOf(openSemantics);
	        if (startSemantics != -1) {
	            var startAnnotation = mathml.indexOf(openAnnotation, startSemantics + openSemantics.length);
	            if (startAnnotation != -1) {
	                mathmlWithoutSemantics = mathml.substring(0, startSemantics) + mathml.substring(startSemantics + openSemantics.length, startAnnotation) + mathTagEnd;
	            }
	        }

	        return mathmlWithoutSemantics;
	    };

	    return MathML;
	}();

	exports.default = MathML;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This class represents all the constants needed in a MathType integration among different classes.+
	 * If a constant should be used between different classes should be defined here using attribute accessors.
	 */
	var Constants = function () {
	    function Constants() {
	        _classCallCheck(this, Constants);
	    }

	    _createClass(Constants, null, [{
	        key: 'safeXmlCharactersEntities',

	        /**
	         * Safe XML entities.
	         */
	        get: function get() {
	            return {
	                'tagOpener': '&laquo;',
	                'tagCloser': '&raquo;',
	                'doubleQuote': '&uml;',
	                'realDoubleQuote': '&quot;'
	            };
	        }
	    }, {
	        key: 'safeBadBlackboardCharacters',
	        get: function get() {
	            return {
	                'ltElement': '«mo»<«/mo»',
	                'gtElement': '«mo»>«/mo»',
	                'ampElement': '«mo»&«/mo»'
	            };
	        }
	    }, {
	        key: 'safeGoodBlackboardCharacters',
	        get: function get() {
	            return {
	                'ltElement': '«mo»§lt;«/mo»',
	                'gtElement': '«mo»§gt;«/mo»',
	                'ampElement': '«mo»§amp;«/mo»'
	            };
	        }
	    }]);

	    return Constants;
	}();
	/**
	 * Standard XML special characters.
	 */


	exports.default = Constants;
	Constants.xmlCharacters = {
	    'tagOpener': '<', // Hex: \x3C.
	    'tagCloser': '>', // Hex: \x3E.
	    'doubleQuote': '"', // Hex: \x22.
	    'ampersand': '&', // Hex: \x26.
	    'quote': '\'' // Hex: \x27.


	    /**
	     * Safe XML special characters. This characters are used instead the standard
	     * the standard to parse the  MathML if safeXML save mode is enable. Each XML
	     * special character have a UTF-8 representation.
	     */
	};Constants.safeXmlCharacters = {
	    'tagOpener': '«', // Hex: \xAB.
	    'tagCloser': '»', // Hex: \xBB.
	    'doubleQuote': '¨', // Hex: \xA8.
	    'ampersand': '§', // Hex: \xA7.
	    'quote': '`', // Hex: \x60.
	    'realDoubleQuote': '¨'
	};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Class representing a serviceProvider. A serviceProvider is a class containing
	 * an arbitrary number of services with the correspondent path.
	 */
	var ServiceProvider = function () {
	    function ServiceProvider() {
	        _classCallCheck(this, ServiceProvider);
	    }

	    /**
	     * Add a new service to the servicePath property.
	     * @param {string} service - Service name
	     * @param {string} path  - Service path.
	     */
	    ServiceProvider.setServicePath = function setServicePath(service, path) {
	        ServiceProvider.serVicePaths[service] = path;
	    };

	    /**
	     * Returns the servicePaths object.
	     * @param {string} - Service name
	     * @return {string} - Service path.
	     */


	    ServiceProvider.getServicePath = function getServicePath(service) {
	        return ServiceProvider.serVicePaths[service];
	    };

	    /**
	     * Gets the content from an URL.
	     * @param {string} url target URL.
	     * @param {object} postVariables post variables. Null if a GET query should be done.
	     * @return {string} content of the target URL.
	     * @ignore
	     */


	    ServiceProvider.getUrl = function getUrl(url, postVariables) {
	        var currentPath = window.location.toString().substr(0, window.location.toString().lastIndexOf('/') + 1);
	        var httpRequest = _util2.default.createHttpRequest();

	        if (httpRequest) {
	            if ((typeof postVariables === 'undefined' ? 'undefined' : _typeof(postVariables)) === undefined || typeof postVariables == 'undefined') {
	                httpRequest.open('GET', url, false);
	            } else if (url.substr(0, 1) == '/' || url.substr(0, 7) == 'http://' || url.substr(0, 8) == 'https://') {
	                httpRequest.open('POST', url, false);
	            } else {
	                httpRequest.open('POST', currentPath + url, false);
	            }

	            if (postVariables !== undefined) {
	                httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
	                httpRequest.send(_util2.default.httpBuildQuery(postVariables));
	            } else {
	                httpRequest.send(null);
	            }

	            return httpRequest.responseText;
	        }

	        alert(Core.getStringManager().getString('browser_no_compatible'));

	        return '';
	    };

	    /**
	     * Returns the response text of a certain service.
	     *
	     * @param {string} service - Service name.
	     * @param {string} postVariables - Post variables.
	     * @param {boolean} get - True if the request is GET instead of POST.
	     * @return {string} - The service response text.
	     */


	    ServiceProvider.getService = function getService(service, postVariables, get) {
	        if (get === true) {
	            var serviceUrl = ServiceProvider.getServicePath(service) + '?' + postVariables;
	            var response = ServiceProvider.getUrl(serviceUrl);
	        } else {
	            var serviceUrl = ServiceProvider.getServicePath(service);
	            var response = ServiceProvider.getUrl(serviceUrl, postVariables);
	        }
	        return response;
	    };

	    return ServiceProvider;
	}();
	/**
	 * @property {string} service - The service name
	 * @property {string} path - The service path
	 */


	exports.default = ServiceProvider;
	ServiceProvider.serVicePaths = {};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _configuration = __webpack_require__(10);

	var _configuration2 = _interopRequireDefault(_configuration);

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This class contains all the logic related to image manipulation.
	 */
	var Image = function () {
	    function Image() {
	        _classCallCheck(this, Image);
	    }

	    /**
	    * Calculates the metrics of an img dom object given the response URI.
	    * @param {object} img - DOM image object.
	    * @param {string} uri - URI generated by the image service: can be a data URI scheme or a URL.
	    * @param {bool} jsonResponse - true if the response of the image service is a Json.
	    */
	    Image.setImgSize = function setImgSize(img, uri, jsonResponse) {
	        if (jsonResponse) {
	            // Cleaning data:image/png;base64.
	            if (_configuration2.default.get('imageFormat') == 'svg') {
	                // SVG format.
	                // If SVG is encoded in base64 we need to convert the base64 bytes into a SVG string.
	                if (_configuration2.default.get('saveMode') != 'base64') {
	                    var ar = Image.getMetricsFromSvgString(uri);
	                } else {
	                    var base64String = img.src.substr(img.src.indexOf('base64,') + 7, img.src.length);
	                    var svgString = '';
	                    var bytes = _util2.default.b64ToByteArray(base64String, base64String.length);
	                    for (var i = 0; i < bytes.length; i++) {
	                        svgString += String.fromCharCode(bytes[i]);
	                    }
	                    var ar = Image.getMetricsFromSvgString(svgString);
	                }
	                // PNG format: we store all metrics information in the first 88 bytes.
	            } else {
	                var base64String = img.src.substr(img.src.indexOf('base64,') + 7, img.src.length);
	                var bytes = _util2.default.b64ToByteArray(base64String, 88);
	                var ar = Image.getMetricsFromBytes(bytes);
	            }
	            // Backwards compatibility: we store the metrics into createimage response.
	        } else {
	            var ar = _util2.default.urlToAssArray(uri);
	        }
	        var width = ar['cw'];
	        if (!width) {
	            return;
	        }
	        var height = ar['ch'];
	        var baseline = ar['cb'];
	        var dpi = ar['dpi'];
	        if (dpi) {
	            width = width * 96 / dpi;
	            height = height * 96 / dpi;
	            baseline = baseline * 96 / dpi;
	        }
	        img.width = width;
	        img.height = height;
	        img.style.verticalAlign = "-" + (height - baseline) + "px";
	    };

	    /**
	     * Re-calculates the metrics of a image which has been resized.
	     * @param {object} img  - DOM image object.
	     */


	    Image.fixAfterResize = function fixAfterResize(img) {
	        img.removeAttribute('style');
	        img.removeAttribute('width');
	        img.removeAttribute('height');
	        // In order to avoid resize with max-width css property.
	        img.style.maxWidth = 'none';
	        if (img.src.indexOf("data:image") != -1) {
	            if (_configuration2.default.get('imageFormat') == 'svg') {
	                // ...data:image/svg+xml;charset=utf8, = 32.
	                var svg = decodeURIComponent(img.src.substring(32, img.src.length));
	                Image.setImgSize(img, svg, true);
	            } else {
	                // ...data:image/png;base64, == 22.
	                var base64 = img.src.substring(22, img.src.length);
	                Image.setImgSize(img, base64, true);
	            }
	        } else {
	            Image.setImgSize(img, img.src);
	        }
	    };

	    /**
	     * Returns the metrics (height, width and baseline) contained in SVG image generated
	     * by the MathType image service. This image contains as an extra attribute the image baseline (wrs:baseline).
	     * @param {string} svgString - a string containing an svg image.
	     * @return {array} - an array containing the image metrics.
	     * @ignore
	     */


	    Image.getMetricsFromSvgString = function getMetricsFromSvgString(svgString) {
	        var first = svgString.indexOf('height="');
	        var last = svgString.indexOf('"', first + 8, svgString.length);
	        var height = svgString.substring(first + 8, last);

	        first = svgString.indexOf('width="');
	        last = svgString.indexOf('"', first + 7, svgString.length);
	        var width = svgString.substring(first + 7, last);

	        first = svgString.indexOf('wrs:baseline="');
	        last = svgString.indexOf('"', first + 14, svgString.length);
	        var baseline = svgString.substring(first + 14, last);

	        if (_typeof(width != 'undefined')) {
	            var arr = new Array();
	            arr['cw'] = width;
	            arr['ch'] = height;
	            if (typeof baseline != 'undefined') {
	                arr['cb'] = baseline;
	            }

	            return arr;
	        }
	    };

	    /**
	     * Get metrics (width, height, baseline and dpi) from a png's byte array.
	     * @param  {array} bytes png byte array.
	     * @return {array} An array containging the png's metrics.
	     * @ignore
	     */


	    Image.getMetricsFromBytes = function getMetricsFromBytes(bytes) {
	        _util2.default.readBytes(bytes, 0, 8);
	        var alloc = 10;
	        var i = 0;
	        while (bytes.length >= 4) {
	            var len = _util2.default.readInt32(bytes);
	            var typ = _util2.default.readInt32(bytes);
	            if (typ == 0x49484452) {
	                var width = _util2.default.readInt32(bytes);
	                var height = _util2.default.readInt32(bytes);
	                // Read 5 bytes.
	                _util2.default.readInt32(bytes);
	                _util2.default.readByte(bytes);
	            } else if (typ == 0x62615345) {
	                // Baseline: 'baSE'.
	                var baseline = _util2.default.readInt32(bytes);
	            } else if (typ == 0x70485973) {
	                // Dpis: 'pHYs'.
	                var dpi = _util2.default.readInt32(bytes);
	                dpi = Math.round(dpi / 39.37);
	                _util2.default.readInt32(bytes);
	                _util2.default.readByte(bytes);
	            }
	            _util2.default.readInt32(bytes);
	        }

	        if (typeof width != 'undefined') {
	            var arr = new Array();
	            arr['cw'] = width;
	            arr['ch'] = height;
	            arr['dpi'] = dpi;
	            if (baseline) {
	                arr['cb'] = baseline;
	            }

	            return arr;
	        }
	    };

	    return Image;
	}();

	exports.default = Image;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This class represents the JavaScript configuration properties.
	 * Usually used to manage configuration properties generated in the backend.
	 */
	var Configuration = function () {
	    function Configuration() {
	        _classCallCheck(this, Configuration);
	    }

	    /**
	     * Appends a properties object to Configuration.properties.
	     * @param {Object} configurationObject -
	     */
	    Configuration.addConfiguration = function addConfiguration(configurationObject) {
	        _extends(Configuration.properties, configurationObject);
	    };

	    /**
	     * Returns the value of one property.
	     * @param {string} key - property key
	     * @returns {string} property value
	     */


	    Configuration.get = function get(key) {
	        //TODO: '_wrs_conf' should be removed from the backend service.
	        if (!Configuration.properties.hasOwnProperty('_wrs_conf_' + key)) {
	            return false;
	        }
	        return Configuration.properties['_wrs_conf_' + key];
	    };

	    /**
	     * Sets a new property.
	     * @param {string} key - property key.
	     * @param {object} value - property value.
	     */


	    Configuration.set = function set(key, value) {
	        Configuration.properties[key] = value;
	    };

	    /**
	     * Updates a property with new values. Used to object properties with new values
	     * @param {string} key - Key of the property to be updated.
	     * @param {Object} propertyValue - Values to update the property.
	     */


	    Configuration.update = function update(key, propertyValue) {
	        if (!Configuration.get(key)) {
	            Configuration.set(key, propertyValue);
	        } else {
	            var updateProperty = _extends(Configuration.get(key), propertyValue);
	            Configuration.set(key, updateProperty);
	        }
	    };

	    return Configuration;
	}();

	/**
	 * Static properties object. Stores all configuration properties.
	 * @type {Object}
	 */


	exports.default = Configuration;
	Configuration.properties = {};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _cache = __webpack_require__(5);

	var _cache2 = _interopRequireDefault(_cache);

	var _coreSrc = __webpack_require__(1);

	var _coreSrc2 = _interopRequireDefault(_coreSrc);

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _serviceprovider = __webpack_require__(8);

	var _serviceprovider2 = _interopRequireDefault(_serviceprovider);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Class representing MathType accessible class. This class converts MathML into accessible text.
	 */
	var Accessibility = function () {
	    function Accessibility() {
	        _classCallCheck(this, Accessibility);
	    }

	    /**
	     * Gets the accessible text of a given MathML calling mathml2accesible service.
	     * @param {string} mathML MathML to get the accesibility.
	     * @param {string} language Language of the accesibility.
	     * @return {string} Accessibility from mathml string on language string.
	     * @ignore
	     */
	    Accessibility.mathMLToAccessible = function mathMLToAccessible(mathML, language, data) {
	        var accessibleText;

	        if (Accessibility.cache.get(mathML)) {
	            accessibleText = Accessibility.cache.get[mathML];
	        } else {
	            data['service'] = 'mathml2accessible';
	            data['lang'] = language;
	            var accesibleJsonResponse = JSON.parse(_serviceprovider2.default.getService('service', data));
	            if (accesibleJsonResponse.status != 'error') {
	                accessibleText = accesibleJsonResponse.result.text;
	                Accessibility.cache.populate(mathML, accessibleText);
	            } else {
	                accessibleText = _coreSrc2.default.getStringManager().getString('error_convert_accessibility');
	            }
	        }

	        return accessibleText;
	    };

	    return Accessibility;
	}();

	/**
	 * Static property. This property contains a instance of Cache class in order to
	 * manage the JavaScript accesible cache. Each entry of the cache object contains the
	 * MathML and it's correspondent accessibility text.
	 * @type {Cache}
	 */


	exports.default = Accessibility;
	Accessibility.cache = new _cache2.default();

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var md5;
	exports.default = md5;


	(function () {
		var HxOverrides = function HxOverrides() {};
		HxOverrides.__name__ = true;
		HxOverrides.dateStr = function (date) {
			var m = date.getMonth() + 1;
			var d = date.getDate();
			var h = date.getHours();
			var mi = date.getMinutes();
			var s = date.getSeconds();
			return date.getFullYear() + "-" + (m < 10 ? "0" + m : "" + m) + "-" + (d < 10 ? "0" + d : "" + d) + " " + (h < 10 ? "0" + h : "" + h) + ":" + (mi < 10 ? "0" + mi : "" + mi) + ":" + (s < 10 ? "0" + s : "" + s);
		};
		HxOverrides.strDate = function (s) {
			switch (s.length) {
				case 8:
					var k = s.split(":");
					var d = new Date();
					d.setTime(0);
					d.setUTCHours(k[0]);
					d.setUTCMinutes(k[1]);
					d.setUTCSeconds(k[2]);
					return d;
				case 10:
					var k = s.split("-");
					return new Date(k[0], k[1] - 1, k[2], 0, 0, 0);
				case 19:
					var k = s.split(" ");
					var y = k[0].split("-");
					var t = k[1].split(":");
					return new Date(y[0], y[1] - 1, y[2], t[0], t[1], t[2]);
				default:
					throw "Invalid date format : " + s;
			}
		};
		HxOverrides.cca = function (s, index) {
			var x = s.charCodeAt(index);
			if (x != x) return undefined;
			return x;
		};
		HxOverrides.substr = function (s, pos, len) {
			if (pos != null && pos != 0 && len != null && len < 0) return "";
			if (len == null) len = s.length;
			if (pos < 0) {
				pos = s.length + pos;
				if (pos < 0) pos = 0;
			} else if (len < 0) len = s.length + len - pos;
			return s.substr(pos, len);
		};
		HxOverrides.remove = function (a, obj) {
			var i = 0;
			var l = a.length;
			while (i < l) {
				if (a[i] == obj) {
					a.splice(i, 1);
					return true;
				}
				i++;
			}
			return false;
		};
		HxOverrides.iter = function (a) {
			return { cur: 0, arr: a, hasNext: function hasNext() {
					return this.cur < this.arr.length;
				}, next: function next() {
					return this.arr[this.cur++];
				} };
		};
		var IntIter = function IntIter(min, max) {
			this.min = min;
			this.max = max;
		};
		IntIter.__name__ = true;
		IntIter.prototype = {
			next: function next() {
				return this.min++;
			},
			hasNext: function hasNext() {
				return this.min < this.max;
			},
			__class__: IntIter
		};
		var Std = function Std() {};
		Std.__name__ = true;
		Std["is"] = function (v, t) {
			return js.Boot.__instanceof(v, t);
		};
		Std.string = function (s) {
			return js.Boot.__string_rec(s, "");
		};
		Std["int"] = function (x) {
			return x | 0;
		};
		Std.parseInt = function (x) {
			var v = parseInt(x, 10);
			if (v == 0 && (HxOverrides.cca(x, 1) == 120 || HxOverrides.cca(x, 1) == 88)) v = parseInt(x);
			if (isNaN(v)) return null;
			return v;
		};
		Std.parseFloat = function (x) {
			return parseFloat(x);
		};
		Std.random = function (x) {
			return Math.floor(Math.random() * x);
		};
		var com = com || {};
		if (!com.wiris) com.wiris = {};
		if (!com.wiris.js) com.wiris.js = {};
		com.wiris.js.JsPluginTools = function () {
			this.tryReady();
		};
		com.wiris.js.JsPluginTools.__name__ = true;
		com.wiris.js.JsPluginTools.main = function () {
			var ev;
			ev = com.wiris.js.JsPluginTools.getInstance();
			haxe.Timer.delay($bind(ev, ev.tryReady), 100);
		};
		com.wiris.js.JsPluginTools.getInstance = function () {
			if (com.wiris.js.JsPluginTools.instance == null) com.wiris.js.JsPluginTools.instance = new com.wiris.js.JsPluginTools();
			return com.wiris.js.JsPluginTools.instance;
		};
		com.wiris.js.JsPluginTools.bypassEncapsulation = function () {
			if (window.com == null) window.com = {};
			if (window.com.wiris == null) window.com.wiris = {};
			if (window.com.wiris.js == null) window.com.wiris.js = {};
			if (window.com.wiris.js.JsPluginTools == null) window.com.wiris.js.JsPluginTools = com.wiris.js.JsPluginTools.getInstance();
		};
		com.wiris.js.JsPluginTools.prototype = {
			md5encode: function md5encode(content) {
				return haxe.Md5.encode(content);
			},
			doLoad: function doLoad() {
				this.ready = true;
				com.wiris.js.JsPluginTools.instance = this;
				com.wiris.js.JsPluginTools.bypassEncapsulation();
			},
			tryReady: function tryReady() {
				this.ready = false;
				if (js.Lib.document.readyState) {
					this.doLoad();
					this.ready = true;
				}
				if (!this.ready) haxe.Timer.delay($bind(this, this.tryReady), 100);
			},
			__class__: com.wiris.js.JsPluginTools
		};
		var haxe = haxe || {};
		haxe.Log = function () {};
		haxe.Log.__name__ = true;
		haxe.Log.trace = function (v, infos) {
			js.Boot.__trace(v, infos);
		};
		haxe.Log.clear = function () {
			js.Boot.__clear_trace();
		};
		haxe.Md5 = function () {};
		haxe.Md5.__name__ = true;
		haxe.Md5.encode = function (s) {
			return new haxe.Md5().doEncode(s);
		};
		haxe.Md5.prototype = {
			doEncode: function doEncode(str) {
				var x = this.str2blks(str);
				var a = 1732584193;
				var b = -271733879;
				var c = -1732584194;
				var d = 271733878;
				var step;
				var i = 0;
				while (i < x.length) {
					var olda = a;
					var oldb = b;
					var oldc = c;
					var oldd = d;
					step = 0;
					a = this.ff(a, b, c, d, x[i], 7, -680876936);
					d = this.ff(d, a, b, c, x[i + 1], 12, -389564586);
					c = this.ff(c, d, a, b, x[i + 2], 17, 606105819);
					b = this.ff(b, c, d, a, x[i + 3], 22, -1044525330);
					a = this.ff(a, b, c, d, x[i + 4], 7, -176418897);
					d = this.ff(d, a, b, c, x[i + 5], 12, 1200080426);
					c = this.ff(c, d, a, b, x[i + 6], 17, -1473231341);
					b = this.ff(b, c, d, a, x[i + 7], 22, -45705983);
					a = this.ff(a, b, c, d, x[i + 8], 7, 1770035416);
					d = this.ff(d, a, b, c, x[i + 9], 12, -1958414417);
					c = this.ff(c, d, a, b, x[i + 10], 17, -42063);
					b = this.ff(b, c, d, a, x[i + 11], 22, -1990404162);
					a = this.ff(a, b, c, d, x[i + 12], 7, 1804603682);
					d = this.ff(d, a, b, c, x[i + 13], 12, -40341101);
					c = this.ff(c, d, a, b, x[i + 14], 17, -1502002290);
					b = this.ff(b, c, d, a, x[i + 15], 22, 1236535329);
					a = this.gg(a, b, c, d, x[i + 1], 5, -165796510);
					d = this.gg(d, a, b, c, x[i + 6], 9, -1069501632);
					c = this.gg(c, d, a, b, x[i + 11], 14, 643717713);
					b = this.gg(b, c, d, a, x[i], 20, -373897302);
					a = this.gg(a, b, c, d, x[i + 5], 5, -701558691);
					d = this.gg(d, a, b, c, x[i + 10], 9, 38016083);
					c = this.gg(c, d, a, b, x[i + 15], 14, -660478335);
					b = this.gg(b, c, d, a, x[i + 4], 20, -405537848);
					a = this.gg(a, b, c, d, x[i + 9], 5, 568446438);
					d = this.gg(d, a, b, c, x[i + 14], 9, -1019803690);
					c = this.gg(c, d, a, b, x[i + 3], 14, -187363961);
					b = this.gg(b, c, d, a, x[i + 8], 20, 1163531501);
					a = this.gg(a, b, c, d, x[i + 13], 5, -1444681467);
					d = this.gg(d, a, b, c, x[i + 2], 9, -51403784);
					c = this.gg(c, d, a, b, x[i + 7], 14, 1735328473);
					b = this.gg(b, c, d, a, x[i + 12], 20, -1926607734);
					a = this.hh(a, b, c, d, x[i + 5], 4, -378558);
					d = this.hh(d, a, b, c, x[i + 8], 11, -2022574463);
					c = this.hh(c, d, a, b, x[i + 11], 16, 1839030562);
					b = this.hh(b, c, d, a, x[i + 14], 23, -35309556);
					a = this.hh(a, b, c, d, x[i + 1], 4, -1530992060);
					d = this.hh(d, a, b, c, x[i + 4], 11, 1272893353);
					c = this.hh(c, d, a, b, x[i + 7], 16, -155497632);
					b = this.hh(b, c, d, a, x[i + 10], 23, -1094730640);
					a = this.hh(a, b, c, d, x[i + 13], 4, 681279174);
					d = this.hh(d, a, b, c, x[i], 11, -358537222);
					c = this.hh(c, d, a, b, x[i + 3], 16, -722521979);
					b = this.hh(b, c, d, a, x[i + 6], 23, 76029189);
					a = this.hh(a, b, c, d, x[i + 9], 4, -640364487);
					d = this.hh(d, a, b, c, x[i + 12], 11, -421815835);
					c = this.hh(c, d, a, b, x[i + 15], 16, 530742520);
					b = this.hh(b, c, d, a, x[i + 2], 23, -995338651);
					a = this.ii(a, b, c, d, x[i], 6, -198630844);
					d = this.ii(d, a, b, c, x[i + 7], 10, 1126891415);
					c = this.ii(c, d, a, b, x[i + 14], 15, -1416354905);
					b = this.ii(b, c, d, a, x[i + 5], 21, -57434055);
					a = this.ii(a, b, c, d, x[i + 12], 6, 1700485571);
					d = this.ii(d, a, b, c, x[i + 3], 10, -1894986606);
					c = this.ii(c, d, a, b, x[i + 10], 15, -1051523);
					b = this.ii(b, c, d, a, x[i + 1], 21, -2054922799);
					a = this.ii(a, b, c, d, x[i + 8], 6, 1873313359);
					d = this.ii(d, a, b, c, x[i + 15], 10, -30611744);
					c = this.ii(c, d, a, b, x[i + 6], 15, -1560198380);
					b = this.ii(b, c, d, a, x[i + 13], 21, 1309151649);
					a = this.ii(a, b, c, d, x[i + 4], 6, -145523070);
					d = this.ii(d, a, b, c, x[i + 11], 10, -1120210379);
					c = this.ii(c, d, a, b, x[i + 2], 15, 718787259);
					b = this.ii(b, c, d, a, x[i + 9], 21, -343485551);
					a = this.addme(a, olda);
					b = this.addme(b, oldb);
					c = this.addme(c, oldc);
					d = this.addme(d, oldd);
					i += 16;
				}
				return this.rhex(a) + this.rhex(b) + this.rhex(c) + this.rhex(d);
			},
			ii: function ii(a, b, c, d, x, s, t) {
				return this.cmn(this.bitXOR(c, this.bitOR(b, ~d)), a, b, x, s, t);
			},
			hh: function hh(a, b, c, d, x, s, t) {
				return this.cmn(this.bitXOR(this.bitXOR(b, c), d), a, b, x, s, t);
			},
			gg: function gg(a, b, c, d, x, s, t) {
				return this.cmn(this.bitOR(this.bitAND(b, d), this.bitAND(c, ~d)), a, b, x, s, t);
			},
			ff: function ff(a, b, c, d, x, s, t) {
				return this.cmn(this.bitOR(this.bitAND(b, c), this.bitAND(~b, d)), a, b, x, s, t);
			},
			cmn: function cmn(q, a, b, x, s, t) {
				return this.addme(this.rol(this.addme(this.addme(a, q), this.addme(x, t)), s), b);
			},
			rol: function rol(num, cnt) {
				return num << cnt | num >>> 32 - cnt;
			},
			str2blks: function str2blks(str) {
				var nblk = (str.length + 8 >> 6) + 1;
				var blks = new Array();
				var _g1 = 0,
				    _g = nblk * 16;
				while (_g1 < _g) {
					var i = _g1++;
					blks[i] = 0;
				}
				var i = 0;
				while (i < str.length) {
					blks[i >> 2] |= HxOverrides.cca(str, i) << (str.length * 8 + i) % 4 * 8;
					i++;
				}
				blks[i >> 2] |= 128 << (str.length * 8 + i) % 4 * 8;
				var l = str.length * 8;
				var k = nblk * 16 - 2;
				blks[k] = l & 255;
				blks[k] |= (l >>> 8 & 255) << 8;
				blks[k] |= (l >>> 16 & 255) << 16;
				blks[k] |= (l >>> 24 & 255) << 24;
				return blks;
			},
			rhex: function rhex(num) {
				var str = "";
				var hex_chr = "0123456789abcdef";
				var _g = 0;
				while (_g < 4) {
					var j = _g++;
					str += hex_chr.charAt(num >> j * 8 + 4 & 15) + hex_chr.charAt(num >> j * 8 & 15);
				}
				return str;
			},
			addme: function addme(x, y) {
				var lsw = (x & 65535) + (y & 65535);
				var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
				return msw << 16 | lsw & 65535;
			},
			bitAND: function bitAND(a, b) {
				var lsb = a & 1 & (b & 1);
				var msb31 = a >>> 1 & b >>> 1;
				return msb31 << 1 | lsb;
			},
			bitXOR: function bitXOR(a, b) {
				var lsb = a & 1 ^ b & 1;
				var msb31 = a >>> 1 ^ b >>> 1;
				return msb31 << 1 | lsb;
			},
			bitOR: function bitOR(a, b) {
				var lsb = a & 1 | b & 1;
				var msb31 = a >>> 1 | b >>> 1;
				return msb31 << 1 | lsb;
			},
			__class__: haxe.Md5
		};
		haxe.Timer = function (time_ms) {
			var me = this;
			this.id = window.setInterval(function () {
				me.run();
			}, time_ms);
		};
		haxe.Timer.__name__ = true;
		haxe.Timer.delay = function (f, time_ms) {
			var t = new haxe.Timer(time_ms);
			t.run = function () {
				t.stop();
				f();
			};
			return t;
		};
		haxe.Timer.measure = function (f, pos) {
			var t0 = haxe.Timer.stamp();
			var r = f();
			haxe.Log.trace(haxe.Timer.stamp() - t0 + "s", pos);
			return r;
		};
		haxe.Timer.stamp = function () {
			return new Date().getTime() / 1000;
		};
		haxe.Timer.prototype = {
			run: function run() {},
			stop: function stop() {
				if (this.id == null) return;
				window.clearInterval(this.id);
				this.id = null;
			},
			__class__: haxe.Timer
		};
		var js = js || {};
		js.Boot = function () {};
		js.Boot.__name__ = true;
		js.Boot.__unhtml = function (s) {
			return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
		};
		js.Boot.__trace = function (v, i) {
			var msg = i != null ? i.fileName + ":" + i.lineNumber + ": " : "";
			msg += js.Boot.__string_rec(v, "");
			var d;
			if (typeof document != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>";else if (typeof console != "undefined" && console.log != null) console.log(msg);
		};
		js.Boot.__clear_trace = function () {
			var d = document.getElementById("haxe:trace");
			if (d != null) d.innerHTML = "";
		};
		js.Boot.isClass = function (o) {
			return o.__name__;
		};
		js.Boot.isEnum = function (e) {
			return e.__ename__;
		};
		js.Boot.getClass = function (o) {
			return o.__class__;
		};
		js.Boot.__string_rec = function (o, s) {
			if (o == null) return "null";
			if (s.length >= 5) return "<...>";
			var t = typeof o === "undefined" ? "undefined" : _typeof(o);
			if (t == "function" && (o.__name__ || o.__ename__)) t = "object";
			switch (t) {
				case "object":
					if (o instanceof Array) {
						if (o.__enum__) {
							if (o.length == 2) return o[0];
							var str = o[0] + "(";
							s += "\t";
							var _g1 = 2,
							    _g = o.length;
							while (_g1 < _g) {
								var i = _g1++;
								if (i != 2) str += "," + js.Boot.__string_rec(o[i], s);else str += js.Boot.__string_rec(o[i], s);
							}
							return str + ")";
						}
						var l = o.length;
						var i;
						var str = "[";
						s += "\t";
						var _g = 0;
						while (_g < l) {
							var i1 = _g++;
							str += (i1 > 0 ? "," : "") + js.Boot.__string_rec(o[i1], s);
						}
						str += "]";
						return str;
					}
					var tostr;
					try {
						tostr = o.toString;
					} catch (e) {
						return "???";
					}
					if (tostr != null && tostr != Object.toString) {
						var s2 = o.toString();
						if (s2 != "[object Object]") return s2;
					}
					var k = null;
					var str = "{\n";
					s += "\t";
					var hasp = o.hasOwnProperty != null;
					for (var k in o) {
						;
						if (hasp && !o.hasOwnProperty(k)) {
							continue;
						}
						if (k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
							continue;
						}
						if (str.length != 2) str += ", \n";
						str += s + k + " : " + js.Boot.__string_rec(o[k], s);
					}
					s = s.substring(1);
					str += "\n" + s + "}";
					return str;
				case "function":
					return "<function>";
				case "string":
					return o;
				default:
					return String(o);
			}
		};
		js.Boot.__interfLoop = function (cc, cl) {
			if (cc == null) return false;
			if (cc == cl) return true;
			var intf = cc.__interfaces__;
			if (intf != null) {
				var _g1 = 0,
				    _g = intf.length;
				while (_g1 < _g) {
					var i = _g1++;
					var i1 = intf[i];
					if (i1 == cl || js.Boot.__interfLoop(i1, cl)) return true;
				}
			}
			return js.Boot.__interfLoop(cc.__super__, cl);
		};
		js.Boot.__instanceof = function (o, cl) {
			try {
				if (o instanceof cl) {
					if (cl == Array) return o.__enum__ == null;
					return true;
				}
				if (js.Boot.__interfLoop(o.__class__, cl)) return true;
			} catch (e) {
				if (cl == null) return false;
			}
			switch (cl) {
				case Int:
					return Math.ceil(o % 2147483648.0) === o;
				case Float:
					return typeof o == "number";
				case Bool:
					return o === true || o === false;
				case String:
					return typeof o == "string";
				case Dynamic:
					return true;
				default:
					if (o == null) return false;
					if (cl == Class && o.__name__ != null) return true;else null;
					if (cl == Enum && o.__ename__ != null) return true;else null;
					return o.__enum__ == cl;
			}
		};
		js.Boot.__cast = function (o, t) {
			if (js.Boot.__instanceof(o, t)) return o;else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
		};
		js.Lib = function () {};
		js.Lib.__name__ = true;
		js.Lib.debug = function () {
			debugger;
		};
		js.Lib.alert = function (v) {
			alert(js.Boot.__string_rec(v, ""));
		};
		js.Lib.eval = function (code) {
			return eval(code);
		};
		js.Lib.setErrorHandler = function (f) {
			js.Lib.onerror = f;
		};
		var $_;
		function $bind(o, m) {
			var f = function f() {
				return f.method.apply(f.scope, arguments);
			};f.scope = o;f.method = m;return f;
		};
		if (Array.prototype.indexOf) HxOverrides.remove = function (a, o) {
			var i = a.indexOf(o);
			if (i == -1) return false;
			a.splice(i, 1);
			return true;
		};else null;
		Math.__name__ = ["Math"];
		Math.NaN = Number.NaN;
		Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
		Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
		Math.isFinite = function (i) {
			return isFinite(i);
		};
		Math.isNaN = function (i) {
			return isNaN(i);
		};
		String.prototype.__class__ = String;
		String.__name__ = true;
		Array.prototype.__class__ = Array;
		Array.__name__ = true;
		Date.prototype.__class__ = Date;
		Date.__name__ = ["Date"];
		var Int = { __name__: ["Int"] };
		var Dynamic = { __name__: ["Dynamic"] };
		var Float = Number;
		Float.__name__ = ["Float"];
		var Bool = Boolean;
		Bool.__ename__ = ["Bool"];
		var Class = { __name__: ["Class"] };
		var Enum = {};
		var Void = { __ename__: ["Void"] };
		if (typeof document != "undefined") js.Lib.document = document;
		if (typeof window != "undefined") {
			js.Lib.window = window;
			js.Lib.window.onerror = function (msg, url, line) {
				var f = js.Lib.onerror;
				if (f == null) return false;
				return f(msg, [url + ":" + line]);
			};
		}
		com.wiris.js.JsPluginTools.main();
		delete Array.prototype.__class__;
	})();

	(function () {
		var HxOverrides = function HxOverrides() {};
		HxOverrides.__name__ = true;
		HxOverrides.dateStr = function (date) {
			var m = date.getMonth() + 1;
			var d = date.getDate();
			var h = date.getHours();
			var mi = date.getMinutes();
			var s = date.getSeconds();
			return date.getFullYear() + "-" + (m < 10 ? "0" + m : "" + m) + "-" + (d < 10 ? "0" + d : "" + d) + " " + (h < 10 ? "0" + h : "" + h) + ":" + (mi < 10 ? "0" + mi : "" + mi) + ":" + (s < 10 ? "0" + s : "" + s);
		};
		HxOverrides.strDate = function (s) {
			switch (s.length) {
				case 8:
					var k = s.split(":");
					var d = new Date();
					d.setTime(0);
					d.setUTCHours(k[0]);
					d.setUTCMinutes(k[1]);
					d.setUTCSeconds(k[2]);
					return d;
				case 10:
					var k = s.split("-");
					return new Date(k[0], k[1] - 1, k[2], 0, 0, 0);
				case 19:
					var k = s.split(" ");
					var y = k[0].split("-");
					var t = k[1].split(":");
					return new Date(y[0], y[1] - 1, y[2], t[0], t[1], t[2]);
				default:
					throw "Invalid date format : " + s;
			}
		};
		HxOverrides.cca = function (s, index) {
			var x = s.charCodeAt(index);
			if (x != x) return undefined;
			return x;
		};
		HxOverrides.substr = function (s, pos, len) {
			if (pos != null && pos != 0 && len != null && len < 0) return "";
			if (len == null) len = s.length;
			if (pos < 0) {
				pos = s.length + pos;
				if (pos < 0) pos = 0;
			} else if (len < 0) len = s.length + len - pos;
			return s.substr(pos, len);
		};
		HxOverrides.remove = function (a, obj) {
			var i = 0;
			var l = a.length;
			while (i < l) {
				if (a[i] == obj) {
					a.splice(i, 1);
					return true;
				}
				i++;
			}
			return false;
		};
		HxOverrides.iter = function (a) {
			return { cur: 0, arr: a, hasNext: function hasNext() {
					return this.cur < this.arr.length;
				}, next: function next() {
					return this.arr[this.cur++];
				} };
		};
		var IntIter = function IntIter(min, max) {
			this.min = min;
			this.max = max;
		};
		IntIter.__name__ = true;
		IntIter.prototype = {
			next: function next() {
				return this.min++;
			},
			hasNext: function hasNext() {
				return this.min < this.max;
			},
			__class__: IntIter
		};
		var Std = function Std() {};
		Std.__name__ = true;
		Std["is"] = function (v, t) {
			return js.Boot.__instanceof(v, t);
		};
		Std.string = function (s) {
			return js.Boot.__string_rec(s, "");
		};
		Std["int"] = function (x) {
			return x | 0;
		};
		Std.parseInt = function (x) {
			var v = parseInt(x, 10);
			if (v == 0 && (HxOverrides.cca(x, 1) == 120 || HxOverrides.cca(x, 1) == 88)) v = parseInt(x);
			if (isNaN(v)) return null;
			return v;
		};
		Std.parseFloat = function (x) {
			return parseFloat(x);
		};
		Std.random = function (x) {
			return Math.floor(Math.random() * x);
		};
		var com = com || {};
		if (!com.wiris) com.wiris = {};
		if (!com.wiris.js) com.wiris.js = {};
		com.wiris.js.JsPluginTools = function () {
			this.tryReady();
		};
		com.wiris.js.JsPluginTools.__name__ = true;
		com.wiris.js.JsPluginTools.main = function () {
			var ev;
			ev = com.wiris.js.JsPluginTools.getInstance();
			haxe.Timer.delay($bind(ev, ev.tryReady), 100);
		};
		com.wiris.js.JsPluginTools.getInstance = function () {
			if (com.wiris.js.JsPluginTools.instance == null) com.wiris.js.JsPluginTools.instance = new com.wiris.js.JsPluginTools();
			return com.wiris.js.JsPluginTools.instance;
		};
		com.wiris.js.JsPluginTools.bypassEncapsulation = function () {
			if (window.com == null) window.com = {};
			if (window.com.wiris == null) window.com.wiris = {};
			if (window.com.wiris.js == null) window.com.wiris.js = {};
			if (window.com.wiris.js.JsPluginTools == null) window.com.wiris.js.JsPluginTools = com.wiris.js.JsPluginTools.getInstance();
		};
		com.wiris.js.JsPluginTools.prototype = {
			md5encode: function md5encode(content) {
				return haxe.Md5.encode(content);
			},
			doLoad: function doLoad() {
				this.ready = true;
				com.wiris.js.JsPluginTools.instance = this;
				com.wiris.js.JsPluginTools.bypassEncapsulation();
			},
			tryReady: function tryReady() {
				this.ready = false;
				if (js.Lib.document.readyState) {
					this.doLoad();
					this.ready = true;
				}
				if (!this.ready) haxe.Timer.delay($bind(this, this.tryReady), 100);
			},
			__class__: com.wiris.js.JsPluginTools
		};
		var haxe = haxe || {};
		haxe.Log = function () {};
		haxe.Log.__name__ = true;
		haxe.Log.trace = function (v, infos) {
			js.Boot.__trace(v, infos);
		};
		haxe.Log.clear = function () {
			js.Boot.__clear_trace();
		};
		haxe.Md5 = function () {};
		haxe.Md5.__name__ = true;
		haxe.Md5.encode = function (s) {
			return new haxe.Md5().doEncode(s);
		};
		haxe.Md5.prototype = {
			doEncode: function doEncode(str) {
				var x = this.str2blks(str);
				var a = 1732584193;
				var b = -271733879;
				var c = -1732584194;
				var d = 271733878;
				var step;
				var i = 0;
				while (i < x.length) {
					var olda = a;
					var oldb = b;
					var oldc = c;
					var oldd = d;
					step = 0;
					a = this.ff(a, b, c, d, x[i], 7, -680876936);
					d = this.ff(d, a, b, c, x[i + 1], 12, -389564586);
					c = this.ff(c, d, a, b, x[i + 2], 17, 606105819);
					b = this.ff(b, c, d, a, x[i + 3], 22, -1044525330);
					a = this.ff(a, b, c, d, x[i + 4], 7, -176418897);
					d = this.ff(d, a, b, c, x[i + 5], 12, 1200080426);
					c = this.ff(c, d, a, b, x[i + 6], 17, -1473231341);
					b = this.ff(b, c, d, a, x[i + 7], 22, -45705983);
					a = this.ff(a, b, c, d, x[i + 8], 7, 1770035416);
					d = this.ff(d, a, b, c, x[i + 9], 12, -1958414417);
					c = this.ff(c, d, a, b, x[i + 10], 17, -42063);
					b = this.ff(b, c, d, a, x[i + 11], 22, -1990404162);
					a = this.ff(a, b, c, d, x[i + 12], 7, 1804603682);
					d = this.ff(d, a, b, c, x[i + 13], 12, -40341101);
					c = this.ff(c, d, a, b, x[i + 14], 17, -1502002290);
					b = this.ff(b, c, d, a, x[i + 15], 22, 1236535329);
					a = this.gg(a, b, c, d, x[i + 1], 5, -165796510);
					d = this.gg(d, a, b, c, x[i + 6], 9, -1069501632);
					c = this.gg(c, d, a, b, x[i + 11], 14, 643717713);
					b = this.gg(b, c, d, a, x[i], 20, -373897302);
					a = this.gg(a, b, c, d, x[i + 5], 5, -701558691);
					d = this.gg(d, a, b, c, x[i + 10], 9, 38016083);
					c = this.gg(c, d, a, b, x[i + 15], 14, -660478335);
					b = this.gg(b, c, d, a, x[i + 4], 20, -405537848);
					a = this.gg(a, b, c, d, x[i + 9], 5, 568446438);
					d = this.gg(d, a, b, c, x[i + 14], 9, -1019803690);
					c = this.gg(c, d, a, b, x[i + 3], 14, -187363961);
					b = this.gg(b, c, d, a, x[i + 8], 20, 1163531501);
					a = this.gg(a, b, c, d, x[i + 13], 5, -1444681467);
					d = this.gg(d, a, b, c, x[i + 2], 9, -51403784);
					c = this.gg(c, d, a, b, x[i + 7], 14, 1735328473);
					b = this.gg(b, c, d, a, x[i + 12], 20, -1926607734);
					a = this.hh(a, b, c, d, x[i + 5], 4, -378558);
					d = this.hh(d, a, b, c, x[i + 8], 11, -2022574463);
					c = this.hh(c, d, a, b, x[i + 11], 16, 1839030562);
					b = this.hh(b, c, d, a, x[i + 14], 23, -35309556);
					a = this.hh(a, b, c, d, x[i + 1], 4, -1530992060);
					d = this.hh(d, a, b, c, x[i + 4], 11, 1272893353);
					c = this.hh(c, d, a, b, x[i + 7], 16, -155497632);
					b = this.hh(b, c, d, a, x[i + 10], 23, -1094730640);
					a = this.hh(a, b, c, d, x[i + 13], 4, 681279174);
					d = this.hh(d, a, b, c, x[i], 11, -358537222);
					c = this.hh(c, d, a, b, x[i + 3], 16, -722521979);
					b = this.hh(b, c, d, a, x[i + 6], 23, 76029189);
					a = this.hh(a, b, c, d, x[i + 9], 4, -640364487);
					d = this.hh(d, a, b, c, x[i + 12], 11, -421815835);
					c = this.hh(c, d, a, b, x[i + 15], 16, 530742520);
					b = this.hh(b, c, d, a, x[i + 2], 23, -995338651);
					a = this.ii(a, b, c, d, x[i], 6, -198630844);
					d = this.ii(d, a, b, c, x[i + 7], 10, 1126891415);
					c = this.ii(c, d, a, b, x[i + 14], 15, -1416354905);
					b = this.ii(b, c, d, a, x[i + 5], 21, -57434055);
					a = this.ii(a, b, c, d, x[i + 12], 6, 1700485571);
					d = this.ii(d, a, b, c, x[i + 3], 10, -1894986606);
					c = this.ii(c, d, a, b, x[i + 10], 15, -1051523);
					b = this.ii(b, c, d, a, x[i + 1], 21, -2054922799);
					a = this.ii(a, b, c, d, x[i + 8], 6, 1873313359);
					d = this.ii(d, a, b, c, x[i + 15], 10, -30611744);
					c = this.ii(c, d, a, b, x[i + 6], 15, -1560198380);
					b = this.ii(b, c, d, a, x[i + 13], 21, 1309151649);
					a = this.ii(a, b, c, d, x[i + 4], 6, -145523070);
					d = this.ii(d, a, b, c, x[i + 11], 10, -1120210379);
					c = this.ii(c, d, a, b, x[i + 2], 15, 718787259);
					b = this.ii(b, c, d, a, x[i + 9], 21, -343485551);
					a = this.addme(a, olda);
					b = this.addme(b, oldb);
					c = this.addme(c, oldc);
					d = this.addme(d, oldd);
					i += 16;
				}
				return this.rhex(a) + this.rhex(b) + this.rhex(c) + this.rhex(d);
			},
			ii: function ii(a, b, c, d, x, s, t) {
				return this.cmn(this.bitXOR(c, this.bitOR(b, ~d)), a, b, x, s, t);
			},
			hh: function hh(a, b, c, d, x, s, t) {
				return this.cmn(this.bitXOR(this.bitXOR(b, c), d), a, b, x, s, t);
			},
			gg: function gg(a, b, c, d, x, s, t) {
				return this.cmn(this.bitOR(this.bitAND(b, d), this.bitAND(c, ~d)), a, b, x, s, t);
			},
			ff: function ff(a, b, c, d, x, s, t) {
				return this.cmn(this.bitOR(this.bitAND(b, c), this.bitAND(~b, d)), a, b, x, s, t);
			},
			cmn: function cmn(q, a, b, x, s, t) {
				return this.addme(this.rol(this.addme(this.addme(a, q), this.addme(x, t)), s), b);
			},
			rol: function rol(num, cnt) {
				return num << cnt | num >>> 32 - cnt;
			},
			str2blks: function str2blks(str) {
				var nblk = (str.length + 8 >> 6) + 1;
				var blks = new Array();
				var _g1 = 0,
				    _g = nblk * 16;
				while (_g1 < _g) {
					var i = _g1++;
					blks[i] = 0;
				}
				var i = 0;
				while (i < str.length) {
					blks[i >> 2] |= HxOverrides.cca(str, i) << (str.length * 8 + i) % 4 * 8;
					i++;
				}
				blks[i >> 2] |= 128 << (str.length * 8 + i) % 4 * 8;
				var l = str.length * 8;
				var k = nblk * 16 - 2;
				blks[k] = l & 255;
				blks[k] |= (l >>> 8 & 255) << 8;
				blks[k] |= (l >>> 16 & 255) << 16;
				blks[k] |= (l >>> 24 & 255) << 24;
				return blks;
			},
			rhex: function rhex(num) {
				var str = "";
				var hex_chr = "0123456789abcdef";
				var _g = 0;
				while (_g < 4) {
					var j = _g++;
					str += hex_chr.charAt(num >> j * 8 + 4 & 15) + hex_chr.charAt(num >> j * 8 & 15);
				}
				return str;
			},
			addme: function addme(x, y) {
				var lsw = (x & 65535) + (y & 65535);
				var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
				return msw << 16 | lsw & 65535;
			},
			bitAND: function bitAND(a, b) {
				var lsb = a & 1 & (b & 1);
				var msb31 = a >>> 1 & b >>> 1;
				return msb31 << 1 | lsb;
			},
			bitXOR: function bitXOR(a, b) {
				var lsb = a & 1 ^ b & 1;
				var msb31 = a >>> 1 ^ b >>> 1;
				return msb31 << 1 | lsb;
			},
			bitOR: function bitOR(a, b) {
				var lsb = a & 1 | b & 1;
				var msb31 = a >>> 1 | b >>> 1;
				return msb31 << 1 | lsb;
			},
			__class__: haxe.Md5
		};
		haxe.Timer = function (time_ms) {
			var me = this;
			this.id = window.setInterval(function () {
				me.run();
			}, time_ms);
		};
		haxe.Timer.__name__ = true;
		haxe.Timer.delay = function (f, time_ms) {
			var t = new haxe.Timer(time_ms);
			t.run = function () {
				t.stop();
				f();
			};
			return t;
		};
		haxe.Timer.measure = function (f, pos) {
			var t0 = haxe.Timer.stamp();
			var r = f();
			haxe.Log.trace(haxe.Timer.stamp() - t0 + "s", pos);
			return r;
		};
		haxe.Timer.stamp = function () {
			return new Date().getTime() / 1000;
		};
		haxe.Timer.prototype = {
			run: function run() {},
			stop: function stop() {
				if (this.id == null) return;
				window.clearInterval(this.id);
				this.id = null;
			},
			__class__: haxe.Timer
		};
		var js = js || {};
		js.Boot = function () {};
		js.Boot.__name__ = true;
		js.Boot.__unhtml = function (s) {
			return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
		};
		js.Boot.__trace = function (v, i) {
			var msg = i != null ? i.fileName + ":" + i.lineNumber + ": " : "";
			msg += js.Boot.__string_rec(v, "");
			var d;
			if (typeof document != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>";else if (typeof console != "undefined" && console.log != null) console.log(msg);
		};
		js.Boot.__clear_trace = function () {
			var d = document.getElementById("haxe:trace");
			if (d != null) d.innerHTML = "";
		};
		js.Boot.isClass = function (o) {
			return o.__name__;
		};
		js.Boot.isEnum = function (e) {
			return e.__ename__;
		};
		js.Boot.getClass = function (o) {
			return o.__class__;
		};
		js.Boot.__string_rec = function (o, s) {
			if (o == null) return "null";
			if (s.length >= 5) return "<...>";
			var t = typeof o === "undefined" ? "undefined" : _typeof(o);
			if (t == "function" && (o.__name__ || o.__ename__)) t = "object";
			switch (t) {
				case "object":
					if (o instanceof Array) {
						if (o.__enum__) {
							if (o.length == 2) return o[0];
							var str = o[0] + "(";
							s += "\t";
							var _g1 = 2,
							    _g = o.length;
							while (_g1 < _g) {
								var i = _g1++;
								if (i != 2) str += "," + js.Boot.__string_rec(o[i], s);else str += js.Boot.__string_rec(o[i], s);
							}
							return str + ")";
						}
						var l = o.length;
						var i;
						var str = "[";
						s += "\t";
						var _g = 0;
						while (_g < l) {
							var i1 = _g++;
							str += (i1 > 0 ? "," : "") + js.Boot.__string_rec(o[i1], s);
						}
						str += "]";
						return str;
					}
					var tostr;
					try {
						tostr = o.toString;
					} catch (e) {
						return "???";
					}
					if (tostr != null && tostr != Object.toString) {
						var s2 = o.toString();
						if (s2 != "[object Object]") return s2;
					}
					var k = null;
					var str = "{\n";
					s += "\t";
					var hasp = o.hasOwnProperty != null;
					for (var k in o) {
						;
						if (hasp && !o.hasOwnProperty(k)) {
							continue;
						}
						if (k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
							continue;
						}
						if (str.length != 2) str += ", \n";
						str += s + k + " : " + js.Boot.__string_rec(o[k], s);
					}
					s = s.substring(1);
					str += "\n" + s + "}";
					return str;
				case "function":
					return "<function>";
				case "string":
					return o;
				default:
					return String(o);
			}
		};
		js.Boot.__interfLoop = function (cc, cl) {
			if (cc == null) return false;
			if (cc == cl) return true;
			var intf = cc.__interfaces__;
			if (intf != null) {
				var _g1 = 0,
				    _g = intf.length;
				while (_g1 < _g) {
					var i = _g1++;
					var i1 = intf[i];
					if (i1 == cl || js.Boot.__interfLoop(i1, cl)) return true;
				}
			}
			return js.Boot.__interfLoop(cc.__super__, cl);
		};
		js.Boot.__instanceof = function (o, cl) {
			try {
				if (o instanceof cl) {
					if (cl == Array) return o.__enum__ == null;
					return true;
				}
				if (js.Boot.__interfLoop(o.__class__, cl)) return true;
			} catch (e) {
				if (cl == null) return false;
			}
			switch (cl) {
				case Int:
					return Math.ceil(o % 2147483648.0) === o;
				case Float:
					return typeof o == "number";
				case Bool:
					return o === true || o === false;
				case String:
					return typeof o == "string";
				case Dynamic:
					return true;
				default:
					if (o == null) return false;
					if (cl == Class && o.__name__ != null) return true;else null;
					if (cl == Enum && o.__ename__ != null) return true;else null;
					return o.__enum__ == cl;
			}
		};
		js.Boot.__cast = function (o, t) {
			if (js.Boot.__instanceof(o, t)) return o;else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
		};
		js.Lib = function () {};
		js.Lib.__name__ = true;
		js.Lib.debug = function () {
			debugger;
		};
		js.Lib.alert = function (v) {
			alert(js.Boot.__string_rec(v, ""));
		};
		js.Lib.eval = function (code) {
			return eval(code);
		};
		js.Lib.setErrorHandler = function (f) {
			js.Lib.onerror = f;
		};
		var $_;
		function $bind(o, m) {
			var f = function f() {
				return f.method.apply(f.scope, arguments);
			};f.scope = o;f.method = m;return f;
		};
		if (Array.prototype.indexOf) HxOverrides.remove = function (a, o) {
			var i = a.indexOf(o);
			if (i == -1) return false;
			a.splice(i, 1);
			return true;
		};else null;
		Math.__name__ = ["Math"];
		Math.NaN = Number.NaN;
		Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
		Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
		Math.isFinite = function (i) {
			return isFinite(i);
		};
		Math.isNaN = function (i) {
			return isNaN(i);
		};
		String.prototype.__class__ = String;
		String.__name__ = true;
		Array.prototype.__class__ = Array;
		Array.__name__ = true;
		Date.prototype.__class__ = Date;
		Date.__name__ = ["Date"];
		var Int = { __name__: ["Int"] };
		var Dynamic = { __name__: ["Dynamic"] };
		var Float = Number;
		Float.__name__ = ["Float"];
		var Bool = Boolean;
		Bool.__ename__ = ["Bool"];
		var Class = { __name__: ["Class"] };
		var Enum = {};
		var Void = { __ename__: ["Void"] };
		if (typeof document != "undefined") js.Lib.document = document;
		if (typeof window != "undefined") {
			js.Lib.window = window;
			js.Lib.window.onerror = function (msg, url, line) {
				var f = js.Lib.onerror;
				if (f == null) return false;
				return f(msg, [url + ":" + line]);
			};
		}
		com.wiris.js.JsPluginTools.main();
	})();
	delete Array.prototype.__class__;
	// @codingStandardsIgnoreEnd

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _listeners = __webpack_require__(14);

	var _listeners2 = _interopRequireDefault(_listeners);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * StringManager class to use strings in code correctly with control.
	 *
	 */
	var StringManager = function () {
	    function StringManager() {
	        _classCallCheck(this, StringManager);

	        // Strings are empty when it creates, it set when calls load method.
	        this.strings = null;
	        this.stringsLoaded = false;
	        /**
	         * StringManager listeners. Fired on 'onLoad' event.
	         * @type {Listeners}
	         */
	        this.listeners = new _listeners2.default();
	    }

	    /**
	     * Add a plugin listener.
	     * @param {Object} listener
	     */


	    StringManager.prototype.addListener = function addListener(listener) {
	        this.listeners.add(listener);
	    };

	    /**
	     * This method return a string passing a key.
	     * @param  {string} key of array strings that you want.
	     * @return string A text that you want or key if it doesn't exist.
	     * @ignore
	     */


	    StringManager.prototype.getString = function getString(key) {
	        // Wait 200ms and recall this method if strings aren't load.
	        if (!this.stringsLoaded) {
	            setTimeout(this.getString.bind(this, key), 100);
	            return;
	        }
	        if (key in this.strings) {
	            return this.strings[key];
	        }
	        return key;
	    };
	    /**
	     * This method load all strings to the manager and unset it for prevent bad usage.
	     * @param  {array} String array of language
	     * @ignore
	     */


	    StringManager.prototype.loadStrings = function loadStrings(langStrings) {
	        if (!this.stringsLoaded) {
	            this.strings = langStrings;
	            // Activate variable to unlock getStrings
	            this.stringsLoaded = true;
	            this.listeners.fire('onLoad', {});
	        }
	    };

	    return StringManager;
	}();

	exports.default = StringManager;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This class represents a class to manage custom listeners.
	 */
	var Listeners = function () {
	    function Listeners() {
	        _classCallCheck(this, Listeners);

	        /**
	         * Array containing all custom listeners.
	         * @type {Array}
	         */
	        this.listeners = [];
	    }

	    /**
	     * Add a listener to Listener class.
	     * @param {Object} listener - A listener object.
	     */


	    Listeners.prototype.add = function add(listener) {
	        this.listeners.push(listener);
	    };

	    /**
	     * Fires MathType event listeners
	     * @param  {String} eventName event name
	     * @param  {Object} event properties
	     * @return {bool} false if event has been prevented.
	     * @ignore
	     */


	    Listeners.prototype.fire = function fire(eventName, e) {
	        for (var i = 0; i < this.listeners.length && !e.cancelled; ++i) {
	            if (this.listeners[i].eventName === eventName) {
	                // Calling listener.
	                this.listeners[i].callback(e);
	            }
	        }

	        return e.defaultPrevented;
	    };

	    /**
	     * Creates a new listener.
	     * @param {string} eventName  - Event name.
	     * @param {string} callback - Callback function.
	     * @returns {object} returns the listener object.
	     */


	    Listeners.newListener = function newListener(eventName, callback) {
	        var listener = {};
	        listener.eventName = eventName;
	        listener.callback = callback;
	        return listener;
	    };

	    return Listeners;
	}();

	exports.default = Listeners;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _configuration = __webpack_require__(10);

	var _configuration2 = _interopRequireDefault(_configuration);

	var _editorlistener = __webpack_require__(16);

	var _editorlistener2 = _interopRequireDefault(_editorlistener);

	var _listeners = __webpack_require__(14);

	var _listeners2 = _interopRequireDefault(_listeners);

	var _mathml = __webpack_require__(6);

	var _mathml2 = _interopRequireDefault(_mathml);

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This class implements ModalContent interface. Manage the following:
	 * - insertion in modal object (insert(modalObject) method)
	 * - actions to be done once the modal object has been submited (submitAction() method)
	 * - updates itself when modalObject is updated with a re-open action for example (update(modalObject) method)
	 * - comunicates to modalObject if some changes have be done (hasChanges() method)
	 *
	 * @ignore
	 */
	var ContentManager = function () {
	    /**
	     * Class constructor
	     * @param {object} contentManagerAttributes
	     */
	    function ContentManager(contentManagerAttributes) {
	        _classCallCheck(this, ContentManager);

	        /**
	         * Editor listener. Needed to get control about editor changes.
	         * @type {EditorListener}
	         */
	        this.editorListener = new _editorlistener2.default();
	        /**
	         * MathType editor instance.
	         * @type {JsEditor}
	         */
	        this.editor = null;
	        /**
	         * An object containing MathType editor parameters. See
	         * http://docs.wiris.com/en/mathtype/mathtype_web/sdk-api/parameters for further information.
	         * @type {object}
	         */
	        this.editorAttributes = contentManagerAttributes.editorAttributes;

	        /**
	         * User agent.
	         * @type {string}
	         */
	        this.ua = navigator.userAgent.toLowerCase();
	        /**
	         * Mobile device properties object
	         * @type {Object}
	         * @property {boolean} isAndroid - True if the device is android. False otherwise.
	         * @property {boolean} isIOS - True if the device is iOs. False otherwise.
	         */
	        this.deviceProperties = {};
	        this.deviceProperties.isAndroid = this.ua.indexOf("android") > -1;
	        this.deviceProperties.isIOS = this.ua.indexOf("ipad") > -1 || this.ua.indexOf("iphone") > -1;
	        /**
	         * Custom editor toolbar.
	         * @type {string} toolbar
	         */
	        this.toolbar = null;
	        /**
	         * Custom editors class instance.
	         * @type {CustomEditors}
	         */
	        this.customEditors = contentManagerAttributes.customEditors;
	        /**
	        * Environment properties. This object contains data about the integration platform.
	        * @type {Object}
	        * @property {string} editor - Editor name. Usually the HTML editor.
	        * @property {string} mode - Save mode. Xml by default
	        * @property {string} version - Plugin version.
	        */
	        this.environment = contentManagerAttributes.environment;
	        /**
	         * Integration language.
	         * @type {string}
	         */
	        this.language = contentManagerAttributes.language;
	        /**
	         * Instance of the ModalDialog class associated to the ContentManager instance.
	         * @type {ModalDialog}
	         */
	        this.modalDialogInstance = null;

	        /**
	         * ContentManager listeners. Fired on 'onLoad' event.
	         * @type {Listeners}
	         */
	        this.listeners = new _listeners2.default();
	        /**
	         * ContentManager MathML. null for new formulas.
	         * @type {string}
	         */
	        this.mathML = null;
	        /**
	         * Indicates if the edited element is a new element or not.
	         * @type {boolean}
	         */
	        this.isNewElement = true;
	        /**
	         * IntegrationModel instance. The integration model instance is needed
	         * to call wrapper methods.
	         * @type {IntegrationModel}
	         */
	        this.integrationModel = null;
	        /**
	         * Indicates if the editor is loaded.
	         * @type {bool}
	         */
	        this.isEditorLoaded = false;
	    }

	    /**
	     * Add a new listener to ContentManager class.
	     * @param {object} listener
	     */


	    ContentManager.prototype.addListener = function addListener(listener) {
	        this.listeners.add(listener);
	    };

	    /**
	     * Set an instance of an IntegrationModel
	     * @param {IntegrationModel} integrationModel
	     */


	    ContentManager.prototype.setIntegrationModel = function setIntegrationModel(integrationModel) {
	        this.integrationModel = integrationModel;
	    };

	    /**
	     * Sets a modal dialog instance.
	     * @property {ModalDialog} modal dialog - a ModalDialog instance
	     */


	    ContentManager.prototype.setModalDialogInstance = function setModalDialogInstance(modalDialogInstance) {
	        this.modalDialogInstance = modalDialogInstance;
	    };

	    /**
	     * Mandatory method: inserts editor into modal object content container.
	     * @ignore
	     */


	    ContentManager.prototype.insert = function insert() {
	        // Before insert the editor we update the modal object title to avoid weird render display.
	        this.updateTitle(this.modalDialogInstance);
	        this.insertEditor(this.modalDialogInstance);
	    };

	    /**
	     * Method to insert MathType into modal object. This method
	     * waits until editor JavaScript is loaded to insert the editor into
	     * contentContainer modal object element.
	     * @ignore
	     */


	    ContentManager.prototype.insertEditor = function insertEditor() {
	        // To know if editor JavaScript is loaded we need to wait until com.wiris.jsEditor namespace is ready.
	        if ('com' in window && 'wiris' in window.com && 'jsEditor' in window.com.wiris) {
	            this.editor = com.wiris.jsEditor.JsEditor.newInstance(this.editorAttributes);
	            this.editor.insertInto(this.modalDialogInstance.contentContainer);
	            this.editor.focus();
	            if (this.modalDialogInstance.rtl) {
	                this.editor.action('rtl');
	            }
	            // Setting div in rtl in case of it's activated.
	            if (this.editor.getEditorModel().isRTL()) {
	                this.editor.element.style.direction = 'rtl';
	            }

	            // Editor listener: this object manages the changes logic of editor.
	            this.editor.getEditorModel().addEditorListener(this.editorListener);

	            // iOS events.
	            if (this.modalDialogInstance.deviceProperties['isIOS']) {
	                setTimeout(function () {
	                    this.modalDialogInstance.hideKeyboard();
	                }, 400);
	                var formulaDisplayDiv = document.getElementsByClassName('wrs_formulaDisplay')[0];
	                _util2.default.addEvent(formulaDisplayDiv, 'focus', this.modalDialogInstance.openedIosSoftkeyboard.bind());
	                _util2.default.addEvent(formulaDisplayDiv, 'blur', this.modalDialogInstance.closedIosSoftkeyboard.bind());
	            }
	            // Fire onLoad event. Necessary to set the MathML into the editor
	            // after is loaded.
	            this.listeners.fire('onLoad', {});
	            this.isEditorLoaded = true;
	        } else {
	            setTimeout(ContentManager.prototype.insertEditor.bind(this, this.modalDialogInstance), 100);
	        }
	    };

	    /**
	     * Loads MathType script.
	     * @ignore
	     */


	    ContentManager.prototype.init = function init() {
	        var queryParams = window.location.search.substring(1).split("&");
	        for (var i = 0; i < queryParams.length; i++) {
	            var pos = queryParams[i].indexOf("v=");
	            if (pos >= 0) {
	                version = queryParams[i].substring(2);
	            }
	        }

	        var script = document.createElement('script');
	        script.type = 'text/javascript';
	        var editorUrl = _configuration2.default.get('editorUrl');
	        // Change to https if necessary.
	        // We create an object url for parse url string and work more efficiently.
	        var urlObject = document.createElement('a');
	        urlObject.href = editorUrl;

	        if (window.location.href.indexOf("https://") == 0) {
	            // It check if browser is https and configuration is http. If this is so, we will replace protocol.
	            if (urlObject.protocol == 'http:') {
	                urlObject.protocol = 'https:';
	            }
	        }

	        // Check protocol and remove port if it's standard.
	        if (urlObject.port == '80' || urlObject.port == '443') {
	            editorUrl = urlObject.protocol + '//' + urlObject.hostname + '/' + urlObject.pathname;
	        } else {
	            editorUrl = urlObject.protocol + '//' + urlObject.hostname + ':' + urlObject.port + '/' + urlObject.pathname;
	        }

	        // Editor stats. Use environment property to set it.
	        var stats = {};
	        if ('editor' in this.environment) {
	            stats.editor = this.environment.editor;
	        } else {
	            stats.editor = 'unknown';
	        }

	        if ('mode' in this.environment) {
	            stats.mode = this.environment.mode;
	        } else {
	            stats.mode = _configuration2.default.get('saveMode');
	        }

	        if ('version' in this.environment) {
	            stats.version = this.environment.version;
	        } else {
	            stats.version = _configuration2.default.get('version');
	        }

	        // Load editor URL. We add stats as GET params.
	        script.src = editorUrl + "?lang=" + this.language + '&stats-editor=' + stats.editor + '&stats-mode=' + stats.mode + '&stats-version=' + stats.version;

	        document.getElementsByTagName('head')[0].appendChild(script);
	    };

	    /**
	    * Set the editor initial content: an existing formula or a blank MathML
	    */


	    ContentManager.prototype.setInitialContent = function setInitialContent() {
	        if (!this.isNewElement) {
	            this.setMathML(this.mathML);
	        }
	    };

	    /**
	     * Set a MathML into editor.
	     * @param {string} mathml MathML string.
	     * @param {bool} focusDisabled if true editor don't get focus after the MathML is set. false by default.
	     * @ignore
	     */


	    ContentManager.prototype.setMathML = function setMathML(mathml, focusDisabled) {
	        // By default focus is enabled
	        if (typeof focusDisabled === 'undefined') {
	            focusDisabled = false;
	        }
	        // Using setMathML method is not a change produced by the user but for the API
	        // so we set to false the contentChange property of editorListener.
	        this.editor.setMathMLWithCallback(mathml, function () {
	            this.editorListener.setWaitingForChanges(true);
	        }.bind(this));
	        // We need to wait a little until the callback finish.
	        setTimeout(function () {
	            this.editorListener.setIsContentChanged(false);
	        }.bind(this), 500);

	        // In some scenarios - like closing modal object - editor mustn't be focused.
	        if (!focusDisabled) {
	            this.onFocus();
	        }
	    };

	    /**
	     * Set focus on editor.
	     * @ignore
	     */


	    ContentManager.prototype.onFocus = function onFocus() {
	        if (typeof this.editor !== 'undefined' && this.editor != null) {
	            this.editor.focus();
	        }
	    };

	    /**
	     * Mandatory method: modal object calls this method to execute a callback action
	     * on submit.
	     * This method updates the edition area (inserting a new formula or update an older one),
	     * and focus the edition area too.
	     * @ignore
	     */


	    ContentManager.prototype.submitAction = function submitAction() {
	        var mathML = this.editor.getMathML();
	        // Add class for custom editors.
	        if (this.customEditors.getActiveEditor() != null) {
	            mathML = _mathml2.default.addEditorAttribute(mathML, this.customEditors.getActiveEditor().toolbar);
	        }
	        var mathmlEntitiesEncoded = _mathml2.default.mathMLEntities(mathML);
	        this.integrationModel.updateFormula(mathmlEntitiesEncoded);
	        this.customEditors.disable();
	        this.integrationModel.notifyWindowClosed();

	        // Set disabled focus to prevent lost focus.
	        this.setEmptyMathML();
	        this.customEditors.disable();
	        // Recovering editing area focus.
	        setTimeout(function () {
	            if (typeof _wrs_currentEditor !== 'undefined' && _wrs_currentEditor) {
	                _wrs_currentEditor.focus();
	            }
	        }, 100);
	    };

	    /**
	     * Set an empty MathML into the editor in order to clean the edit area.
	     * @ignore
	     */


	    ContentManager.prototype.setEmptyMathML = function setEmptyMathML() {
	        // As second argument we pass
	        if (this.deviceProperties.isAndroid || this.deviceProperties.isIOS) {
	            // We need to set a empty annotation in order to maintain editor in Hand mode.
	            // Adding dir rtl in case of it's activated.
	            if (this.editor.getEditorModel().isRTL()) {
	                this.setMathML('<math dir="rtl"><semantics><annotation encoding="application/json">[]</annotation></semantics></math>"', true);
	            } else {
	                this.setMathML('<math><semantics><annotation encoding="application/json">[]</annotation></semantics></math>"', true);
	            }
	        } else {
	            if (this.editor.getEditorModel().isRTL()) {
	                this.setMathML('<math dir="rtl"/>', true);
	            } else {
	                this.setMathML('<math/>', true);
	            }
	        }
	    };

	    /**
	     * Mandatory method: modal object calls this method when is updated, for example re-editing a formula when the
	     * editor is open with another formula. This method updates the editor content (with an empty MathML or an exising formula),
	     * updates - if needed - the editor toolbar (math --> chem or chem --> math) and recover the focus.
	     * @ignore
	     */


	    ContentManager.prototype.onOpen = function onOpen() {
	        if (this.isNewElement) {
	            this.setEmptyMathML();
	        } else {
	            this.setMathML(this.mathML);
	        }
	        this.updateToolbar();
	        this.onFocus();
	    };

	    /**
	     * Sets the correct toolbar depending if exist other custom toolbars at the same time (e.g: Chemistry)
	     * @ignore
	     */


	    ContentManager.prototype.updateToolbar = function updateToolbar() {
	        this.updateTitle(this.modalDialogInstance);
	        var customEditor;
	        if (customEditor = this.customEditors.getActiveEditor()) {
	            var toolbar = customEditor.toolbar ? customEditor.toolbar : _wrs_int_wirisProperties['toolbar'];
	            if (this.toolbar == null || this.toolbar != toolbar) {
	                this.setToolbar(toolbar);
	            }
	        } else {
	            var toolbar = this.getToolbar();
	            if (this.toolbar == null || this.toolbar != toolbar) {
	                this.setToolbar(toolbar);
	                this.customEditors.disable();
	            }
	        }
	    };
	    /**
	     * Updates the modalObject title: if a custom editor (with a custom toolbar) is enabled
	     * picks the custom editor title. Otherwise default title.
	     * @ignore
	     */


	    ContentManager.prototype.updateTitle = function updateTitle() {
	        var customEditor;
	        if (customEditor = this.customEditors.getActiveEditor()) {
	            this.modalDialogInstance.setTitle(customEditor.title);
	        } else {
	            this.modalDialogInstance.setTitle('MathType');
	        }
	    };
	    /**
	     * Returns toolbar depending on the configuration local or serverside.
	     * @ignore
	     */


	    ContentManager.prototype.getToolbar = function getToolbar() {
	        var toolbar;
	        if ('toolbar' in this.editorAttributes) {
	            toolbar = this.editorAttributes.toolbar;
	        } else {
	            toolbar = "general";
	        }
	        // TODO: Change global integration variable for integration custom toolbar
	        if (toolbar == 'general') {
	            toolbar = typeof _wrs_int_wirisProperties == 'undefined' || typeof _wrs_int_wirisProperties['toolbar'] == 'undefined' ? 'general' : _wrs_int_wirisProperties['toolbar'];
	        }

	        return toolbar;
	    };

	    /**
	     * Set a toolbar into editor.
	     * @param {string} toolbar toolbar name.
	     * @ignore
	     */


	    ContentManager.prototype.setToolbar = function setToolbar(toolbar) {
	        this.toolbar = toolbar;
	        this.editor.setParams({ 'toolbar': this.toolbar });
	    };

	    /**
	     * Returns true if the content of the editor has been changed. The logic of the changes
	     * is delegated to editorListener object.
	     * @ignore
	     */


	    ContentManager.prototype.hasChanges = function hasChanges() {
	        return !this.editor.isFormulaEmpty() && this.editorListener.getIsContentChanged();
	    };

	    return ContentManager;
	}();

	exports.default = ContentManager;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * EditorListener class. This class implement EditorListener interface
	 * and contains the logic to determine if editor has been changed or not.
	 * @ignore
	 */
	var EditorListener = function () {
	  function EditorListener() {
	    _classCallCheck(this, EditorListener);

	    this.isContentChanged = false;
	    this.waitingForChanges = false;
	  }

	  /**
	   * EditorListener method set if content is changed
	   * @ignore
	   */


	  EditorListener.prototype.setIsContentChanged = function setIsContentChanged(value) {
	    this.isContentChanged = value;
	  };

	  /**
	   * EditorListener method to get if content is changed
	   * @ignore
	   */
	  EditorListener.prototype.getIsContentChanged = function getIsContentChanged(value) {
	    return this.isContentChanged;
	  };

	  /**
	   * EditorListener method to wait changes
	   * @ignore
	   */
	  EditorListener.prototype.setWaitingForChanges = function setWaitingForChanges(value) {
	    this.waitingForChanges = value;
	  };

	  /**
	   * EditorListener method to overwrite
	   * @ignore
	   */
	  EditorListener.prototype.caretPositionChanged = function caretPositionChanged(editor) {};

	  /**
	   * EditorListener method to overwrite
	   * @ignore
	   */
	  EditorListener.prototype.clipboardChanged = function clipboardChanged(editor) {};

	  /**
	   * EditorListener method to set if content is changed
	   * @ignore
	   */
	  EditorListener.prototype.contentChanged = function contentChanged(editor) {
	    if (this.waitingForChanges === true && this.isContentChanged === false) {
	      this.isContentChanged = true;
	    }
	  };
	  /**
	   * EditorListener method to overwrite
	   * @ignore
	   */


	  EditorListener.prototype.styleChanged = function styleChanged(editor) {};

	  /**
	   * EditorListener method to overwrite
	   * @ignore
	   */
	  EditorListener.prototype.transformationReceived = function transformationReceived(editor) {};

	  return EditorListener;
	}();

	exports.default = EditorListener;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _stringmanager = __webpack_require__(13);

	var _stringmanager2 = _interopRequireDefault(_stringmanager);

	var _contentmanager = __webpack_require__(15);

	var _contentmanager2 = _interopRequireDefault(_contentmanager);

	var _popupmessage = __webpack_require__(18);

	var _popupmessage2 = _interopRequireDefault(_popupmessage);

	var _coreSrc = __webpack_require__(1);

	var _coreSrc2 = _interopRequireDefault(_coreSrc);

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _configuration = __webpack_require__(10);

	var _configuration2 = _interopRequireDefault(_configuration);

	var _listeners = __webpack_require__(14);

	var _listeners2 = _interopRequireDefault(_listeners);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This class represents a modal dialog. The modal dialog admits a ContentManager instance in order
	 * to manage the content of the dialog.
	 */
	var ModalDialog = function () {

	    /**
	     * Modal dialog constructor
	     * @param {Object} modalDialogAttributes  - An object containing the modal dialog attributes.
	     * @ignore
	     */
	    function ModalDialog(modalDialogAttributes) {
	        _classCallCheck(this, ModalDialog);

	        this.attributes = modalDialogAttributes;

	        // Metrics
	        var ua = navigator.userAgent.toLowerCase();
	        var isAndroid = ua.indexOf("android") > -1;
	        var isIOS = ua.indexOf("ipad") > -1 || ua.indexOf("iphone") > -1;
	        this.iosSoftkeyboardOpened = false;
	        this.iosMeasureUnit = ua.indexOf("crios") == -1 ? "%" : "vh";
	        this.iosDivHeight = "100" + this.iosMeasureUnit;

	        var deviceWidth = window.outerWidth;
	        var deviceHeight = window.outerHeight;

	        var landscape = deviceWidth > deviceHeight;
	        var portrait = deviceWidth < deviceHeight;

	        // TODO: Detect isMobile without using editor metrics.
	        var isMobile = landscape && this.attributes.height > deviceHeight || portrait && this.attributes.width > deviceWidth ? true : false;

	        // Device object properties.

	        this.deviceProperties = {
	            orientation: landscape ? 'landscape' : 'portait',
	            isAndroid: isAndroid ? true : false,
	            isIOS: isIOS ? true : false,
	            isMobile: isMobile,
	            isDesktop: !isMobile && !isIOS && !isAndroid
	        };

	        this.properties = {
	            created: false,
	            state: '',
	            previousState: '',
	            position: { bottom: 0, right: 10 },
	            size: { height: 338, width: 580 }
	        };

	        var attributes = {};
	        attributes.class = 'wrs_modal_overlay';
	        attributes.id = attributes.class + '_id';
	        this.overlay = _util2.default.createElement('div', attributes);

	        attributes = {};
	        attributes.class = 'wrs_modal_title_bar';
	        attributes.id = attributes.class + '_id';
	        this.titleBar = _util2.default.createElement('div', attributes);

	        attributes = {};
	        attributes.class = 'wrs_modal_title';
	        attributes.id = attributes.class + '_id';
	        this.title = _util2.default.createElement('div', attributes);
	        this.title.innerHTML = '';

	        attributes = {};
	        attributes.class = 'wrs_modal_close_button';
	        attributes.id = attributes.class + '_id';
	        attributes.title = _coreSrc2.default.getStringManager().getString('close');
	        this.closeDiv = _util2.default.createElement('a', attributes);;
	        this.closeDiv.setAttribute('role', 'button');

	        attributes = {};
	        attributes.class = 'wrs_modal_stack_button';
	        attributes.id = attributes.class + '_id';
	        attributes.title = "Exit full-screen";
	        this.stackDiv = _util2.default.createElement('a', attributes);
	        this.stackDiv.setAttribute('role', 'button');

	        attributes = {};
	        attributes.class = 'wrs_modal_maximize_button';
	        attributes.id = attributes.class + '_id';
	        attributes.title = _coreSrc2.default.getStringManager().getString('fullscreen');
	        this.maximizeDiv = _util2.default.createElement('a', attributes);
	        this.maximizeDiv.setAttribute('role', 'button');

	        attributes = {};
	        attributes.class = 'wrs_modal_minimize_button';
	        attributes.id = attributes.class + '_id';
	        attributes.title = _coreSrc2.default.getStringManager().getString('minimise');
	        this.minimizeDiv = _util2.default.createElement('a', attributes);
	        this.minimizeDiv.setAttribute('role', 'button');

	        attributes = {};
	        attributes.class = 'wrs_modal_dialogContainer';
	        attributes.id = attributes.class + '_id';
	        this.container = _util2.default.createElement('div', attributes);

	        attributes = {};
	        attributes.class = 'wrs_modal_wrapper';
	        attributes.id = attributes.class + '_id';
	        this.wrapper = _util2.default.createElement('div', attributes);

	        attributes = {};
	        attributes.class = 'wrs_content_container';
	        attributes.id = attributes.class + '_id';
	        this.contentContainer = _util2.default.createElement('div', attributes);

	        attributes = {};
	        attributes.class = 'wrs_modal_controls';
	        attributes.id = attributes.class + '_id';
	        this.controls = _util2.default.createElement('div', attributes);

	        attributes = {};
	        attributes.class = 'wrs_modal_buttons_container';
	        attributes.id = attributes.class + '_id';
	        this.buttonContainer = _util2.default.createElement('div', attributes);

	        // Buttons: all button must be created using createSubmitButton method.
	        this.submitButton = this.createSubmitButton({
	            class: 'wrs_modal_button_accept',
	            innerHTML: _coreSrc2.default.getStringManager().getString('accept')
	        }, this.submitAction.bind(this));

	        this.cancelButton = this.createSubmitButton({
	            class: 'wrs_modal_button_cancel',
	            innerHTML: _coreSrc2.default.getStringManager().getString('cancel')
	        }, this.cancelAction.bind(this));

	        this.contentManager = null;

	        // Overlay popup.
	        var popupStrings = {
	            'cancelString': _coreSrc2.default.getStringManager().getString('cancel'),
	            'submitString': _coreSrc2.default.getStringManager().getString('close'),
	            'message': _coreSrc2.default.getStringManager().getString('close_modal_warning')
	        };

	        var callbacks = {
	            'closeCallback': function () {
	                this.close();
	            }.bind(this),
	            'cancelCallback': function () {
	                this.focus();
	            }.bind(this)
	        };

	        var popupupProperties = {
	            'overlayElement': this.container,
	            'callbacks': callbacks,
	            'strings': popupStrings
	        };

	        this.popup = new _popupmessage2.default(popupupProperties);

	        /**
	        * Indicates if directionality of the modal dialog is RTL. false by default.
	        * @type {bool}
	        */
	        this.rtl = false;
	        if ('rtl' in this.attributes) {
	            this.rtl = this.attributes.rtl;
	        }
	    }
	    /**
	     * This method sets the contentElement object. A contentElement object
	     * manages the logic of modal object content: submit, update, close and changes.
	     * @param {object} contentManager
	     * @ignore
	     */


	    ModalDialog.prototype.setContentManager = function setContentManager(contentManager) {
	        this.contentManager = contentManager;
	    };

	    /**
	     * Returns the modal contentElement object.
	     *@returns {object}
	    *@ignore
	    */


	    ModalDialog.prototype.getContentManager = function getContentManager() {
	        return this.contentManager;
	    };

	    /**
	     * This method is called when the modal object has been submited. Calls
	     * contentElement submitAction method - if exists - and closes the modal
	     * object. No logic about the content should be placed here,
	     * contentElement.submitAction is the responsible of the content logic.
	     * @ignore
	     */


	    ModalDialog.prototype.submitAction = function submitAction() {
	        if (typeof this.contentManager.submitAction !== 'undefined') {
	            this.contentManager.submitAction();
	        }
	        this.close();
	    };

	    /**
	     * This method is called when the modal object has been cancelled. If
	     * contentElement has implemented hasChanges method, a confirm popup
	     * will be shown if hasChanges returns true.
	     * @ignore
	     */


	    ModalDialog.prototype.cancelAction = function cancelAction() {
	        if (typeof this.contentManager.hasChanges === 'undefined') {
	            this.close();
	        } else if (!this.contentManager.hasChanges()) {
	            this.close();
	        } else {
	            this.showPopUpMessage();
	        }
	    };

	    /**
	     * Returns a submit button. The properties argument admits the following:
	     * properties {
	     *  'class' : '', // button class.
	     *  'innerHTML : '' // button innerHTML.
	     * }
	     * @param {Object} properties input button properties.
	     * @param {Function} callback callback function associated to click event.
	     * @ignore
	     */


	    ModalDialog.prototype.createSubmitButton = function createSubmitButton(properties, callback) {
	        function SubmitButton(properties, callback) {
	            this.element = document.createElement('button');
	            this.element.id = properties.class + '_id';
	            this.element.className = properties.class;
	            this.element.innerHTML = properties.innerHTML;
	            _util2.default.addEvent(this.element, 'click', callback);
	        }

	        SubmitButton.prototype.getElement = function () {
	            return this.element;
	        };

	        return new SubmitButton(properties, callback).getElement();
	    };

	    /**
	     * Creates the modal window object inserting a contentElement object.
	     * @ignore
	     */


	    ModalDialog.prototype.create = function create() {

	        /*Modal Window Structure
	        _____________________________________________________________________________________
	        |wrs_modal_dialog_Container                                                         |
	        | _________________________________________________________________________________ |
	        | |title_bar                          minimize_button  stack_button  close_button | |
	        | |_______________________________________________________________________________| |
	        | |wrapper                                                                        | |
	        | | _____________________________________________________________________________ | |
	        | | |content                                                                    | | |
	        | | |                                                                           | | |
	        | | |                                                                           | | |
	        | | |___________________________________________________________________________| | |
	        | | _____________________________________________________________________________ | |
	        | | |controls                                                                   | | |
	        | | | ___________________________________                                       | | |
	        | | | |buttonContainer                  |                                       | | |
	        | | | | _______________________________ |                                       | | |
	        | | | | |button_accept | button_cancel| |                                       | | |
	        | | | |_|_____________ |______________|_|                                       | | |
	        | | |___________________________________________________________________________| | |
	        | |_______________________________________________________________________________| |
	        |___________________________________________________________________________________|*/

	        this.titleBar.appendChild(this.closeDiv);
	        this.titleBar.appendChild(this.stackDiv);
	        this.titleBar.appendChild(this.maximizeDiv);
	        this.titleBar.appendChild(this.minimizeDiv);
	        this.titleBar.appendChild(this.title);

	        if (this.deviceProperties['isDesktop']) {
	            this.container.appendChild(this.titleBar);
	        }

	        this.wrapper.appendChild(this.contentContainer);
	        this.wrapper.appendChild(this.controls);

	        this.controls.appendChild(this.buttonContainer);

	        this.buttonContainer.appendChild(this.submitButton);
	        this.buttonContainer.appendChild(this.cancelButton);

	        this.container.appendChild(this.wrapper);

	        // Check if browser has scrollBar before modal has modified.
	        this.recalculateScrollBar();

	        document.body.appendChild(this.container);
	        document.body.appendChild(this.overlay);

	        if (this.deviceProperties['isDesktop']) {
	            // Desktop.
	            this.createModalWindowDesktop();
	            this.createResizeButtons();

	            this.addListeners();
	            // Maximize window only when the configuration is set and the device is not iOS or Android.
	            if (_configuration2.default.get('modalWindowFullScreen')) {
	                this.maximize();
	            }
	        } else if (this.deviceProperties['isAndroid']) {
	            this.createModalWindowAndroid();
	        } else if (this.deviceProperties['isIOS'] && !this.deviceProperties['isMobile']) {
	            this.createModalWindowIos();
	        }

	        if (this.contentManager != null) {
	            this.contentManager.insert(this);
	        }

	        this.properties.open = true;
	        this.properties.created = true;

	        // Checks language directionality.
	        if (this.isRTL()) {
	            this.container.style.right = window.innerWidth - this.scrollbarWidth - this.container.offsetWidth + 'px';
	            this.container.className += ' wrs_modal_rtl';
	        }
	    };

	    /**
	     * Creates a button in the modal object to resize it.
	     * @ignore
	     */


	    ModalDialog.prototype.createResizeButtons = function createResizeButtons() {
	        // This is a definition of Resize Button Bottom-Right
	        this.resizerBR = document.createElement('div');
	        this.resizerBR.className = 'wrs_bottom_right_resizer';
	        this.resizerBR.innerHTML = '◢';
	        // This is a definition of Resize Button Top-Left
	        this.resizerTL = document.createElement('div');
	        this.resizerTL.className = 'wrs_bottom_left_resizer';
	        // Append resize buttons to modal
	        this.container.appendChild(this.resizerBR);
	        this.titleBar.appendChild(this.resizerTL);
	        // Add events to resize on click and drag
	        _util2.default.addEvent(this.resizerBR, 'mousedown', this.activateResizeStateBR.bind(this));
	        _util2.default.addEvent(this.resizerTL, 'mousedown', this.activateResizeStateTL.bind(this));
	    };
	    /**
	     * Method to initialize variables for Bottom-Right resize button
	     * @param {event} ev mouse
	     * @ignore
	     */


	    ModalDialog.prototype.activateResizeStateBR = function activateResizeStateBR(ev) {
	        this.initializeResizeProperties(ev, false);
	    };

	    /**
	     * Method to initialize variables for Top-Left resize button
	     * @param {event} ev mouse
	     * @ignore
	     */


	    ModalDialog.prototype.activateResizeStateTL = function activateResizeStateTL(ev) {
	        this.initializeResizeProperties(ev, true);
	    };

	    /**
	     * Common method to initialize variables at resize
	     * @param {event} ev mouse
	     * @ignore
	     */


	    ModalDialog.prototype.initializeResizeProperties = function initializeResizeProperties(ev, leftOption) {
	        // Apply class for disable involuntary select text when drag.
	        _util2.default.addClass(document.body, 'wrs_noselect');
	        _util2.default.addClass(this.overlay, 'wrs_overlay_active');
	        this.resizeDataObject = {
	            x: this.eventClient(ev).X,
	            y: this.eventClient(ev).Y
	        };
	        // Save Initial state of modal to compare on drag and obtain the difference.
	        this.initialWidth = parseInt(this.container.style.width);
	        this.initialHeight = parseInt(this.container.style.height);
	        if (!leftOption) {
	            this.initialRight = parseInt(this.container.style.right);
	            this.initialBottom = parseInt(this.container.style.bottom);
	        } else {
	            this.leftScale = true;
	        }
	        if (!this.initialRight) {
	            this.initialRight = 0;
	        }
	        if (!this.initialBottom) {
	            this.initialBottom = 0;
	        }
	        // Disable mouse events on editor when we start to drag modal.
	        document.body.style['user-select'] = 'none';
	    };

	    /**
	     * This method opens the modal window, restoring the previous state, position and metrics,
	     * if exists.
	     * By default the modal object opens in stack mode.
	     * @ignore
	     */


	    ModalDialog.prototype.open = function open() {
	        //Removing close class.
	        this.removeClass('wrs_closed');
	        // Hiding keyboard for mobile devices.
	        if (this.deviceProperties['isIOS'] || this.deviceProperties['isAndroid'] || this.deviceProperties['isMobile']) {
	            // Restore scale to 1
	            this.restoreWebsiteScale();
	            this.blockWebsiteScroll();
	            // Due to editor wait we need to wait until editor focus.
	            setTimeout(function () {
	                this.hideKeyboard();
	            }.bind(this), 400);
	        }

	        // New modal window. He need to create the whole object.
	        if (!this.properties.created) {
	            this.create();
	        } else {
	            // Previous state closed. Open method can be called even the previous state is open,
	            // for exmample updating the content of the modal object.
	            if (!this.properties.open) {
	                this.properties.open = true;

	                // Restoring the previous open state: if the modal object has been closed
	                // re-open it should preserve the state and the metrics.
	                if (!this.deviceProperties.isAndroid && !this.deviceProperties.isIOS) {
	                    this.restoreState();
	                }
	            }

	            // Maximize window only when the configuration is set and the device is not iOs or Android.
	            if (this.deviceProperties['isDesktop'] && _configuration2.default.get('modalWindowFullScreen')) {
	                this.maximize();
	            }

	            // In iOS we need to recalculate the size of the modal object because
	            // iOS keyboard is a float div which can overlay the modal object.
	            if (this.deviceProperties['isIOS']) {
	                this.iosSoftkeyboardOpened = false;
	                this.setContainerHeight("100" + this.iosMeasureUnit);
	            }
	        }

	        if (this.contentManager.isEditorLoaded === false) {
	            var listener = _listeners2.default.newListener('onLoad', function () {
	                this.contentManager.onOpen(this);
	            }.bind(this));
	            this.contentManager.addListener(listener);
	        } else {
	            this.contentManager.onOpen(this);
	        }
	    };

	    /**
	     * Closes modal window and restores viewport header.
	     * @ignore
	     */


	    ModalDialog.prototype.close = function close() {
	        this.removeClass('wrs_maximized');
	        this.removeClass('wrs_minimized');
	        this.removeClass('wrs_stack');
	        this.addClass('wrs_closed');
	        this.saveModalProperties();
	        this.unblockWebsiteScroll();
	        this.properties.open = false;
	    };

	    /**
	     * It sets the website scale to one.
	     * @ignore
	     */


	    ModalDialog.prototype.restoreWebsiteScale = function restoreWebsiteScale() {
	        var viewportmeta = document.querySelector('meta[name=viewport]');
	        // Let the equal symbols in order to search and make meta's final content.
	        var contentAttrsToUpdate = ['initial-scale=', 'minimum-scale=', 'maximum-scale='];
	        var contentAttrsValuesToUpdate = ['1.0', '1.0', '1.0'];
	        var setMetaAttrFunc = function setMetaAttrFunc(viewportelement, contentAttrsToUpdate) {
	            var contentAttr = viewportelement.getAttribute('content');
	            // If it exists, we need to maintain old values and put our values.
	            if (contentAttr) {
	                var attrArray = contentAttr.split(',');
	                var finalContentMeta = "";
	                var oldAttrs = [];
	                for (var i = 0; i < attrArray.length; i++) {
	                    var isAttrToUpdate = false;
	                    var j = 0;
	                    while (!isAttrToUpdate && j < contentAttrsToUpdate.length) {
	                        if (attrArray[i].indexOf(contentAttrsToUpdate[j])) {
	                            isAttrToUpdate = true;
	                        }

	                        j++;
	                    }

	                    if (!isAttrToUpdate) {
	                        oldAttrs.push(attrArray[i]);
	                    }
	                }

	                for (var _i = 0; _i < contentAttrsToUpdate.length; _i++) {
	                    var attr = contentAttrsToUpdate[_i] + contentAttrsValuesToUpdate[_i];
	                    finalContentMeta += _i == 0 ? attr : ',' + attr;
	                }

	                for (var _i2 = 0; _i2 < oldAttrs.length; _i2++) {
	                    finalContentMeta += ',' + oldAttrs[_i2];
	                }

	                viewportelement.setAttribute('content', finalContentMeta);
	                viewportelement.setAttribute('content', contentAttr);
	            } else {
	                viewportelement.setAttribute('content', 'initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0');
	                viewportelement.removeAttribute('content');
	            }
	        };

	        if (!viewportmeta) {
	            viewportmeta = document.createElement('meta');
	            document.getElementsByTagName('head')[0].appendChild(viewportmeta);
	            setMetaAttrFunc(viewportmeta, contentAttrsToUpdate, contentAttrsValuesToUpdate);
	            viewportmeta.remove();
	        } else {
	            setMetaAttrFunc(viewportmeta, contentAttrsToUpdate, contentAttrsValuesToUpdate);
	        }
	    };

	    /**
	     * Adds an event to avoid touchscrolling.
	     * @ignore
	     */


	    ModalDialog.prototype.blockWebsiteScroll = function blockWebsiteScroll() {
	        document.body.addEventListener('touchmove', this.disableTouchMove, { passive: false });
	    };

	    /**
	     * Removes the event to avoid touchscrolling.
	     * @ignore
	     */


	    ModalDialog.prototype.unblockWebsiteScroll = function unblockWebsiteScroll() {
	        document.body.removeEventListener('touchmove', this.disableTouchMove, { passive: false });
	    };

	    /**
	     * Prevents the default event behaviour.
	     * @param {Object} ev javascript event.
	     * @ignore.
	     */


	    ModalDialog.prototype.disableTouchMove = function disableTouchMove(ev) {
	        ev.preventDefault();
	    };

	    /**
	     * Util function to kwnow if browser is internet explorer 11.
	     * @return {boolean} return true if browser is iexplorer v11 or false in others.
	     * @ignore
	     */


	    ModalDialog.prototype.isIE11 = function isIE11() {
	        if (navigator.userAgent.search("Msie/") >= 0 || navigator.userAgent.search("Trident/") >= 0 || navigator.userAgent.search("Edge/") >= 0) {
	            return true;
	        }
	        return false;
	    };

	    /**
	     * @param {string} actual language to check if it's rtl
	     * @return {boolean} return true if current language is type RTL
	     * @ignore
	     */


	    ModalDialog.prototype.isRTL = function isRTL() {
	        if (this.attributes.language == 'ar' || this.attributes.language == 'he') {
	            return true;
	        } else {
	            return this.rtl;
	        };
	    };

	    /**
	     * Adds a class to all modal DOM elements.
	     * @param {string} cls
	     * @ignore
	     */


	    ModalDialog.prototype.addClass = function addClass(cls) {
	        _util2.default.addClass(this.overlay, cls);
	        _util2.default.addClass(this.titleBar, cls);
	        _util2.default.addClass(this.overlay, cls);
	        _util2.default.addClass(this.container, cls);
	        _util2.default.addClass(this.contentContainer, cls);
	        _util2.default.addClass(this.stackDiv, cls);
	        _util2.default.addClass(this.minimizeDiv, cls);
	        _util2.default.addClass(this.maximizeDiv, cls);
	        _util2.default.addClass(this.wrapper, cls);
	    };

	    /**
	     * Remove a clas  from all modal DOM elements.
	     * @param {string} cls
	     * @ignore
	     */


	    ModalDialog.prototype.removeClass = function removeClass(cls) {
	        _util2.default.removeClass(this.overlay, cls);
	        _util2.default.removeClass(this.titleBar, cls);
	        _util2.default.removeClass(this.overlay, cls);
	        _util2.default.removeClass(this.container, cls);
	        _util2.default.removeClass(this.contentContainer, cls);
	        _util2.default.removeClass(this.stackDiv, cls);
	        _util2.default.removeClass(this.minimizeDiv, cls);
	        _util2.default.removeClass(this.maximizeDiv, cls);
	        _util2.default.removeClass(this.wrapper, cls);
	    };

	    /**
	     * Create modal dialog for desktop.
	     * @ignore
	     */


	    ModalDialog.prototype.createModalWindowDesktop = function createModalWindowDesktop() {
	        this.addClass('wrs_modal_desktop');
	        this.stack();
	    };

	    /**
	     * Create modal dialog for non mobile android devices.
	     * @ignore
	     */


	    ModalDialog.prototype.createModalWindowAndroid = function createModalWindowAndroid() {
	        this.addClass('wrs_modal_android');
	        window.addEventListener('resize', this.orientationChangeAndroidSoftkeyboard.bind(this));
	    };

	    /**
	     * Create modal dialog for iOS devices.
	     * @ignore
	     */


	    ModalDialog.prototype.createModalWindowIos = function createModalWindowIos() {
	        this.addClass('wrs_modal_ios');
	        // Refresh the size when the orientation is changed
	        window.addEventListener('resize', this.orientationChangeIosSoftkeyboard.bind(this));
	    };

	    /**
	     * Restore previous state, position and size of previous stacked modal window
	     * @ignore
	     */


	    ModalDialog.prototype.restoreState = function restoreState() {
	        if (this.properties.state == 'maximized') {
	            // Reseting states for prevent return to stack state.
	            this.maximize();
	        } else if (this.properties.state == 'minimized') {
	            // Reseting states for prevent return to stack state.
	            this.properties.state = this.properties.previousState;
	            this.properties.previousState = '';
	            this.minimize();
	        } else {
	            this.stack();
	        }
	    };

	    /**
	     * Stacks the modal object.
	     * @ignore
	     */


	    ModalDialog.prototype.stack = function stack() {
	        this.properties.previousState = this.properties.state;
	        this.properties.state = 'stack';
	        this.removeClass('wrs_maximized');
	        this.minimizeDiv.title = "Minimise";
	        this.removeClass('wrs_minimized');
	        this.addClass('wrs_stack');

	        this.restoreModalProperties();

	        if (typeof this.resizerBR !== 'undefined' && typeof this.resizerTL !== 'undefined') {
	            this.setResizeButtonsVisibility();
	        }

	        // Need recalculate position of actual modal because window can was changed in fullscreenmode
	        this.recalculateScrollBar();
	        this.recalculatePosition();
	        this.recalculateScale();
	        this.focus();
	    };

	    /**
	     * Minimizes the modal object
	     * @ignore
	     */


	    ModalDialog.prototype.minimize = function minimize() {
	        // Saving width, height, top and bottom parameters to restore when open
	        this.saveModalProperties();
	        if (this.properties.state == 'minimized' && this.properties.previousState == 'stack') {
	            this.stack();
	        } else if (this.properties.state == 'minimized' && this.properties.previousState == 'maximized') {
	            this.maximize();
	        } else {
	            // Setting css to prevent important tag into css style
	            this.container.style.height = "30px";
	            this.container.style.width = "250px";
	            this.container.style.bottom = "0px";
	            this.container.style.right = "10px";

	            this.removeListeners();
	            this.properties.previousState = this.properties.state;
	            this.properties.state = "minimized";
	            this.setResizeButtonsVisibility();
	            this.minimizeDiv.title = "Maximise";

	            if (_util2.default.containsClass(this.overlay, 'wrs_stack')) {
	                this.removeClass('wrs_stack');
	            } else {
	                this.removeClass('wrs_maximized');
	            }
	            this.addClass('wrs_minimized');
	        }
	    };

	    /**
	     * Maximizes the modal object.
	     * @ignore
	     */


	    ModalDialog.prototype.maximize = function maximize() {
	        // Saving width, height, top and bottom parameters to restore when open
	        this.saveModalProperties();
	        if (this.properties.state != 'maximized') {
	            this.properties.previousState = this.properties.state;
	            this.properties.state = 'maximized';
	        }
	        // Don't permit resize on maximize mode.
	        this.setResizeButtonsVisibility();

	        if (_util2.default.containsClass(this.overlay, 'wrs_minimized')) {
	            this.minimizeDiv.title = "Minimise";
	            this.removeClass('wrs_minimized');
	        } else if (_util2.default.containsClass(this.overlay, 'wrs_stack')) {
	            this.container.style.left = null;
	            this.container.style.top = null;
	            this.removeClass('wrs_stack');
	        }

	        this.addClass('wrs_maximized');

	        // Set size to 80% screen with a max size.
	        this.setSize(parseInt(window.innerHeight * 0.8), parseInt(window.innerWidth * 0.8));
	        var sizeModificated = false;
	        if (this.container.clientHeight > 700) {
	            this.container.style.height = '700px';
	            sizeModificated = true;
	        }
	        if (this.container.clientWidth > 1200) {
	            this.container.style.width = '1200px';
	            sizeModificated = true;
	        }

	        // Setting modal position in center on screen.
	        this.setPosition(window.innerHeight / 2 - this.container.offsetHeight / 2, window.innerWidth / 2 - this.container.offsetWidth / 2);
	        this.recalculateScale();
	        this.recalculatePosition();
	        this.recalculateSize();
	        this.focus();
	    };

	    /**
	     * Sets modal size.
	     * @param  {integer} height set a height of modal with an integer
	     * @param  {integer} width set a width of modal with an integer
	     * @ignore
	     */


	    ModalDialog.prototype.setSize = function setSize(height, width) {
	        this.container.style.height = height + 'px';
	        this.container.style.width = width + 'px';
	        this.recalculateSize();
	    };

	    /**
	     * Sets modal position.
	     * @param  {integer} bottom set a bottom of div modal with an integer
	     * @param  {integer} right set a right of div modal with an integer
	     * @ignore
	     */


	    ModalDialog.prototype.setPosition = function setPosition(bottom, right) {
	        this.container.style.bottom = bottom + 'px';
	        this.container.style.right = right + 'px';
	    };

	    /**
	     * Saves actual parameters of open modal object (like size and position...) to restore it
	     * once the modal object is re-opened.
	     * @ignore
	     */


	    ModalDialog.prototype.saveModalProperties = function saveModalProperties() {
	        // Saving values of modal only when modal is in stack state.
	        if (this.properties.state == 'stack') {
	            this.properties.position.bottom = parseInt(this.container.style.bottom);
	            this.properties.position.right = parseInt(this.container.style.right);
	            this.properties.size.width = parseInt(this.container.style.width);
	            this.properties.size.height = parseInt(this.container.style.height);
	        }
	    };

	    /**
	     * Restore previous parameters values of closed modal (like size and position) and apply this parameters in actual modal.
	     * @ignore
	     */


	    ModalDialog.prototype.restoreModalProperties = function restoreModalProperties() {
	        if (this.properties.state == 'stack') {
	            // Restoring Bottom and Right values from last modal
	            this.setPosition(this.properties.position.bottom, this.properties.position.right);
	            // Restoring Height and Left values from last modal
	            this.setSize(this.properties.size.height, this.properties.size.width);
	        }
	    };

	    /**
	     * Set modal size.
	     * @ignore
	     */


	    ModalDialog.prototype.recalculateSize = function recalculateSize() {
	        this.wrapper.style.width = this.container.clientWidth - 12 + 'px';
	        this.wrapper.style.height = this.container.clientHeight - 38 + 'px';
	        this.contentContainer.style.height = parseInt(this.wrapper.offsetHeight - 50) + 'px';
	    };

	    /**
	     * Active and disable visibility of resize buttons in modal window depend on state.
	     * @ignore
	     */


	    ModalDialog.prototype.setResizeButtonsVisibility = function setResizeButtonsVisibility() {
	        if (this.properties.state == 'stack') {
	            this.resizerTL.style.visibility = 'visible';
	            this.resizerBR.style.visibility = 'visible';
	        } else {
	            this.resizerTL.style.visibility = 'hidden';
	            this.resizerBR.style.visibility = 'hidden';
	        }
	    };

	    /**
	     * Makes an object draggable adding mouse and touch events.
	     * @ignore
	     */


	    ModalDialog.prototype.addListeners = function addListeners() {
	        // Button events (maximize, minimize, stack and close).
	        this.maximizeDiv.addEventListener('click', this.maximize.bind(this), true);
	        this.stackDiv.addEventListener('click', this.stack.bind(this), true);
	        this.minimizeDiv.addEventListener('click', this.minimize.bind(this), true);
	        this.closeDiv.addEventListener('click', this.cancelAction.bind(this));

	        // Mouse events.
	        _util2.default.addEvent(window, 'mousedown', this.startDrag.bind(this));
	        _util2.default.addEvent(window, 'mouseup', this.stopDrag.bind(this));
	        _util2.default.addEvent(window, 'mousemove', this.drag.bind(this));
	        _util2.default.addEvent(window, 'resize', this.onWindowResize.bind(this));
	        // Key events.
	        _util2.default.addEvent(window, 'keydown', this.onKeyDown.bind(this));
	    };

	    /**
	     * Removes draggable events from an object.
	     * @ignore
	     */


	    ModalDialog.prototype.removeListeners = function removeListeners() {
	        // Mouse events.
	        _util2.default.removeEvent(window, 'mousedown', this.startDrag);
	        _util2.default.removeEvent(window, 'mouseup', this.stopDrag);
	        _util2.default.removeEvent(window, 'mousemove', this.drag);
	        _util2.default.removeEvent(window, 'resize', this.onWindowResize);
	        // Key events
	        _util2.default.removeEvent(window, 'keydown', this.onKeyDown);
	    };

	    /**
	     * Returns mouse or touch coordinates (on touch events ev.ClientX doesn't exists)
	     * @param {event} ev mouse or touch event
	     * @return {object} with the X and Y coordinates.
	     * @ignore
	     */


	    ModalDialog.prototype.eventClient = function eventClient(ev) {
	        if (typeof ev.clientX == 'undefined' && ev.changedTouches) {
	            var client = {
	                X: ev.changedTouches[0].clientX,
	                Y: ev.changedTouches[0].clientY
	            };
	            return client;
	        } else {
	            client = {
	                X: ev.clientX,
	                Y: ev.clientY
	            };
	            return client;
	        }
	    };

	    /**
	     * Start drag function: set the object dragDataObject with the draggable object offsets coordinates.
	     * when drag starts (on touchstart or mousedown events).
	     *
	     * @param {event} ev touchstart or mousedown event.
	     * @ignore
	     */


	    ModalDialog.prototype.startDrag = function startDrag(ev) {
	        if (this.properties.state == 'minimized') {
	            return;
	        }
	        if (ev.target.className == 'wrs_modal_title') {
	            if (typeof this.dragDataObject === 'undefined' || this.dragDataObject === null) {
	                ev = ev || event;
	                // Save first click mouse point on screen
	                this.dragDataObject = {
	                    x: this.eventClient(ev).X,
	                    y: this.eventClient(ev).Y
	                };
	                // Reset last drag position when start drag
	                this.lastDrag = {
	                    x: "0px",
	                    y: "0px"
	                };
	                // Init right and bottom values for window modal if it isn't exist.
	                if (this.container.style.right == '') {
	                    this.container.style.right = "0px";
	                }
	                if (this.container.style.bottom == '') {
	                    this.container.style.bottom = "0px";
	                }

	                // Needed for IE11 for apply disabled mouse events on editor because iexplorer need a dinamic object to apply this property.
	                if (this.isIE11()) {}
	                // this.iframe.style['position'] = 'relative';

	                // Apply class for disable involuntary select text when drag.
	                _util2.default.addClass(document.body, 'wrs_noselect');
	                _util2.default.addClass(this.overlay, 'wrs_overlay_active');
	                // Obtain screen limits for prevent overflow.
	                this.limitWindow = this.getLimitWindow();
	            }
	        }
	    };

	    /**
	     * UpdatesdragDataObject with the draggable object coordinates when the draggable object is being moved.
	     *
	     * @param {event} ev touchmouve or mousemove events.
	     * @ignore
	     */


	    ModalDialog.prototype.drag = function drag(ev) {
	        if (this.dragDataObject) {
	            ev.preventDefault();
	            ev = ev || event;
	            // Calculate max and min between actual mouse position and limit of screeen. It restric the movement of modal into window.
	            var limitY = Math.min(this.eventClient(ev).Y, this.limitWindow.minPointer.y);
	            limitY = Math.max(this.limitWindow.maxPointer.y, limitY);
	            var limitX = Math.min(this.eventClient(ev).X, this.limitWindow.minPointer.x);
	            limitX = Math.max(this.limitWindow.maxPointer.x, limitX);
	            // Substract limit with first position to obtain relative pixels increment to the anchor point.
	            var dragX = limitX - this.dragDataObject.x + "px";
	            var dragY = limitY - this.dragDataObject.y + "px";
	            // Save last valid position of modal before window overflow.
	            this.lastDrag = {
	                x: dragX,
	                y: dragY
	            };
	            // This move modal with hadware acceleration.
	            this.container.style.transform = "translate3d(" + dragX + "," + dragY + ",0)";
	        }
	        if (this.resizeDataObject) {
	            var limitX = Math.min(this.eventClient(ev).X, window.innerWidth - this.scrollbarWidth - 7);
	            var limitY = Math.min(this.eventClient(ev).Y, window.innerHeight - 7);
	            if (limitX < 0) {
	                limitX = 0;
	            }

	            if (limitY < 0) {
	                limitY = 0;
	            }

	            var scaleMultiplier;
	            if (this.leftScale) {
	                scaleMultiplier = -1;
	            } else {
	                scaleMultiplier = 1;
	            }
	            this.container.style.width = this.initialWidth + scaleMultiplier * (limitX - this.resizeDataObject.x) + 'px';
	            this.container.style.height = this.initialHeight + scaleMultiplier * (limitY - this.resizeDataObject.y) + 'px';
	            if (!this.leftScale) {
	                if (this.resizeDataObject.x - limitX - this.initialWidth < -580) {
	                    this.container.style.right = this.initialRight - (limitX - this.resizeDataObject.x) + 'px';
	                } else {
	                    this.container.style.right = this.initialRight + this.initialWidth - 580 + "px";
	                    this.container.style.width = "580px";
	                }
	                if (this.resizeDataObject.y - limitY < this.initialHeight - 338) {
	                    this.container.style.bottom = this.initialBottom - (limitY - this.resizeDataObject.y) + 'px';
	                } else {
	                    this.container.style.bottom = this.initialBottom + this.initialHeight - 338 + "px";
	                    this.container.style.height = "338px";
	                }
	            }
	            this.recalculateScale();
	            this.recalculatePosition();
	        }
	    };
	    /**
	     * Get limits of actual window to limit modal movement
	     * @return {Object} Object containing mouseX and mouseY are coordinates of actual mouse on screen.
	     * @ignore
	     */


	    ModalDialog.prototype.getLimitWindow = function getLimitWindow() {
	        // Obtain dimentions of window page.
	        var maxWidth = window.innerWidth;
	        var maxHeight = window.innerHeight;

	        // Calculate relative position of mouse point into window.
	        var offSetToolbarY = this.container.offsetHeight + parseInt(this.container.style.bottom) - (maxHeight - (this.dragDataObject.y - window.pageXOffset));
	        var offSetToolbarX = maxWidth - this.scrollbarWidth - (this.dragDataObject.x - window.pageXOffset) - parseInt(this.container.style.right);

	        // Calculate limits with sizes of window, modal and mouse position.
	        var minPointerY = maxHeight - this.container.offsetHeight + offSetToolbarY;
	        var maxPointerY = this.title.offsetHeight - (this.title.offsetHeight - offSetToolbarY);
	        var minPointerX = maxWidth - offSetToolbarX - this.scrollbarWidth;
	        var maxPointerX = this.container.offsetWidth - offSetToolbarX;
	        var minPointer = { x: minPointerX, y: minPointerY };
	        var maxPointer = { x: maxPointerX, y: maxPointerY };
	        return { minPointer: minPointer, maxPointer: maxPointer };
	    };
	    /**
	     * Get Scrollbar width size of browser
	     * @ignore
	     */


	    ModalDialog.prototype.getScrollBarWidth = function getScrollBarWidth() {
	        // Create a paragraph with full width of page.
	        var inner = document.createElement('p');
	        inner.style.width = "100%";
	        inner.style.height = "200px";

	        // Create a hidden div to compare sizes.
	        var outer = document.createElement('div');
	        outer.style.position = "absolute";
	        outer.style.top = "0px";
	        outer.style.left = "0px";
	        outer.style.visibility = "hidden";
	        outer.style.width = "200px";
	        outer.style.height = "150px";
	        outer.style.overflow = "hidden";
	        outer.appendChild(inner);

	        document.body.appendChild(outer);
	        var widthOuter = inner.offsetWidth;

	        // Change type overflow of paragraph for measure scrollbar.
	        outer.style.overflow = 'scroll';
	        var widthInner = inner.offsetWidth;

	        // If measure is the same, we compare with internal div.
	        if (widthOuter == widthInner) {
	            widthInner = outer.clientWidth;
	        }
	        document.body.removeChild(outer);

	        return widthOuter - widthInner;
	    };

	    /**
	     * Set the dragDataObject to null when the drag finish (touchend or mouseup events).
	     *
	     * @param {event} ev touchend or mouseup event.
	     * @ignore
	     */


	    ModalDialog.prototype.stopDrag = function stopDrag(ev) {
	        // Due to we have multiple events that call this function, we need only to execute the next modifiers one time,
	        // when the user stops to drag and dragDataObject is not null (the object to drag is attached).
	        if (this.dragDataObject || this.resizeDataObject) {
	            // If modal doesn't change, it's not necessary to set position with interpolation
	            this.container.style.transform = '';
	            if (this.dragDataObject) {
	                this.container.style.right = parseInt(this.container.style.right) - parseInt(this.lastDrag.x) + "px";
	                this.container.style.bottom = parseInt(this.container.style.bottom) - parseInt(this.lastDrag.y) + "px";
	            }
	            // We make focus on editor after drag modal windows to prevent lose focus.
	            this.focus();
	            // Restore mouse events on iframe
	            // this.iframe.style['pointer-events'] = 'auto';
	            document.body.style['user-select'] = '';
	            // Restore static state of iframe if we use iexplorer
	            if (this.isIE11()) {}
	            // this.iframe.style['position'] = null;

	            // Active text select event
	            _util2.default.removeClass(document.body, 'wrs_noselect');
	            _util2.default.removeClass(this.overlay, 'wrs_overlay_active');
	        }
	        this.dragDataObject = null;
	        this.resizeDataObject = null;
	        this.initialWidth = null;
	        this.leftScale = null;
	    };

	    /**
	     * Recalculating scale for modal when resize browser window *
	     * @ignore
	     */


	    ModalDialog.prototype.onWindowResize = function onWindowResize() {
	        this.recalculateScrollBar();
	        this.recalculatePosition();
	        this.recalculateScale();
	    };

	    /**
	     * Keydown events:
	     * Esc key close modal window.
	     * Tab key tab to submit button.
	     * @param {event} ev
	     */


	    ModalDialog.prototype.onKeyDown = function onKeyDown(ev) {
	        if (ev.key !== undefined && ev.repeat === false) {
	            // Code for detect Esc event
	            if (ev.key === "Escape" || ev.key === 'Esc') {
	                if (this.properties.open) {
	                    this.cancelAction();
	                }
	            }
	            // Code for detect Tab event
	            if (ev.key === "Tab") {
	                this.submitButton.focus();
	                ev.preventDefault();
	            }
	        }
	    };
	    /**
	     * Recalculating position for modal when resize browser window
	     * @ignore
	     */


	    ModalDialog.prototype.recalculatePosition = function recalculatePosition() {
	        this.container.style.right = Math.min(parseInt(this.container.style.right), window.innerWidth - this.scrollbarWidth - this.container.offsetWidth) + "px";
	        if (parseInt(this.container.style.right) < 0) {
	            this.container.style.right = "0px";
	        }
	        this.container.style.bottom = Math.min(parseInt(this.container.style.bottom), window.innerHeight - this.container.offsetHeight) + "px";
	        if (parseInt(this.container.style.bottom) < 0) {
	            this.container.style.bottom = "0px";
	        }
	    };

	    /**
	     * Recalculating scale for modal when resize browser window
	     * @ignore
	     */


	    ModalDialog.prototype.recalculateScale = function recalculateScale() {
	        var sizeModificated = false;
	        if (parseInt(this.container.style.width) > 580) {
	            this.container.style.width = Math.min(parseInt(this.container.style.width), window.innerWidth - this.scrollbarWidth) + "px";
	            sizeModificated = true;
	        } else {
	            this.container.style.width = "580px";
	            sizeModificated = true;
	        }
	        if (parseInt(this.container.style.height) > 338) {
	            this.container.style.height = Math.min(parseInt(this.container.style.height), window.innerHeight) + "px";
	            sizeModificated = true;
	        } else {
	            this.container.style.height = "338px";
	            sizeModificated = true;
	        }
	        if (sizeModificated) {
	            this.recalculateSize();
	        }
	    };

	    /**
	     * Recalculating width of scrollBar browser
	     * @ignore
	     */


	    ModalDialog.prototype.recalculateScrollBar = function recalculateScrollBar() {
	        this.hasScrollBar = window.innerWidth > document.documentElement.clientWidth;
	        if (this.hasScrollBar) {
	            this.scrollbarWidth = this.getScrollBarWidth();
	        } else {
	            this.scrollbarWidth = 0;
	        }
	    };

	    /**
	     * Hide soft keyboards on IOS systems.
	     * @ignore
	     */


	    ModalDialog.prototype.hideKeyboard = function hideKeyboard() {
	        document.activeElement.blur();
	    };

	    /**
	     * Focus to content object
	     * @ignore
	     */


	    ModalDialog.prototype.focus = function focus() {
	        if (this.contentManager != null && typeof this.contentManager.onFocus !== 'undefined') {
	            this.contentManager.onFocus();
	        }
	    };

	    /**
	     * Returns true when the device is on portrait mode.
	     * @ignore
	     */


	    ModalDialog.prototype.portraitMode = function portraitMode() {
	        return window.innerHeight > window.innerWidth;
	    };

	    /**
	     * Change container sizes when the keyboard is opened on iOS.
	     * @ignore
	     */


	    ModalDialog.prototype.openedIosSoftkeyboard = function openedIosSoftkeyboard() {
	        if (!this.iosSoftkeyboardOpened && this.iosDivHeight != null && this.iosDivHeight == "100" + this.iosMeasureUnit) {
	            if (this.portraitMode()) {
	                this.setContainerHeight("63" + this.iosMeasureUnit);
	            } else {
	                this.setContainerHeight("40" + this.iosMeasureUnit);
	            }
	        }
	        this.iosSoftkeyboardOpened = true;
	    };

	    /**
	     * Change container sizes when the keyboard is closed on iOS.
	     * @ignore
	     */


	    ModalDialog.prototype.closedIosSoftkeyboard = function closedIosSoftkeyboard() {
	        this.iosSoftkeyboardOpened = false;
	        this.setContainerHeight("100" + this.iosMeasureUnit);
	    };

	    /**
	     * Change container sizes when orientation is changed on iOS.
	     * @ignore
	     */


	    ModalDialog.prototype.orientationChangeIosSoftkeyboard = function orientationChangeIosSoftkeyboard() {
	        if (this.iosSoftkeyboardOpened) {
	            if (this.portraitMode()) {
	                this.setContainerHeight("63" + this.iosMeasureUnit);
	            } else {
	                this.setContainerHeight("40" + this.iosMeasureUnit);
	            }
	        } else {
	            this.setContainerHeight("100" + this.iosMeasureUnit);
	        }
	    };

	    /**
	     * Change container sizes when orientation is changed on Android.
	     * @ignore
	     */


	    ModalDialog.prototype.orientationChangeAndroidSoftkeyboard = function orientationChangeAndroidSoftkeyboard() {
	        this.setContainerHeight("100%");
	    };

	    /**
	     * Set iframe container height.
	     * @ignore
	     */


	    ModalDialog.prototype.setContainerHeight = function setContainerHeight(height) {
	        this.iosDivHeight = height;
	        this.wrapper.style.height = height;
	        // this.editor.getElement().style.height = (this.container.offsetHeight -10) - this.controlsDiv.offsetHeight + 'px';
	    };

	    /**
	     * Check content of editor before close action
	     * @ignore
	     */


	    ModalDialog.prototype.showPopUpMessage = function showPopUpMessage() {
	        if (this.properties.state == 'minimized') {
	            this.stack();
	        }
	        this.popup.show();
	    };

	    ModalDialog.prototype.setTitle = function setTitle(title) {
	        this.title.innerHTML = title;
	    };

	    return ModalDialog;
	}();

	exports.default = ModalDialog;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This class shows a dialog message overlaying a dom element in order to
	 * accept / cancel discard changes. The dialog can be closed i.e the overlay disapepars
	 * o canceled. In this last case a callback function should be called.
	 *
	 * The constructor accepts the following attributes object:
	 * {
	 *  overlayElement: '', Element to be overlayed.
	 *  callbacks: {
	 *             'closeCallback' : function(),  // Callback function to be called if the dialog is closed.
	 *             'cancelCallback' : function() // Callback function to be called if the dialog is cancelled
	 *  strings: {
	 *          'submitString' : '', // Submit button string
	 *          'cancelString : ''.  // Cancel button string
	 *          'message': ''        // Message string
	 *          }
	 * }
	 * @param {object} popupProperties
	 */
	var PopUpMessage = function () {
	    function PopUpMessage(popupProperties) {
	        _classCallCheck(this, PopUpMessage);

	        this.overlay = popupProperties.overlayElement;
	        this.callbacks = popupProperties.callbacks;
	        this.overlayEnvolture = this.overlay.appendChild(document.createElement("div"));
	        this.overlayEnvolture.setAttribute("class", "wrs_popupmessage_overlay_envolture");

	        this.message = this.overlayEnvolture.appendChild(document.createElement("div"));
	        this.message.id = "wrs_popupmessage";
	        this.message.setAttribute("class", "wrs_popupmessage_panel");
	        this.message.innerHTML = popupProperties.strings.message;

	        var overlay = this.overlayEnvolture.appendChild(document.createElement("div"));
	        overlay.setAttribute("class", "wrs_popupmessage_overlay");
	        // We create a overlay that close popup message on click in there
	        overlay.addEventListener("click", this.cancelAction.bind(this));

	        this.buttonArea = this.message.appendChild(document.createElement('div'));
	        this.buttonArea.setAttribute("class", "wrs_popupmessage_button_area");
	        this.buttonArea.id = 'wrs_popup_button_area';

	        // Buttons creation
	        var buttonSubmitArguments = {
	            class: "wrs_button_accept",
	            innerHTML: popupProperties.strings.submitString,
	            id: 'wrs_popup_accept_button'
	        };
	        this.acceptButton = this.createButton(buttonSubmitArguments, this.closeAction.bind(this));
	        this.buttonArea.appendChild(this.acceptButton);

	        var buttonCancelArguments = {
	            class: "wrs_button_cancel",
	            innerHTML: popupProperties.strings.cancelString,
	            id: 'wrs_popup_cancel_button'
	        };
	        this.cancelButton = this.createButton(buttonCancelArguments, this.cancelAction.bind(this));
	        this.buttonArea.appendChild(this.cancelButton);
	    }

	    /**
	     * This method create a button with arguments and return button dom object
	     * @param {object} parameters An object containg id, class and innerHTML button text.
	     * @param {object} callback Callback method to call on click event.
	     */


	    PopUpMessage.prototype.createButton = function createButton(parameters, callback) {
	        function popUpButton(parameters) {
	            this.element = document.createElement("button");
	            this.element.setAttribute("id", parameters.id);
	            this.element.setAttribute("class", parameters.class);
	            this.element.innerHTML = parameters.innerHTML;
	            this.element.addEventListener("click", callback);
	        }

	        popUpButton.prototype.getElement = function () {
	            return this.element;
	        };

	        return new popUpButton(parameters).getElement();
	    };

	    /**
	     * This method show the popupmessage containing a message, and two buttons
	     * to cancel the action or close the modal dialog.
	     */


	    PopUpMessage.prototype.show = function show() {
	        if (this.overlayEnvolture.style.display != 'block') {
	            // Clear focus with blur for prevent press anykey
	            document.activeElement.blur();

	            // For works with Safari
	            window.focus();
	            this.overlayEnvolture.style.display = 'block';
	        } else {
	            this.overlayEnvolture.style.display = 'none';
	            _wrs_modalWindow.focus();
	        }
	    };

	    /**
	     * This method cancel the popupMessage: the dialog dissapears revealing the overlaid element.
	     * A callback method is called (if defined). For example a method to focus the overlaid element.
	     */


	    PopUpMessage.prototype.cancelAction = function cancelAction() {
	        this.overlayEnvolture.style.display = 'none';
	        if (typeof this.callbacks.cancelCallback !== 'undefined') {
	            this.callbacks.cancelCallback();
	        }
	    };

	    /**
	     * This method closes the popupMessage: the dialog dissapears and the close callback is called.
	     * For example to close the overlaid element.
	     */


	    PopUpMessage.prototype.closeAction = function closeAction() {
	        this.cancelAction();
	        if (typeof this.callbacks.closeCallback !== 'undefined') {
	            this.callbacks.closeCallback();
	        }
	    };

	    return PopUpMessage;
	}();

	exports.default = PopUpMessage;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This class manages MathType custom editors. A custom editor is an editor which is a MathType editor with a different
	 * toolbar. This class is necessary to associate a custom editor to:
	 * - It's own formulas
	 * - A custom toolbar
	 * - An icon to open it from a HTML editor.
	 * - A tooltip for the icon.
	 * - A global variable to enable or disable it globally.
	 */
	var CustomEditors = function () {
	    function CustomEditors() {
	        _classCallCheck(this, CustomEditors);

	        this.editors = {};
	        this.activeEditor = 'default';
	    }

	    /**
	     * Add a custom editor to editors property.
	     * A custom editor is an object with the following parameters:
	     * - name
	     * - toolbar
	     * - icon
	     * - confVariable
	     * - title
	     * - tooltip
	     * @param {string} editorName - editorName
	     * @param {object} editorParams  - custom editor params
	     */


	    CustomEditors.prototype.addEditor = function addEditor(editorName, editorParams) {
	        var customEditor = {};
	        customEditor.name = editorParams.name;
	        customEditor.toolbar = editorParams.toolbar;
	        customEditor.icon = editorParams.icon;
	        customEditor.confVariable = editorParams.confVariable;
	        customEditor.title = editorParams.title;
	        customEditor.tooltip = editorParams.tooltip;
	        this.editors[editorName] = customEditor;
	    };

	    /**
	     * Adds to Core instance a new custom editor.
	     * @param {string} key - editor key (usually toolbar name)
	     * @param {CustomEditor} customEditor - a custom editor class.
	     */


	    CustomEditors.prototype.add = function add(key, customEditor) {
	        this.customEditors[key] = customEditor;
	    };

	    /**
	     * Set active a customEditor.
	     * @param {string} customEditor - customEditor key.
	     */


	    CustomEditors.prototype.enable = function enable(customEditor) {
	        this.activeEditor = customEditor;
	    };

	    /**
	     * Disable a custom editor.
	     */


	    CustomEditors.prototype.disable = function disable() {
	        this.activeEditor = 'default';
	    };

	    /**
	     * Returns the active editor key.
	     * @return {object} - If a custom editor is enabled, returns the custom editor object. Null otherwise.
	     */


	    CustomEditors.prototype.getActiveEditor = function getActiveEditor() {
	        if (this.activeEditor != 'default') {
	            return this.editors[this.activeEditor];
	        } else {
	            return null;
	        }
	    };

	    return CustomEditors;
	}();

	exports.default = CustomEditors;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Represents the configuration properties generated from the frontend (JavaScript variables).
	 * @property {_wrs_conf_imageClassName} Default MathType formula image class.
	 * @property {_wrs_conf_CASClassName} Default MathType CAS image class.
	 */
	var jsProperties = {
	  _wrs_conf_imageClassName: 'Wirisformula',
	  _wrs_conf_CASClassName: 'Wiriscas'
	};
	exports.default = jsProperties;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This class represents a custom event.
	 */
	var Event = function () {
	    /**
	     * Class constructor.
	     */
	    function Event() {
	        _classCallCheck(this, Event);

	        this.cancelled = false;
	        this.defaultPrevented = false;
	    }

	    /**
	     * Cancel the event.
	     */


	    Event.prototype.cancel = function cancel() {
	        this.cancelled = true;
	    };

	    /**
	     * Prevents the default action
	     */


	    Event.prototype.preventDefault = function preventDefault() {
	        this.defaultPrevented = true;
	    };

	    return Event;
	}();

	exports.default = Event;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _coreSrc = __webpack_require__(1);

	var _coreSrc2 = _interopRequireDefault(_coreSrc);

	var _image = __webpack_require__(9);

	var _image2 = _interopRequireDefault(_image);

	var _listeners = __webpack_require__(14);

	var _listeners2 = _interopRequireDefault(_listeners);

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This class represents an integration model. This class allows the integration script to
	 * communicate with Core class. Each integration must extend this class.
	 */
	var IntegrationModel = function () {
	    function IntegrationModel(integrationModelProperties) {
	        _classCallCheck(this, IntegrationModel);

	        /**
	         * Language. Needed for accessibility and locales. English by default.
	         * @type {string} language - 'en' by default.
	         */
	        this.language = 'en';
	        /**
	         * Configuration service. Core needs this service as entry point to load all
	         * service paths. Mandatory property.
	         * @type {string} configurationService - configuration service path.
	         */
	        this.configurationService = '';
	        if ('configurationService' in integrationModelProperties) {
	            this.configurationService = integrationModelProperties.configurationService;
	        } else {
	            throw new Error('IntegrationModel constructor error: configurationService property missed.');
	        }
	        /**
	         * Plugin version. Needed to stats and lazy caching.
	         * @type {string} version - plugin version.
	         */
	        this.version = 'version' in integrationModelProperties ? integrationModelProperties.version : '';
	        /**
	         * DOM target in which the plugin should work to associate
	         * events, insert formulas etc. Mandatory property.
	         * @type {Object} target - plugin DOM target.
	         */

	        if ('target' in integrationModelProperties) {
	            this.target = integrationModelProperties.target;
	        } else {
	            throw new Error('IntegrationModel constructor error: target property missed.');
	        }
	        /**
	         * Integration script name. Needed to know the plugin path.
	         * @type {string} script
	         */
	        if ('scriptName' in integrationModelProperties) {
	            this.scriptName = integrationModelProperties.scriptName;
	        } else {
	            throw new Error('IntegrationModel constructor error: scriptName property missed.');
	        }
	        /**
	         * Object containing the arguments needed by the callback function.
	         * @type {object} callbackMethodArguments
	         */
	        this.callbackMethodArguments = {};
	        if ('callbackMethodArguments' in integrationModelProperties) {
	            this.callbackMethodArguments = integrationModelProperties.callbackMethodArguments;
	        }
	        /**
	         * Contains information about the integration environment: like the name of the editor, the version, etc.
	         * @type {object}
	         * @property {string} editor - Name of the HTML editor.
	         */
	        this.environment = {};
	        if ('environment' in integrationModelProperties) {
	            this.environment = integrationModelProperties.environment;
	        }
	        /**
	         * Language folder path. 'lang' by default.
	         * @type {string}
	         */
	        this.langFolderName = 'lang';
	        if ('langFolderName' in integrationModelProperties) {
	            this.langFolderName = integrationModelProperties.langFolderName;
	        }
	        /**
	         * Indicates if the DOM target is - or not - and iframe.
	         * @type {boolean} isIframe
	         */
	        this.isIframe = false;
	        if (this.target != null) {
	            this.isIframe = this.target.tagName.toUpperCase() === 'IFRAME';
	        }
	        /**
	         * Instance of the integration editor object.
	         * @type {object}
	         */
	        this.editorObject = null;
	        if ('editorObject' in integrationModelProperties) {
	            this.editorObject = integrationModelProperties.editorObject;
	        }
	        /**
	         * Specifies if the direction of the text is RTL. false by default.
	         * @type {bool}
	         */
	        this.rtl = false;
	        if ('rtl' in integrationModelProperties) {
	            this.rtl = integrationModelProperties.rtl;
	        }
	        /**
	         * Indicates if an image is selected. Needed to resize the image to the original size in case
	         * the image is resized.
	         * @type {object} temporalImageResizing - selected image.
	         */
	        this.temporalImageResizing = null;
	        /**
	         * Core instance. The Core class instance associated to the integration model.
	         * @type {Core} core - core instance.
	         */
	        this.core = null;

	        /**
	         * Integration model listeners.
	         * @type {Listeners}
	         */
	        this.listeners = new _listeners2.default();
	    }

	    /**
	     * Init function. Usually this method is called from the integration side once the core.js file is loaded.
	     * Is strongly recommended call this method by listening onload event when core.js is loaded.
	     */


	    IntegrationModel.prototype.init = function init() {
	        this.language = this.getLanguage();
	        // We need to wait until Core class is loaded ('onLoad' event) before
	        // call the callback method.
	        var listener = _listeners2.default.newListener('onLoad', function () {
	            this.callbackFunction(this.callbackMethodArguments);
	        }.bind(this));

	        this.setCore(new _coreSrc2.default());
	        this.core.addListener(listener);
	        this.core.language = this.language;

	        // Initializing Core class.
	        this.core.init(this.configurationService);
	        this.core.setEnvironment(this.environment);
	    };

	    /**
	     * Get absolute path of the integration script.
	     * @return {string} - Absolute path for the integration script.
	     */


	    IntegrationModel.prototype.getPath = function getPath() {
	        var col = document.getElementsByTagName("script");
	        var path = '';
	        for (var i = 0; i < col.length; i++) {
	            var j = col[i].src.lastIndexOf(this.scriptName);
	            if (j >= 0) {
	                path = col[i].src.substr(0, j - 1);
	            }
	        }
	        return path;
	    };

	    /**
	     * Sets language property.
	     * @param {string} language
	     */


	    IntegrationModel.prototype.setLanguage = function setLanguage(language) {
	        this.language = language;
	    };

	    /**
	     * Sets Core instance.
	     * @param {Core} core - instance of Core class.
	     */


	    IntegrationModel.prototype.setCore = function setCore(core) {
	        this.core = core;
	        core.setIntegrationModel(this);
	    };

	    /**
	     * Gets Core instance.
	     * @returns {Core} core - instance of Core class.
	     */


	    IntegrationModel.prototype.getCore = function getCore() {
	        return this.core;
	    };

	    /**
	     * Sets the object target. Updates, if necessary,  isIframe property.
	     * @param {object} target  - target object.
	     */


	    IntegrationModel.prototype.setTarget = function setTarget(target) {
	        this.target = target;
	        this.isIframe = this.target.tagName.toUpperCase() === 'IFRAME';
	    };

	    /**
	     * Sets the editor object.
	     * @param {object} editorObject - The editor object.
	     */


	    IntegrationModel.prototype.setEditorObject = function setEditorObject(editorObject) {
	        this.editorObject = editorObject;
	    };

	    /**
	     * Opens formula editor to editing a new formula. Can be overwritten in order to make some
	     * actions from integration part before the formula is edited.
	     */


	    IntegrationModel.prototype.openNewFormulaEditor = function openNewFormulaEditor() {
	        this.core.editionProperties.isNewElement = true;
	        this.core.openModalDialog(this.language, this.target, this.isIframe);
	    };

	    /**
	     * Opens formula editor to editing an existing formula. Can be overwritten in order to make some
	     * actions from integration part before the formula is edited.
	     */


	    IntegrationModel.prototype.openExistingFormulaEditor = function openExistingFormulaEditor() {
	        this.core.editionProperties.isNewElement = false;
	        this.core.openModalDialog(this.language, this.target, this.isIframe);
	    };

	    /**
	     * Inserts a new formula or updates an existing one inserting it in the DOM target. Can be overwritten in order
	     * from the integration side.
	     * @param {string} mathml - Formula MathML.
	     * @param {string} editMode - Edit Mode (LaTeX or images).
	     */


	    IntegrationModel.prototype.updateFormula = function updateFormula(mathml) {
	        if (this.isIframe) {
	            this.core.updateFormula(this.target.contentWindow, this.target.contentWindow, mathml, null);
	        } else {
	            this.core.updateFormula(this.target, window, mathml, null);
	        }
	    };

	    /**
	     * Gets the target selection.
	     */


	    IntegrationModel.prototype.getSelection = function getSelection() {
	        if (this.isIframe) {
	            this.target.contentWindow.focus();
	            return this.target.contentWindow.getSelection();
	        } else {
	            this.target.focus();
	            return window.getSelection();
	        }
	    };

	    /**
	     * Add events to formulas in the DOM target.
	     */


	    IntegrationModel.prototype.addEvents = function addEvents() {
	        var eventTarget = this.isIframe ? this.target.contentWindow.document : this.target;
	        _util2.default.addElementEvents(eventTarget, function (element, event) {
	            this.doubleClickHandler(element, event);
	        }.bind(this), function (element, event) {
	            this.mousedownHandler(element, event);
	        }.bind(this), function (element, event) {
	            this.mouseupHandler(element, event);
	        }.bind(this));
	    };

	    /**
	     * Handles a double click on the target element..
	     * @param {object} element - DOM object target.
	     * @param {event} event - double click event.
	     */


	    IntegrationModel.prototype.doubleClickHandler = function doubleClickHandler(element, event) {
	        if (element.nodeName.toLowerCase() == 'img') {
	            this.core.getCustomEditors().disable();
	            if (element.hasAttribute('data-custom-editor')) {
	                var customEditor = element.getAttribute('data-custom-editor');
	                this.core.getCustomEditors().enable(customEditor);
	            }
	            if (_util2.default.containsClass(element, 'Wirisformula')) {
	                this.core.editionProperties.temporalImage = element;
	                this.core.editionProperties.isNewElement = true;
	                this.openExistingFormulaEditor();
	            }
	        }
	    };

	    /**
	     * Handles a mouse down event on the iframe.
	     * @param object iframe Target
	     * @param object element Element mouse downed
	     */


	    IntegrationModel.prototype.mousedownHandler = function mousedownHandler(element) {
	        if (element.nodeName.toLowerCase() == 'img') {
	            if (_util2.default.containsClass(element, 'Wirisformula')) {
	                this.temporalImageResizing = element;
	            }
	        }
	    };

	    /**
	     * Returns the integration language. By default the browser agent. This method
	     * should be overwritten to obtain the integration language, for example using the
	     * plugin API of an HTML editor.
	     * @returns {string} integration language.
	     */


	    IntegrationModel.prototype.getLanguage = function getLanguage() {
	        return this.getBrowserLanguage();
	    };

	    /**
	     * Returns the browser language.
	     * @returns {string} the browser language.
	     */


	    IntegrationModel.prototype.getBrowserLanguage = function getBrowserLanguage() {
	        var language = 'en';
	        if (navigator.userLanguage) {
	            language = navigator.userLanguage.substring(0, 2);
	        } else if (navigator.language) {
	            language = navigator.language.substring(0, 2);
	        } else {
	            language = 'en';
	        }

	        return language;
	    };

	    /**
	     * Handles a mouse up event on the iframe.
	     */


	    IntegrationModel.prototype.mouseupHandler = function mouseupHandler() {
	        if (this.temporalImageResizing) {
	            setTimeout(function () {
	                _image2.default.fixAfterResize(this.temporalImageResizing);
	            }.bind(this), 10);
	        }
	    };

	    /**
	     * Callback function. This function will be called once the Core is loaded. IntegrationModel class
	     * will fire this method once the 'onLoad' Core event is fired. This function should content all the logic to init
	     * the integration.
	     */


	    IntegrationModel.prototype.callbackFunction = function callbackFunction() {
	        var listener = _listeners2.default.newListener('onTargetReady', function () {
	            this.addEvents(this.target);
	        }.bind(this));
	        this.listeners.add(listener);
	    };

	    /**
	     * Function called when the content submits an action.
	     */


	    IntegrationModel.prototype.notifyWindowClosed = function notifyWindowClosed() {}
	    // Nothing.


	    /**
	     * Core.js wrapper.
	     * Extracts mathml of a determined text node. This function is used as a wrapper inside core.js
	     * in order to get mathml from a text node that can contain normal LaTeX or other chosen text.
	     * @param {string} textNode test to extract LaTeX
	     * @param {int} caretPosition starting position to find LaTeX.
	     * @return {string} mathml that it's inside the text node.
	     * @ignore
	     */
	    ;

	    IntegrationModel.prototype.getMathmlFromTextNode = function getMathmlFromTextNode() {}
	    // Nothing.


	    /**
	     * Core.js wrapper.
	     * It fills wrs event object of nonLatex with the desired data.
	     * @param {object} event event object.
	     * @param {object} window dom window object.
	     * @param {string} mathml valid mathml.
	     */
	    ;

	    IntegrationModel.prototype.fillNonLatexNode = function fillNonLatexNode(event, window, mathml) {}
	    // Nothing,


	    /**
	     * Core.js wrapper.
	     * Returns selected item from the target.
	     * @param {DOM Element} target
	     * @param {boolean} iframe
	     */
	    ;

	    IntegrationModel.prototype.getSelectedItem = function getSelectedItem(target, isIframe) {
	        // Nothing.
	    };

	    return IntegrationModel;
	}();

	// To know if the integration that extends this class implements
	// wrapper methods, they are set as undefined.


	exports.default = IntegrationModel;
	IntegrationModel.prototype.getMathmlFromTextNode = undefined;
	IntegrationModel.prototype.fillNonLatexNode = undefined;
	IntegrationModel.prototype.getSelectedItem = undefined;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _core = __webpack_require__(1);

	var _core2 = _interopRequireDefault(_core);

	var _parser = __webpack_require__(3);

	var _parser2 = _interopRequireDefault(_parser);

	var _listeners = __webpack_require__(14);

	var _listeners2 = _interopRequireDefault(_listeners);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var backwardsLib;
	exports.default = backwardsLib;

	// Backward compatibility library for public methods previous to version 7.6.0
	/**
	 * Add a new callback to a MathType listener.
	 * @param {object} listener an Object containing listener name and a callback.
	 * @tutorial tutorial
	 * @deprecated Since version 7.6.0. Use Listeners.newListener instead.
	 */

	function wrs_addPluginListener(jsonListener) {
	  // TODO: Add documentation URL + doc example.
	  console.warn('Deprecated method');
	  var eventName;
	  eventName = Object.keys(jsonListener)[0];
	  var callback;
	  callback = jsonListener[eventName];
	  var pluginListener = _listeners2.default.newListener(eventName, callback);
	  _core2.default.addGlobalListener(pluginListener);
	}

	// Expose the method globally.
	window.wrs_addPluginListener = wrs_addPluginListener;

	/**
	 * Parses initial HTML code. If the HTML contains data generated by WIRIS, this data would be converted as following:
	 * <pre>
	 * MathML code: Image containing the corresponding MathML formulas.
	 * MathML code with LaTeX annotation : LaTeX.
	 * </pre>
	 * @param {string} code HTML code with data generated by MathType.
	 * @param {string} language Language for the formula.
	 * @return {string} HTML code with the WIRIS data converted into LaTeX and images.
	 * @deprecated Since version 7.6.0. Use Parser.initParse instead.
	 */
	function wrs_initParse(code, language) {
	  console.warn('Deprecated method. Use Parser.endParse instead.');
	  return _parser2.default.initParse(code, language);
	}

	// Expose the method globally.
	window.wrs_initParse = wrs_initParse;

	/**
	 * Parses end HTML code. The end HTML code is HTML code with embedded images or LaTeX formulas created with MathType. <br>
	 * By default this method converts the formula images and LaTeX strings in MathML. <br>
	 * If image mode is enabled the images will not be converted into MathML. For further information see {@link http://www.wiris.com/plugins/docs/full-mathml-mode}.
	 * @param {string} code String to be parsed.
	 * @param {object} wirisProperties Extra attributes for the formula.
	 * @param {string} language Language for the formula.
	 * @return {string}
	 * @deprecated Since version 7.6.0. Use Parser.initParse instead.
	 */
	function wrs_endParse(code, wirisProperties, language) {
	  console.warn('Deprecated method. Use Parser.endParse instead.');
	  return _parser2.default.endParse(code, wirisProperties, language);
	}

	// Expose the method globally.
	window.wrs_endParse = wrs_endParse;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var polyfills;
	exports.default = polyfills;

	// Polyfills.
	/*! http://mths.be/codepointat v0.1.0 by @mathias */

	if (!String.prototype.codePointAt) {
	    (function () {
	        'use strict'; // needed to support `apply`/`call` with `undefined`/`null`

	        var codePointAt = function codePointAt(position) {
	            if (this == null) {
	                throw TypeError();
	            }
	            var string = String(this);
	            var size = string.length;
	            // `ToInteger`
	            var index = position ? Number(position) : 0;
	            if (index != index) {
	                // better `isNaN`
	                index = 0;
	            }
	            // Account for out-of-bounds indices:
	            if (index < 0 || index >= size) {
	                return undefined;
	            }
	            // Get the first code unit
	            var first = string.charCodeAt(index);
	            var second;
	            if ( // check if it’s the start of a surrogate pair
	            first >= 0xD800 && first <= 0xDBFF && // high surrogate
	            size > index + 1 // there is a next code unit
	            ) {
	                    second = string.charCodeAt(index + 1);
	                    if (second >= 0xDC00 && second <= 0xDFFF) {
	                        // low surrogate
	                        // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
	                        return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
	                    }
	                }
	            return first;
	        };
	        if (Object.defineProperty) {
	            Object.defineProperty(String.prototype, 'codePointAt', {
	                'value': codePointAt,
	                'configurable': true,
	                'writable': true
	            });
	        } else {
	            String.prototype.codePointAt = codePointAt;
	        }
	    })();
	}

	// Object.assign polyfill.
	if (typeof Object.assign != 'function') {
	    // Must be writable: true, enumerable: false, configurable: true
	    Object.defineProperty(Object, "assign", {
	        value: function assign(target, varArgs) {
	            // .length of function is 2
	            'use strict';

	            if (target == null) {
	                // TypeError if undefined or null
	                throw new TypeError('Cannot convert undefined or null to object');
	            }

	            var to = Object(target);

	            for (var index = 1; index < arguments.length; index++) {
	                var nextSource = arguments[index];

	                if (nextSource != null) {
	                    // Skip over if undefined or null
	                    for (var nextKey in nextSource) {
	                        // Avoid bugs when hasOwnProperty is shadowed
	                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
	                            to[nextKey] = nextSource[nextKey];
	                        }
	                    }
	                }
	            }
	            return to;
	        },
	        writable: true,
	        configurable: true
	    });
	}

/***/ })
/******/ ]);
