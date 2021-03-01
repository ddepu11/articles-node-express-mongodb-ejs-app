const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    title: { type: String, required: true },
    relatedTo: { type: String, required: true },
    body: { type: String, required: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);

// Create an aricle
async function save(data) {
  const article = new Article(data);

  try {
    const result = await article.save();
    return result;
  } catch (error) {
    console.log(error);
  }
}

// Fetchs all the articles
async function getAll() {
  try {
    return (articles = await Article.find({}).sort({ createdAt: -1 }));
  } catch (error) {
    console.log(error);
  }
}

async function get(id) {
  try {
    const article = await Article.findByIdAndUpdate(id);
    return article;
  } catch (error) {
    console.log(error);
  }
}
async function deleteOne(id) {
  try {
    return await Article.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  save,
  getAll,
  get,
  deleteOne,
};
