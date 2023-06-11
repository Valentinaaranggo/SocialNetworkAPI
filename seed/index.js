const db = require("../config/connection");
const seedUsers = require("./user");
const seedThoughts = require("./thought");

const seed = async () => {
  db.once("open", () => console.log("connected to db for seeding"));
  await seedUsers();
  await seedThoughts();
  process.exit(0);
};

seed();