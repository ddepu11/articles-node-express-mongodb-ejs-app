const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const fetch = require("node-fetch");
const morgan = require("morgan");
const {
  save,
  getAll,
  get,
  deleteOne,
  search,
} = require("./models/articleModel");

const app = express();

const PORT = process.env.PORT || 5000;

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
    app.listen(PORT, () => {
      console.log(`Server is listing to port: ${PORT}`);
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
app.use(morgan("dev"));

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

app.get("/article/search/q=:keyword", async (req, res) => {
  const { keyword } = req.params;

  try {
    const articles = await search(keyword.trim());
    // console.log(articles);
    if (articles) {
      res.json({ ok: true, articles });
    } else {
      res.status(404).json({ ok: false });
    }
    // console.log(articles);
  } catch (error) {
    console.log(error);
  }
});

app.get("/article/create", (req, res) => {
  res.render("articles/newArticle", { title: "New Article" });
});

app.get("/article/:id/:views", async (req, res) => {
  const { id, views } = req.params;
  // views is string remember that
  let increaseViews = +views + 1;
  try {
    const article = await get(id, increaseViews);
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

app.delete("/article/delete/:id", async (req, res) => {
  const id = req.params.id.trim();

  try {
    const response = await deleteOne(id);

    if (response) {
      res.json({ ok: true, redirect: "/" });
    } else {
      res.json({ ok: false });
    }
  } catch (error) {
    console.log(error);
    res.statuc(404).json({ ok: false });
  }
});
