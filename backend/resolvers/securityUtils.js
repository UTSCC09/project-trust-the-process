const validator = require('validator');

const checkAlphanumeric = function(param) {
    if (validator.isEmpty(param)) return false;
    if (!validator.isAlphanumeric(param)) return false;
    return true;
};

const sanitizeContent = function(param) {
    param = validator.escape(param);
    param = validator.trim(param);

    return param;
};

const checkEmail = function(param) {
    if (validator.isEmpty(param)) return false;
    if (!validator.isEmail(param)) return false;
    return true;
};

const checkObjectId = function(param) {
    if (validator.isEmpty(param)) return false;
    if (!validator.isMongoId(param)) return false;
    return true;
};
