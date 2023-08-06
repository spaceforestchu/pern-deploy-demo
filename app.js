// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

const bookmarksController = require("./controllers/bookmarkController.js");
const reviewsController = require("./controllers/reviewsController.js");
// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Bookmarks App");
});

// Bookmarks ROUTES

app.use("/bookmarks", bookmarksController);
app.use("/reviews", reviewsController);
// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.use((error, req, res, next) => {
  if (error.statusCode === 404) {
    res.status(error.statusCode).json(error);
  }
});

// EXPORT
module.exports = app;
