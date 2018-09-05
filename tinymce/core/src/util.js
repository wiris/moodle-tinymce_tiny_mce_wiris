import MathML from './mathml';
import Configuration from './configuration';
import Latex from './latex';

/**
 * This class represents an utility class.
 */
export default class Util {
    /**
     * Fires an event in a target.
     * @param {EventTarget} eventTarget - target where event should be fired.
     * @param {string} eventName event to fire.
     * @static
     */
    static fireEvent(eventTarget, eventName) {
        if (document.createEvent){
            var eventObject = document.createEvent('HTMLEvents');
            eventObject.initEvent(eventName, true, true);
            return !eventTarget.dispatchEvent(eventObject);
        }

        var eventObject = document.createEventObject();
        return eventTarget.fireEvent('on' + eventName, eventObject)
    }

    /**
     * Cross-browser addEventListener/attachEvent function.
     * @param {EventTarget} eventTarget - target to add the event.
     * @param {string} eventName - specifies the type of event.
     * @param {Function} callBackFunction - callback function.
     * @static
     */
    static addEvent(eventTarget, eventName, callBackFunction) {
        if (eventTarget.addEventListener) {
            eventTarget.addEventListener(eventName, callBackFunction, true);
        } else if (eventTarget.attachEvent) {
            // Backwards compatibility.
            eventTarget.attachEvent('on' + eventName, callBackFunction);
        }
    }

    /**
     * Cross-browser removeEventListener/detachEvent function.
     * @param {EventTarget} eventTarget - target to add the event.
     * @param {string} eventName - specifies the type of event.
     * @param {Function} callBackFunction - function to remove from the event target.
     * @static
     */
    static removeEvent(eventTarget, eventName, callBackFunction) {
        if (eventTarget.removeEventListener) {
            eventTarget.removeEventListener(eventName, callBackFunction, true);
        }
        else if (eventTarget.detachEvent) {
            eventTarget.detachEvent('on' + eventName, callBackFunction);
        }
    }

    /**
     * Adds the a callback function, for a certain event target, to the following event types:
     * - dblclick
     * - mousedown
     * - mouseup
     * @param {EventTarget} eventTarget - event target.
     * @param {Function} doubleClickHandler - function to run when on dblclick event.
     * @param {Function} mousedownHandler - function to run when on mousedown event.
     * @param {Function} mouseupHandler - function to run when on mouseup event.
     * @static
     */
    static addElementEvents(eventTarget, doubleClickHandler, mousedownHandler, mouseupHandler) {
        if (doubleClickHandler) {
            Util.addEvent(eventTarget, 'dblclick', function (event) {
                var realEvent = (event) ? event : window.event;
                var element = realEvent.srcElement ? realEvent.srcElement : realEvent.target;
                doubleClickHandler(element, realEvent);
            });
        }

        if (mousedownHandler) {
            Util.addEvent(eventTarget, 'mousedown', function (event) {
                var realEvent = (event) ? event : window.event;
                var element = realEvent.srcElement ? realEvent.srcElement : realEvent.target;
                mousedownHandler(element, realEvent);
            });
        }

        if (mouseupHandler) {
            Util.addEvent(eventTarget, 'mouseup', function (event) {
                var realEvent = (event) ? event : window.event;
                var element = realEvent.srcElement ? realEvent.srcElement : realEvent.target;
                mouseupHandler(element, realEvent);
            });
        }
    }

    /**
     * Adds a class name to a HTMLElement.
     * @param {HTMLElement} element - the HTML element.
     * @param {string} className - the class name.
     * @static
     */
    static addClass(element, className) {
        if (!Util.containsClass(element, className)) {
            element.className += " " + className;
        }
    }

    /**
     * Checks if a HTMLElement contains a certain class.
     * @param {HTMLElement} element - the HTML element.
     * @param {string} className - the className.
     * @returns {boolean} true if the HTMLElement contains the class name. false otherwise.
     * @static
     */
    static containsClass(element, className) {
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
    }

    /**
     * Remove a certain class for a HTMLElement.
     * @param {HTMLElement} element - the HTML element.
     * @param {string} className - the class name.
     * @static
     */
    static removeClass(element, className) {
        var newClassName = '';
        var classes = element.className.split(" ");

        for (var i = 0; i < classes.length; i++) {
            if(classes[i] != className) {
                newClassName += classes[i] + " ";
            }
        }
        element.className = newClassName.trim();
    }

