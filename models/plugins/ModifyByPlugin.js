const {pathOr, isNil, assoc} = require('ramda')
const mongoose = require('mongoose'), 
  Schema = mongoose.Schema

module.exports = function ModifiedByPlugin (schema, options) {
  schema.add({
    createdBy: {type: Schema.Types.ObjectId, ref: 'user'},
    updatedBy: {type: Schema.Types.ObjectId, ref: 'user'}
  })

  schema.pre('save', function (next) {
    const user = pathOr(null, ['global', 'user'], {})
    if (user) {
      if (!this.createdBy) this.createdBy = user._id
      this.updatedBy = user._id
    }

    // via ramda: this = when(pipe(always(user),isNil, not), pipe(assoc('updatedBy', user._id),when(pipe(prop('createdBy'), isNil), assoc('createdBy', user._id))))(this)
    next()
  })
}
