var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var MenteeReplySchema = new Schema({
  content             : { type: String, required: true }
  , MenteeReply       : [{ type: Schema.Types.ObjectId, ref: 'MenteeReply' }]
});

var autoPopulateMenteeReply = function(next) {
  this.populate('MenteeReply');
  next();
};
MenteeReplychema.
  pre('find', autoPopulateMenteeReply).
  pre('findOne', autoPopulateMenteeReply);
module.exports = mongoose.model('MenteeReply', MenteeReplySchema);
