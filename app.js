const express = require("express");
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 5000;
const HOSTNAME = process.env.HOSTNAME || "localhost";

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is up and running on http://${HOSTNAME}:${PORT}`);
});

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("articles/index", {
    title: "Home",
  });
});

app.get("/article/create", (req, res) => {
  res.render("articles/newArticle", { title: "New Article" });
});
