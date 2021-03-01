const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const fetch = require("node-fetch");
const { save, getAll, get } = require("./models/articleModel");

const app = express();

const PORT = process.env.PORT || 5000;
const HOSTNAME = process.env.HOSTNAME || "localhost";

const dbURI =
  "mongodb+srv://ddepu11:articles1234@cluster0.b4ktt.mongodb.net/article-database?retryWrites=true&w=majority";

connectToDB();
async function connectToDB() {
  try {
    const connection = await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Contected To DB");
    app.listen(PORT, HOSTNAME, () => {
      console.log(`Server is up and running on http://${HOSTNAME}:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

// Setting view engine
app.set("view engine", "ejs");

// Serve Static files
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  try {
    const articles = await getAll();
  } catch (error) {
    console.log(error);
  }

  res.render("articles/index", {
    title: "Home",
    articles,
  });
});

app.get("/article/create", (req, res) => {
  res.render("articles/newArticle", { title: "New Article" });
});

app.get("/article/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const article = await get(id);
    if (article) {
      res.render("articles/details", {
        article,
        title: article.relatedTo,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/article/create", async (req, res) => {
  try {
    const result = await save(req.body);
    res.json({ ok: true, redirect: "/" });
  } catch (error) {
    res.json({ ok: false, msg: error._message });
    console.log(error);
  }
});
