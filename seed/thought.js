const { Thought } = require("../models");

const seedThought = async () => {
  const thought = await Thought.create({
    thoughtText: "I need 8hrs of sleep",
    username: "valea28",
  });
  console.log(thought);
};

module.exports = seedThought;