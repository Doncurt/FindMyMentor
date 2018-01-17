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
, menteeReply       : [{ type: Schema.Types.ObjectId, ref: 'MenteeReply' }]
, author         : { type: Schema.Types.ObjectId, ref: 'User', required: false }
});

module.exports = mongoose.model('MentorPost', MentorPostSchema);
