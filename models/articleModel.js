const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    title: { type: String, required: true },
    relatedTo: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);

async function save(data) {
  const article = new Article(data);
  const result = await article.save();
  return result;
}

module.exports = {
  save,
};
