// Loading modules
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const admin = require("./routes/admin");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
require("./models/Postagem");
const Postagem = mongoose.model("postagens");

// ########## Configurations ##########
// Session
app.use(
  session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true
  })
);
app.use(flash());
// Middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});
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
/*app.use((req, res, next) => {
   //Isto é um middleware.
  console.log("Middleare ativado");
  next(); // Sem o next a aplicação pára.
}); */
// ########## Routes ##########
app.get("/", (req, res) => {
  Postagem.find()
    .lean()
    .populate("categoria")
    .sort({ data: "desc" })
    .then(postagens => {
      res.render("index", { postagens: postagens });
    })
    .catch(err => {
      req.flash("error_msg", "Houve um erro interno");
      res.redirect("/404");
    });
});

app.get("/404", (req, res) => {
  res.send("Erro 404!");
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
