(function (window, undefined) {
    'use strict';
    /**
     * @default
     * @type {string}
     */
    var VERSION = '1.0';
    /**
     * Default Settings
     * @default
     * @type {{emailError: string, numError: string, comparePasswordsError: string, stringError: string}}
     */
    var settings = {
        emailError              :'Invalid email',
        numError                :'Enter Numeric value only',
        comparePasswordsError   :'Passwords must be the same',
        stringError             :'Name should contain only letters'
    };
    /**
     * Function for checking Object type
     * @function is
     * @private
     *
     * @param {Object} obj Checked object
     * @param {String} type Assumed object type
     * @return {Boolean} Comparison result
     */
    function is(obj, type) {
        var clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined &&
            obj !== null &&
            clas.toLowerCase() === type.toLowerCase();
    }
    /**
     * Global object easyValidate
     * @global
     */
    var easyValidate = {};
    /**
     * Parameter setting function
     * @function config
     * @public
     *
     * @param {String|Object} param Parameter name or object with parameters
     * @param value Settable value
     * @return easyValidate - object
     */
    easyValidate.config = function (param, value) {
        // Let's check the arguments
        var argLength = arguments.length;
        if (!argLength) {
            throw new TypeError('Missing required parameters');
        }
        // Is the first argument an object
        if ( is(param, 'Object') ) {
            for (var p in param) {
                if (param.hasOwnProperty(p) && settings.hasOwnProperty(p)) {
                    settings[p] = param[p];
                }
            }
            // Let's check if there is a second argument (even if it is explicitly specified as undefined)
        } else if (argLength > 1) {
            if (settings.hasOwnProperty(param)) {
                settings[param] = value;
            }
            // Otherwise, throw an error
        } else {
            throw new TypeError('Missing second parameter');
        }
        return easyValidate; // Implement the chain of methods
    };
    /**
     * Email validation function
     * @function checkEmail
     * @public
     *
     * @param {String} emailValue Verifiable email
     * @return {Object} Object with information about checking email
     */
    easyValidate.checkEmail = function(emailValue) {
        var email = emailValue;
        var atpos = email.indexOf("@");
        var dotpos = email.lastIndexOf(".");

        if ( atpos < 1 || (dotpos - atpos < 2) || (dotpos >= email.length - 2) ) {
            return {
                error : 1,
                message : settings.emailError
            };
        }
        return {
            error : 0,
            message : ''
        };
    };
    /**
     * Number check function
     * @function checkNumber
     * @public
     *
     * @param {Number} numValue The number to be checked
     * @return {Object} Object with information about checking the number
     */
    easyValidate.checkNumber = function(numValue) {
        var num = numValue;

        if (!isNaN(parseFloat(num)) && isFinite(num)) {
            return {
                error : 0,
                message : ''
            }
        }
        return {
            error : 2,
            message : settings.numError
        };
    };
    /**
     * Function of checking the line for the contents of digits
     * @function checkStringOnNumbers
     * @public
     *
     * @param {String} string The tested string
     * @return {Object} Object with information about checking the string
     */
    easyValidate.checkStringOnNumbers = function(string) {
        var num = string.search(/\d/) !== -1;

        if ( num ) {
            return {
                error : 3,
                message : settings.stringError
            }
        }
        return {
            error : 0,
            message : ''
        };
    };
    /**
     * Check function on the corresponding password with previously entered password
     * @function comparePasswords
     * @public
     *
     * @param {String} firstPass Verified Password
     * @param {String} secondPass Verified Password
     * @return {Object} Object with information about password checking
     */
    easyValidate.comparePasswords = function(firstPass, secondPass) {
        var first = firstPass;
        var second = secondPass;

        if ( first !== second) {
            return {
                error : 4,
                message : settings.comparePasswordsError
            }
        }
        return {
            error : 0,
            message : ''
        };
    };
    /**
     * Service function for determining the version of the library
     * @function getVersion
     * @public
     *
     * @param {String} ver Version of comparison
     * @return {Number|String} The result of the version comparison or the version itself
     */
    easyValidate.getVersion = function (ver) {
        // Just find documentation the version
        if (!ver) {
            return VERSION;
        }
        // Otherwise we try to compare versions
        var thisVersion = parseInt(VERSION.replace('.', ''), 10),
            otherVersion = parseInt(ver.replace('.', ''), 10);
        // If the specified version is greater than ours then the result> 0
        return otherVersion - thisVersion;
    };
    /* Ensuring compatibility */
    var oldGlobalVar = window.easyValidate;
    /**
     * Function set in noConflict mode
     * @function noConflict
     * @public
     */
    easyValidate.noConflict = function () {
        if (window.easyValidate === easyValidate) {
            window.easyValidate = oldGlobalVar;
        }
        return easyValidate;
    };
    // Declaring a global variable
    window.easyValidate = easyValidate;
})(window);
