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
     * @type {{minLength: number, maxLength: number, alphaDigit: boolean, diffCase: boolean, minLengthError: string, maxLengthError: string, alphaDigitError: string, diffCaseError: string}}
     */
    var settings = {
        minLength       : 8,
        maxLength       : 32,
        alphaDigit      : true,
        diffCase        : false,
        minLengthError  : 'The password is too short',
        maxLengthError  : 'The password is too long',
        alphaDigitError : 'The password must contain at least one numeric character and at least one letter',
        diffCaseError   : 'The password must contain both uppercase and lowercase characters'
    };
    /**
     * Function for checking object type
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
     * Evaluation function
     * @function estimatePass
     * @private
     *
     * @param {String} pass Verified Password
     * @return {Number} The result of the password evaluation in the range from 0 to 1
     */
    function estimatePass(pass) {
        /**
         * @const
         * @type {number}
         */
        var // Ideal length
        GOOD_LEN = 12,
        // Checking for uppercase, lowercase letters, numbers and symbols
        loCase  = pass.search(/[a-z]/) !== -1,
        hiCase  = pass.search(/[A-Z]/) !== -1,
        num     = pass.search(/\d/) !== -1,
        sym     = pass.search(/[!@#\$%&\*\(\)_\-=\+"'#\^№;:\?,\.\\\|\/`~{}\[\]]/) !== -1,
        // The length of the password is 1/4 of the maximum score
        pLen = pass.length < GOOD_LEN ? pass.length / GOOD_LEN / 4 : 1/4;
        //Password complexity rating: 0 to 1
        return pLen * (loCase + hiCase + num + sym);
    }
    /**
     * Global object passChecker
     * @global
     */
    var passChecker = {};
    /**
     * Parameter setting function
     * @function config
     * @public
     *
     * @param {String|Object} param Parameter name or object with parameters
     * @param value {Number} Settable value
     * @return passChecker - object
     */
    passChecker.config = function (param, value) {
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
        return passChecker; // Implement the chain of methods
    };
    /**
     * Password verification function
     * @function checkPass
     * @public
     *
     * @param {String} pass Verified Password
     * @return {Object} Object with information about password verification
     */
    passChecker.checkPass = function (pass) {
        var passLen         = pass.length,
            loCase          = pass.search(/[a-z]/) !== -1,
            hiCase          = pass.search(/[A-Z]/) !== -1,
            num             = pass.search(/\d/) !== -1,
            isAlphaDigit    = num && (loCase || hiCase),
            isDiffCase      = loCase && hiCase,
            passRating      = estimatePass(pass);
        if (passLen < settings.minLength) {
            return {
                error : 1,
                rating : passRating,
                message : settings.minLengthError
            };
        }
        if (passLen > settings.maxLength) {
            return {
                error : 2,
                rating : passRating,
                message : settings.maxLengthError
            };
        }
        if (settings.alphaDigit && !isAlphaDigit) {
            return {
                error : 3,
                rating : passRating,
                message : settings.alphaDigitError
            };
        }
        if (settings.diffCase && !isDiffCase) {
            return {
                error : 4,
                rating : passRating,
                message : settings.diffCaseError
            };
        }
        return {
            error : 0,
            rating : estimatePass(pass),
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
    passChecker.getVersion = function (ver) {
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
    var oldGlobalVar = window.passChecker;
    /**
     * Function set in noConflict mode
     * @function noConflict
     * @public
     */
    passChecker.noConflict = function () {
        if (window.passChecker === passChecker) {
            window.passChecker = oldGlobalVar;
        }
        return passChecker;
    };
    // Declaring a global variable
    window.passChecker = passChecker;
})(window);