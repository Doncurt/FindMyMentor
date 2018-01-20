var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MentorPostSchema = new Schema({
  name             : { type: String, required: true }
  , socialLink1             : { type: String, required: true }
  , socialLink2             : { type: String, required: false }
  , summary         : { type: String, required: true }
  , interest1        : { type: String, required: true }
  , interest2        : { type: String, required: false }
  , interest3        : { type: String, required: false }
, comments       : [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
, author         : { type: Schema.Types.ObjectId, ref: 'User', required: false }
});
// Autopopulation
const autoPopulatePosts = function(next) {
  this.populate('comments').populate('author');
  next();
};

MentorPostSchema.
  pre('find', autoPopulatePosts).
  pre('findOne', autoPopulatePosts);

module.exports = mongoose.model('MentorPost', MentorPostSchema);
