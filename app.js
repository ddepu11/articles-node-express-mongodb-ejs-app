const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;
const HOSTNAME = process.env.HOSTNAME || "localhost";

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is up and running on http://${HOSTNAME}:${PORT}`);
});

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("articles/index", { title: "Articles" });
});