    /**
     * Converts old xml initial text attribute (with «») to the correct one(with §lt;§gt;). It's
     * used to parse old applets.
     * @param {string} text - string containing safeXml characters
     * @returns {string} a string with safeXml characters parsed.
     * @static
     */
    static convertOldXmlinitialtextAttribute(text){
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
    }

    /**
     * Cross-browser solution for creating new elements.
     * @param {string} tagName - tag name of the wished element.
     * @param {Object} attributes - an object where each key is a wished attribute name and each value is its value.
     * @param {Object} [creator] - if supplied, this function will use the "createElement" method from this param. Otherwise
     * document will be used as creator.
     * @returns {Element} The DOM element with the specified attributes assigned.
     * @static
     */
    static createElement(tagName, attributes, creator) {
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
            var html = '<' + tagName;

            for (var attributeName in attributes) {
                html += ' ' + attributeName + '="' + Util.htmlEntities(attributes[attributeName]) + '"';
            }

            html += '>';
            element = creator.createElement(html);
        }
        catch (e) {
            element = creator.createElement(tagName);

            for (var attributeName in attributes) {
                element.setAttribute(attributeName, attributes[attributeName]);
            }
        }

        return element;
    }

    /**
     * Creates new HTML from it's HTML code as string.
     * @param {string} objectCode - html code
     * @returns {Element} the HTML element.
     * @static
     */
    static createObject(objectCode, creator) {
        if (creator === undefined) {
            creator = document;
        }

        // Internet Explorer can't include "param" tag when is setting an innerHTML property.
        objectCode = objectCode.split('<applet ').join('<span wirisObject="WirisApplet" ').split('<APPLET ').join('<span wirisObject="WirisApplet" ');  // It is a 'span' because 'span' objects can contain 'br' nodes.
        objectCode = objectCode.split('</applet>').join('</span>').split('</APPLET>').join('</span>');

        objectCode = objectCode.split('<param ').join('<br wirisObject="WirisParam" ').split('<PARAM ').join('<br wirisObject="WirisParam" ');          // It is a 'br' because 'br' can't contain nodes.
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
            }
            else if (object.getAttribute && object.getAttribute('wirisObject') == 'WirisApplet') {
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
                        --i;    // When we insert the object child into the applet, object loses one child.
                    }
                }

                object.parentNode.replaceChild(applet, object);
            }
            else {
                for (var i = 0; i < object.childNodes.length; ++i) {
                    recursiveParamsFix(object.childNodes[i]);
                }
            }
        }

        recursiveParamsFix(container);
        return container.firstChild;
    }

    /**
     * Converts an Element to its HTML code.
     * @param {Element} element - entry element.
     * @return {string} the HTML code of the input element.
     * @static
     */
    static createObjectCode(element) {

        // In case that the image was not created, the object can be null or undefined.
        if (typeof element == 'undefined' || element == null) {
            return;
        }

        if (element.nodeType == 1) { // ELEMENT_NODE.
            var output = '<' + element.tagName;

            for (var i = 0; i < element.attributes.length; ++i) {
                if (element.attributes[i].specified) {
                    output += ' ' + element.attributes[i].name + '="' + Util.htmlEntities(element.attributes[i].value) + '"';
                }
            }

            if (element.childNodes.length > 0) {
                output += '>';

                for (var i = 0; i < element.childNodes.length; ++i) {
                    output += Util.createObject(element.childNodes[i]);
                }

                output += '</' + element.tagName + '>';
            }
            else if (element.nodeName == 'DIV' || element.nodeName == 'SCRIPT') {
                output += '></' + element.tagName + '>';
            }
            else {
                output += '/>';
            }

            return output;
        }

        if (element.nodeType == 3) { // TEXT_NODE.
            return Util.htmlEntities(element.nodeValue);
        }

        return '';
    }

    /**
     * Concatenates two URL paths.
     * @param {string} path1 - first URL path
     * @param {string} path2 - second URL path
     * @returns {string} new URL.
     */
    static concatenateUrl(path1, path2) {
        var separator = "";
        if ((path1.indexOf("/") != path1.length) && (path2.indexOf("/") != 0)) {
            separator = "/";
        }
        return (path1 + separator + path2).replace(/([^:]\/)\/+/g, "$1");
    }

    /**
     * Parses a text and replaces all HTML special characters by their correspondent entities.
     * @param {string} input - text to be parsed.
     * @returns {string} the input text with all their special characters replaced by their entities.
     * @static
     */
    static htmlEntities(input) {
        return input.split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;').split('"').join('&quot;');
    }

    /**
     * Parses a text and replaces all the HTML entities by their characters.
     * @param {string} input - text to be parsed
     * @returns {string} the input text with all their entities replaced by characters.
     * @static
     */
    static htmlEntitiesDecode(input) {
        return input.split('&quot;').join('"').split('&gt;').join('>').split('&lt;').join('<').split('&amp;').join('&');
    }

    /**
     * Returns a cross-browser http request.
     * @return {object} httpRequest request object.
     * @returns {XMLHttpRequest|ActiveXObject} the proper request object.
     */
    static createHttpRequest() {
        var currentPath = window.location.toString().substr(0, window.location.toString().lastIndexOf('/') + 1);
        if (currentPath.substr(0, 7) == 'file://') {
            throw Core.getStringManager().getString('exception_cross_site');
        }

        if (typeof XMLHttpRequest != 'undefined') {
            return new XMLHttpRequest();
        }

        try {
            return new ActiveXObject('Msxml2.XMLHTTP');
        }
        catch (e) {
            try {
                return new ActiveXObject('Microsoft.XMLHTTP');
            }
            catch (oc) {
            }
        }

        return false;
    }

    /**
     * Converts a hash to a HTTP query.
     * @param {Object[]} properties - a key/value object.
     * @returns {string} a HTTP query containing all the key value pairs with all the special characters replaced by their entities.
     * @static
     */
    static httpBuildQuery(properties) {
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
    }

    /**
     * Convert a hash to string sorting keys to get a deterministic output
     * @param {Object[]} hash - a key/value object.
     * @returns {string} a string with the form key1=value1...keyn=valuen
     * @static
     */
    static propertiesToString(hash) {
        // 1. Sort keys. We sort the keys because we want a deterministic output.
        var keys = []
        for (var key in hash) {
            if (hash.hasOwnProperty(key)) {
                keys.push(key);
            }
        }

        var n = keys.length;
        for (var i = 0; i < n; i++) {
            for (var j = i + 1; j < n; j++) {
                var s1 = keys[i];
                var s2 = keys[j];
                if (Util.compareStrings(s1,s2) > 0) {
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
            var value = hash[key];
            value = value.replace("\\", "\\\\");
            value = value.replace("\n", "\\n");
            value = value.replace("\r", "\\r");
            value = value.replace("\t", "\\t");

            output += value;
            output += "\n";
        }
        return output;
    }

    /**
     * Compare two strings using charCodeAt method
     * @param {string} a - first string to compare.
     * @param {string} b - second string to compare.
     * @returns {number} the difference between a and b
     * @static
     */
    static compareStrings(a, b) {
        var i;
        var an = a.length;
        var bn = b.length;
        var n = (an > bn) ? bn : an;
        for(i = 0; i < n; i++){
            var c = Util.fixedCharCodeAt(a,i) - Util.fixedCharCodeAt(b,i);
            if(c != 0) {
                return c;
            }
        }
            return a.length - b.length;
    }

    /**
     * Fix charCodeAt() JavaScript function to handle non-Basic-Multilingual-Plane characters.
     * @param {string} string - input string
     * @param {number} idx - an integer greater than or equal to 0 and less than the length of the string
     * @returns {number} an integer representing the UTF-16 code of the string at the given index.
     * @static
     */
    static fixedCharCodeAt(string, idx) {
        idx = idx || 0;
        var code = string.charCodeAt(idx);
        var hi, low;

        /* High surrogate (could change last hex to 0xDB7F to treat high
        private surrogates as single characters) */

        if (0xD800 <= code && code <= 0xDBFF) {
            hi = code;
            low = string.charCodeAt(idx + 1);
            if (isNaN(low)) {
                throw Core.getStringManager().getString('exception_high_surrogate');
            }
            return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
        }

        if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate.
            /* We return false to allow loops to skip this iteration since should have
            already handled high surrogate above in the previous iteration. */
            return false;
        }
        return code;
    }

    /**
     * Returns an URL with it's query params converted into array.
     * @param {string} url - input URL.
     * @returns {Object[]} an array containing all URL query params.
     * @static
     */
    static urlToAssArray(url) {
        var i;
        i = url.indexOf("?");
        if (i > 0) {
            var query = url.substring(i + 1);
            var ss  = query.split("&");
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
    }

    /**
     * Returns an encoded URL by replacing each instance of certain characters by
     * one, two, three or four escape sequences using encodeURIComponent method.
     * !'()* . will not be encoded.
     *
     * @param {string} clearString - URL string to be encoded
     * @returns {string} URL with it's special characters replaced.
     * @static
     */
    static urlEncode(clearString) {
        var output = '';
        // Method encodeURIComponent doesn't encode !'()*~ .
        output = encodeURIComponent(clearString);
        return output;
    }

    // TODO: To parser?
    /**
     * Converts the HTML of a image into the output code that WIRIS must return.
     * By default returns the MathML stored on data-mahml attribute (if imgCode is a formula)
     * or the Wiriscas attribute of a WIRIS applet.
     * @param {string} imgCode - the html code from a formula or a CAS image.
     * @param {boolean} convertToXml - true if the image should be converted to XML.
     * @param {boolean} convertToSafeXml - true if the image should be converted to safeXML.
     * @returns {string} the XML or safeXML of a WIRIS image.
     * @static
     */
    static getWIRISImageOutput(imgCode, convertToXml, convertToSafeXml) {
        var imgObject = Util.createObject(imgCode);

        if (imgObject) {
            if (imgObject.className == Configuration.get('imageClassName') || imgObject.getAttribute(Configuration.get('imageMathmlAttribute'))) {
                if (!convertToXml) {
                    return imgCode;
                }

                var xmlCode = imgObject.getAttribute(Configuration.get('imageMathmlAttribute'));

                if (xmlCode == null) {
                    xmlCode = imgObject.getAttribute('alt');
                }

                if (!convertToSafeXml) {
                    xmlCode = MathML.safeXmlDecode(xmlCode);
                }

                return xmlCode;
            }
            else if (imgObject.className == Configuration.get('CASClassName')) {
                var appletCode = imgObject.getAttribute(Configuration.get('CASMathmlAttribute'));
                appletCode = MathML.safeXmlDecode(appletCode);
                var appletObject = Util.createObject(appletCode);
                appletObject.setAttribute('src', imgObject.src);
                var object = appletObject;
                var appletCodeToBeInserted = Util.createObjectCode(appletObject);

                if (convertToSafeXml) {
                    appletCodeToBeInserted = MathML.safeXmlEncode(appletCodeToBeInserted);
                }

                return appletCodeToBeInserted;
            }
        }

        return imgCode;
    }

    /**
     * Gets the node length in characters.
     * @param {Node} node - HTML node.
     * @returns {number} node length.
     * @static
     */
    static getNodeLength(node) {
        var staticNodeLengths = {
            'IMG': 1,
            'BR': 1
        }
        if (node.nodeType == 3) { // TEXT_NODE.
            return node.nodeValue.length;
        }

        if (node.nodeType == 1) { // ELEMENT_NODE.
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
    }

    /**
     * Gets a selected node or text from an editable HTMLElement.
     * If the caret is on a text node, concatenates it with all the previous and next text nodes.
     * @param {HTMLElement} target - the editable HTMLElement.
     * @param {boolean} isIframe  - specifies if the target is an iframe or not
     * @param {boolean} forceGetSelection - if true, ignores IE system to get the current selection and uses window.getSelection()
     * @returns {object} an object with the 'node' key set if the item is an element or the keys 'node' and 'caretPosition' if the element is text.
     * @static
     */
    static getSelectedItem(target, isIframe, forceGetSelection) {
        var windowTarget;

        if (isIframe) {
            windowTarget = target.contentWindow;
            windowTarget.focus();
        }
        else {
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

                if (temporalObject.nextSibling && temporalObject.nextSibling.nodeType == 3) { // TEXT_NODE.
                    node = temporalObject.nextSibling;
                    caretPosition = 0;
                }
                else if (temporalObject.previousSibling && temporalObject.previousSibling.nodeType == 3) { // TEXT_NODE.
                    node = temporalObject.previousSibling;
                    caretPosition = node.nodeValue.length;
                }
                else {
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
            }
            catch (e) {
                var range = windowTarget.document.createRange();
            }

            var node = range.startContainer;

            if (node.nodeType == 3) { // TEXT_NODE.
                return {
                    'node': node,
                    'caretPosition': range.startOffset
                };
            }

            if (node != range.endContainer) {
                return null;
            }

            if (node.nodeType == 1) { // ELEMENT_NODE.
                var position = range.startOffset;

                if (node.childNodes[position]) {
                    return {
                        'node': node.childNodes[position]
                    };
                }
            }
        }

        return null;
    }

    /**
     * Returns null if there isn't any item or if it is malformed.
     * Otherwise returns an object containing the node with the MathML image
     * and the cursor position inside the textarea.
     * @param {HTMLTextAreaElement} textarea - textarea element.
     * @returns {Object} An object containing the node, the index of the
     * beginning  of the selected text, caret position and the start and end position of the
     * text node.
     * @static
     */
    static getSelectedItemOnTextarea(textarea) {
        const textNode = document.createTextNode(textarea.value);
        const textNodeValues = Latex.getLatexFromTextNode(textNode, textarea.selectionStart);
        if (textNodeValues === null) {
            return null;
        };

        return {
            'node': textNode,
            'caretPosition': textarea.selectionStart,
            'startPosition': textNodeValues.startPosition,
            'endPosition': textNodeValues.endPosition
        };
    }

    /**
     * Looks for elements that match the given name in a HTML code string.
     * Important: this function is very concrete for WIRIS code. It takes as preconditions lots of behaviors that are not the general case.
     * @param {string} code -  HTML code.
     * @param {string} name - element name.
     * @param {boolean} autoClosed - true if the elements are autoClosed.
     * @return {Object[]} an object containing all HTML elements of code matching the name argument.
     * @static
     */
    static getElementsByNameFromString(code, name, autoClosed) {
        var elements = [];
        var code = code.toLowerCase();
        name = name.toLowerCase();
        var start = code.indexOf('<' + name + ' ');

        while (start != -1) {                       // Look for nodes.
            var endString;

            if (autoClosed) {
                endString = '>';
            }
            else {
                endString = '</' + name + '>';
            }

            var end = code.indexOf(endString, start);

            if (end != -1) {
                end += endString.length;

                elements.push({
                    'start': start,
                    'end': end
                });
            }
            else {
                end = start + 1;
            }

            start = code.indexOf('<' + name + ' ', end);
        }

        return elements;
    }

    /**
     * Returns the numeric value of a base64 character.
     * @param  {string} character - base64 character.
     * @returns {number} base64 character numeric value.
     * @static
     */
    static decode64(character) {

        var PLUS = '+'.charCodeAt(0);
        var SLASH = '/'.charCodeAt(0);
        var NUMBER = '0'.charCodeAt(0);
        var LOWER = 'a'.charCodeAt(0);
        var UPPER = 'A'.charCodeAt(0);
        var PLUS_URL_SAFE = '-'.charCodeAt(0);
        var SLASH_URL_SAFE = '_'.charCodeAt(0);
        var code = character.charCodeAt(0);

        if (code === PLUS || code === PLUS_URL_SAFE) {
            return 62; // Char '+'.
        }
        if (code === SLASH || code === SLASH_URL_SAFE){
            return 63 // Char '/'.
        }
        if (code < NUMBER){
            return -1 // No match.
        }
        if (code < NUMBER + 10){
            return code - NUMBER + 26 + 26
        }
        if (code < UPPER + 26){
            return code - UPPER
        }
        if (code < LOWER + 26){
            return code - LOWER + 26
        }
    }

    /**
     * Converts a base64 string to a array of bytes.
     * @param {string} b64String - base64 string.
     * @param {number} length - dimension of byte array (by default whole string).
     * @return {Object[]} the resultant byte array.
     * @static
     */
    static b64ToByteArray(b64String, length) {

        var tmp;

        if (b64String.length % 4 > 0) {
            throw new Error('Invalid string. Length must be a multiple of 4'); // Tipped base64. Length is fixed.
        }

        var arr = new Array()

        if (!length) { // All b64String string.
            var placeHolders = b64String.charAt(b64String.length - 2) === '=' ? 2 : b64String.charAt(b64String.length - 1) === '=' ? 1 : 0
            var l = placeHolders > 0 ? b64String.length - 4 : b64String.length;
        } else {
            var l = length;
        }

        for (var i = 0; i < l; i += 4) {
            // Ignoring code checker standards (bitewise operators).
            // See https://tracker.moodle.org/browse/CONTRIB-5862 for further information.
            // @codingStandardsIgnoreStart
            tmp = (Util.decode64(b64String.charAt(i)) << 18) | (Util.decode64(b64String.charAt(i + 1)) << 12) | (Util.decode64(b64String.charAt(i + 2)) << 6) | Util.decode64(b64String.charAt(i + 3));

            arr.push((tmp  >> 16) & 0xFF);
            arr.push((tmp >> 8) & 0xFF);
            arr.push(tmp & 0xFF);
            // @codingStandardsIgnoreEnd
        }

        if (placeHolders) {
            if (placeHolders === 2) {
                // Ignoring code checker standards (bitewise operators).
                // @codingStandardsIgnoreStart
                tmp = (Util.decode64(b64String.charAt(i)) << 2) | (Util.decode64(b64String.charAt(i + 1)) >> 4);
                arr.push(tmp & 0xFF)
            } else if (placeHolders === 1) {
                tmp = (Util.decode64(b64String.charAt(i)) << 10) | (Util.decode64(b64String.charAt(i + 1)) << 4) | (Util.decode64(b64String.charAt(i + 2)) >> 2)
                arr.push((tmp >> 8) & 0xFF);
                arr.push(tmp & 0xFF);
                // @codingStandardsIgnoreEnd
            }
        }

        return arr
    }

    /**
     * Returns the first 32-bit signed integer from a byte array.
     * @param {Object[]} bytes - array of bytes.
     * @returns {number} the 32-bit signed integer.
     * @static
     */
    static readInt32(bytes) {
        if (bytes.length < 4) {
            return false;
        }
        var int32 = bytes.splice(0,4);
        // @codingStandardsIgnoreStart
        return (int32[0] << 24 | int32[1] << 16 | int32[2] <<  8 | int32[3] << 0);
        // @codingStandardsIgnoreEnd
    }

    /**
     * Read the first byte from a byte array.
     * @param {Object} bytes - input byte array.
     * @returns {number} first byte of the byte array.
     * @static
     */
    static readByte(bytes) {
        // @codingStandardsIgnoreStart
        return bytes.shift() << 0;
        // @codingStandardsIgnoreEnd
    }

    /**
     * Read an arbitrary number of bytes, from a fixed position on a byte array.
     * @param  {Object[]} bytes - byte array.
     * @param  {number} pos - start position.
     * @param  {number} len - number of bytes to read.
     * @returns {Object[]} the byte array.
     * @static
     */
    static readBytes(bytes, pos, len) {
        return bytes.splice(pos, len);
    }

    /**
     * Inserts or modifies formulas or CAS on a textarea.
     * @param {HTMLTextAreaElement} textarea - textarea target.
     * @param {string} text - text to add in the textarea. For example, to add the link to the image,
     * call this function as (textarea, Parser.createImageSrc(mathml));
     * @static
     */
    static updateTextArea(textarea, text) {
        if (textarea && text) {
            textarea.focus();

            if (textarea.selectionStart != null) {
                var selectionEnd = textarea.selectionEnd;
                textarea.value = textarea.value.substring(0, textarea.selectionStart) + text + textarea.value.substring(textarea.selectionEnd, textarea.value.length);
                textarea.selectionEnd = selectionEnd + text.length;
            }
            else {
                var selection = document.selection.createRange();
                selection.text = text;
            }
        }
    }

    /**
     * Modifies existing formula on a textarea.
     * @param {HTMLTextAreaElement} textarea - text area target.
     * @param {string} text - text to add in the textarea. For example, if you want to add the link to the image, you can call this function as Util.updateTextarea(textarea, Parser.createImageSrc(mathml));
     * @param {number} start - beginning index from textarea where it needs to be replaced by text.
     * @param {number} end - ending index from textarea where it needs to be replaced by text
     * @static
     */
    static updateExistingTextOnTextarea(textarea, text, start, end) {
        textarea.focus();
        textarea.value = textarea.value.substring(0, start) + text + textarea.value.substring(end, textarea.value.length);
        textarea.selectionEnd = start + text.length;
    }

    /**
     * Add a parameter with it's correspondent value to an URL (GET).
     * @param {string} path - URL path
     * @param {string} parameter - parameter
     * @param {string} value - value
     * @static
     */
    static addArgument(path, parameter, value) {
        var sep;
        if (path.indexOf("?") > 0) {
            sep = "&";
        } else {
            sep = "?";
        }
        return path + sep + parameter + "=" + value;
    }

}
