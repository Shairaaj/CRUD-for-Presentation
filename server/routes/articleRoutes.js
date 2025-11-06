const express = require("express");
const { createArticle, getAllArticles, getArticleById, updateArticle, deleteArticle } =  require("../controllers/articleController.js");

const router = express.Router();

router.post("/", createArticle);
router.get("/", getAllArticles);
router.get("/:id", getArticleById);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);

module.exports = router;
