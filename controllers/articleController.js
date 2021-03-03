const {
  save,
  get,
  deleteOne,
  search,
  getAll,
} = require("../models/articleModel");

const AllBlogs = async (req, res) => {
  try {
    const articles = await getAll();
  } catch (error) {
    console.log(error);
  }

  res.render("articles/index", {
    title: "Home",
    articles,
  });
};

const searchBlog = async (req, res) => {
  const { keyword } = req.params;

  try {
    const articles = await search(keyword.trim());

    if (articles) {
      res.json({ ok: true, articles });
    } else {
      res.status(404).json({ ok: false });
    }
  } catch (error) {
    console.log(error);
  }
};

const renderCreateForm = async (req, res) => {
  res.render("articles/newArticle", { title: "New Article" });
};

const articleDetails = async (req, res) => {
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
};

const createBlog = async (req, res) => {
  try {
    const result = await save(req.body);
    res.json({ ok: true, redirect: "/" });
  } catch (error) {
    res.json({ ok: false, msg: error._message });
    console.log(error);
  }
};

const deleteBlog = async (req, res) => {
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
};

module.exports = {
  AllBlogs,
  searchBlog,
  renderCreateForm,
  articleDetails,
  createBlog,
  deleteBlog,
};
