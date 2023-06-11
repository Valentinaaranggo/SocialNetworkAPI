//imports express module
const express = require("express");
//establishes db
const db = require("./config/connection");
//imports the routes which contains the logic for the routing
const routes = require("./routes");
//allows server to use the environment variable PORT
const PORT = process.env.PORT || 3002;
const app = express();
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//sets up routing for the application
app.use("/", routes);

db.once("open", () => {
  console.log("mongodbconnected");
  app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
  });
});