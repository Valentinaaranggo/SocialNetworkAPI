const { User, Thought } = require("../models");

const userController = {
  getUsers(req, res) {
    User.find({})
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((getUser) => {
        res.status(200).json(getUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  getUserId({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((specificUser) => {
        console.log(specificUser);

        if (!specificUser) {
          res.status(404).json({ message: "Try a different id." });
          return;
        }
        res.status(200).json(specificUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  postUser({ body }, res) {
    User.create(body)
      .then((newUser) => {
        res.status(200).json(newUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((updateUser) => {
        if (!updateUser) {
          res.status(404).json({ message: "Try a different id." });
          return;
        }
        res.status(200).json(updateUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((delUser) => {
        if (!delUser) {
          res.status(404).json({ message: "Try a different id." });
          return;
        }

        User.updateMany(
          { _id: { $in: delUser.friends } },
          { $pull: { friends: params.id } }
        ).then(() => {
          Thought.deleteMany({ username: delUser.username }).then(() => {
            res.status(200).json({ message: "Deleted user." });
          });
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
      });
  },

  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((addFriend) => {
        if (!addFriend) {
          return res.status(404).json({ message: "Try a different id." });
        }
        res.status(200).json(addFriend);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((delFriend) => {
        if (!delFriend) {
          return res.status(404).json({ message: "Try a different id." });
        }
        res.status(200).json(delFriend);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = userController;