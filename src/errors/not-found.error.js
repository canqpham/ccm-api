const BaseError = require('./base');

class NotFoundException extends BaseError {
    constructor(message) {
        super(message, 404);
    }
}

module.exports = NotFoundException;
