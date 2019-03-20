const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const modifiedBy = require('./plugins/ModifyByPlugin');
const mongoose_deleted = require('mongoose-deleted');
const crypto = require('crypto');

const { Schema } = mongoose;
const  ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new Schema(
    {
        email: {type: String, lowercase: true, trim: true, index: true, sparse: true},
        password: String,
        isSupperAdmin: {type: Boolean, default: false},
    },
    {
        collection: 'users'
    }
);

UserSchema.plugin(timestamps)
UserSchema.plugin(modifiedBy)
mongoose_deleted(UserSchema)

UserSchema.pre('save', function (next) {
    if (this.isNew) {
      if (this.password) this.password = this.encryptPassword(this.password)
    }
  
    next()
  }) 
/**
 * Authenticate - check if the passwords are the same
 *
 * @param {String} plainText
 * @return {Boolean}
 * @api public
 */
UserSchema.methods.authenticate = function (plainText) {
    return this.password === this.encryptPassword(plainText)
  }

/**
 * Encrypt password
 *
 * @param {String} password
 * @return {String}
 * @api public
 */
UserSchema.methods.encryptPassword = function (password) {
    if (!password) { return '' }
    return crypto.createHmac('sha1', '').update(password).digest('hex')
  }
  
UserSchema.methods.generatePassword = function (length) {
    var charset = 'abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      retVal = ''
  
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n))
    }
  
    this.password = retVal
  
    return retVal
  }

const User = mongoose.model('user', UserSchema);

module.exports = User