// Loading modules
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const admin = require("./routes/admin");
const path = require("path");
const mongoose = require("mongoose");

// ########## Configurations ##########
// ##### Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// ##### Handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// ##### Mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blogapp").then(() => {
  console.log("Conected to MONGO").catch(err => {
    console.log("Erro ao se conectar: " + err);
  });
});
// ##### Public
app.use(express.static(path.join(__dirname, "public"))); // Gets the absolute path to the directory "public"
// ########## Routes ##########
app.get("/", (req, res) => {
  res.send("Rota principal");
});

app.get("/posts", (req, res) => {
  res.send("Rota posts");
});

app.use("/admin", admin);
// Other

const PORT = 8081;
app.listen(PORT, () => {
  console.log("Server is running!");
});
