import Listeners from './listeners';
/**
 * StringManager class to use strings in code correctly with control.
 *
 */
export default class StringManager {
    constructor() {
        // Strings are empty when it creates, it set when calls load method.
        this.strings = null;
        this.stringsLoaded = false;
        /**
         * StringManager listeners. Fired on 'onLoad' event.
         * @type {Listeners}
         */
        this.listeners = new Listeners();
    }

    /**
     * Add a plugin listener.
     * @param {Object} listener
     */
    addListener(listener) {
        this.listeners.add(listener);
    }

    /**
     * This method return a string passing a key.
     * @param  {string} key of array strings that you want.
     * @return string A text that you want or key if it doesn't exist.
     * @ignore
     */
   getString(key) {
        // Wait 200ms and recall this method if strings aren't load.
        if (!this.stringsLoaded) {
            setTimeout(this.getString.bind(this, key), 100);
            return;
        }
        if (key in this.strings) {
            return this.strings[key];
        }
        return key;
    }
    /**
     * This method load all strings to the manager and unset it for prevent bad usage.
     * @param  {array} String array of language
     * @ignore
     */
   loadStrings(langStrings) {
        if (!this.stringsLoaded) {
            this.strings = langStrings;
            // Activate variable to unlock getStrings
            this.stringsLoaded = true;
            this.listeners.fire('onLoad', {});
        }
    }
}
