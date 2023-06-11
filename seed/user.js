const  { User } = require("../models");

const seedUser = async () => {
  const user = await User.create({
    username: "valea25",
    email: "valea25@gmail.com" });
  console.log(user);
};

module.exports = seedUser;