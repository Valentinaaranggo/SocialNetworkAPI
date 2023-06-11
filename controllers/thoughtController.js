const { User, Thought } = require("../models");

const thoughtController = {
  getThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "reaction",
        select: "-__v",
      })
      .select("-__v")
      .then((allThoughts) => {
        res.status(200).json(allThoughts);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  getThoughtId({ params }, res) {
    Thought.findOne({ _id: params.thought_id })
      .populate({
        path: "reaction",
        select: "-__v",
      })
      .select("-__v")
      .then((singleThought) => {
        if (!singleThought) {
          return res.status(404).json({ message: "Try another id." });
        }
        res.status(200).json(singleThought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  postThought({ body }, res) {
    Thought.create(body)
      .then((createThought) => {
        return User.findOneAndUpdate(
          { _id: body.user_id },
          { $push: { thought: createThought.id } },
          { new: true }
        );
      })
      .then((userThought) => {
        if (!userThought) {
          res.status(404).json({ message: "Thought posted" });
          return;
        }
        res.status(200).json(userThought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thought_id },
      body,
      { new: true, runValidators: true }
    )
      .then((updatedThought) => {
        if (!updatedThought) {
          res.status(404).json({ message: "Please try a different id." });
          return;
        }
        res.status(200).json(updatedThought);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thought_id })
      .then((delThought) => {
        if (!delThought) {
          return res.status(404).json({ message: "Please try a different id." });
        }
        return User.findOneAndUpdate(
          { thought: params.id },
          { $pull: { thoughts: params.id } },
          { new: true }
        );
      })
      .then(() => {
        res.status(200).json({ message: "Thought deleted" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thought_id },
      { $addToSet: { reaction: body } },
      { new: true, runValidators: true }
    )
      .then((getThought) => {
        if (!getThought) {
          return res.status(404).json({ message: "Please try a different id." });
        }
        res.status(200).json(getThought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  delReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thought_id },
      { $pull: { reaction: { _id: params.react_id } } },
      { new: true }
    )
      .then((delReact) => {
        if (!delReact) {
          return res.status(404).json({ message: "Try a different id." });
        }
        res.status(200).json({ message: "Reaction deleted." });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;