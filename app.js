const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const articleRoute = require("./routes/articleRoutes");
const { AllBlogs } = require("./controllers/articleController");
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

// For req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Logger
app.use(morgan("dev"));

// @desc  Get all articles in index page
// @route  GET /
app.get("/", AllBlogs);

app.use("/article", articleRoute);
