const express = require("express");
const route = express.Router();
const {
  searchBlog,
  renderCreateForm,
  articleDetails,
  createBlog,
  deleteBlog,
} = require("../controllers/articleController");

// @desc  Search an article by keyword
// @route  GET /article/search/q=:keyword
route.get("/search/q=:keyword", searchBlog);

//@desc SHow an Create an article Page
//@route GET /article/create
route.get("/create", renderCreateForm);

//@desc  View Article by using ID
//@route  GET /article/:id/:views
route.get("/:id/:views", articleDetails);

//@desc  Create an Article
//@route  POST /article/create
route.post("/create", createBlog);

//@desc  Delete an article
//@route  DELETE /article/delete/:id
route.delete("/delete/:id", deleteBlog);

module.exports = route;
