const express = require("express");
const router = express.Router();
const mongoose = require("mongoose"); //Chama o mongoose
require("../models/Categoria"); //Chama o arquivo do model
const Categoria = mongoose.model("categorias"); //Chama essa função que passa a referencia do model para uma variável

router.get("/", (req, res) => {
  res.render("admin/index");
});

router.get("/posts", (req, res) => {
  res.send("Página de posts");
});

router.get("/categorias", (req, res) => {
  res.render("admin/categorias");
});

router.get("/categorias/add", (req, res) => {
  res.render("admin/addcategorias");
});

router.post("/categorias/nova", (req, res) => {
  const novaCategoria = {
    nome: req.body.nome,
    slug: req.body.slug
  };

  new Categoria(novaCategoria)
    .save()
    .then(() => {
      console.log("Categoria salva com sucesso");
    })
    .catch(err => {
      console.log("Erro ao salvar categoria");
    });
});

module.exports = router;
