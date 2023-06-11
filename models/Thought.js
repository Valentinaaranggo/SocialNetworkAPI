
const Moment = require("moment");
const {Schema, model, SchemaTypes }= require('mongoose');

const userReaction = new Schema({
  reactionId: {
    type:SchemaTypes.ObjectId,
    default: () => {
      new Types.ObjectId();
    },
  },
  reactionText: {
    type: String,
    require: true,
    minlength: 1,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdDate) => Moment(createdDate).format("MMM DD, YYYY"),
    immutable: true,
  },
});

const userThought = new Schema(
  {
    thoughtText: {
      type: String,
      require: true,
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdDate) => Moment(createdDate).format("MMM DD, YYYY"),
      immutable: true,
    },
    reaction: [userReaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

userThought.virtual("reactionCount").get(function () {
  return this.reaction.length;
});

const Thought = model("Thought", userThought);

module.exports = Thought;