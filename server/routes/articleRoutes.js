const express = require("express");
const { createArticle, getAllArticles, updateArticle, deleteArticle } =  require("../controllers/articleController.js");

const router = express.Router();

router.post("/", createArticle);
router.get("/", getAllArticles);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);

module.exports = router;
