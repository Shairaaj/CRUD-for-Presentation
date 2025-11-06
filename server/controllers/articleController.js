const articleModel = require("../models/articleModel"); // adjust the path as needed

// Create a new article
const createArticle = async (req, res) => {
  try {
    // const { title, description } = req.body;

    // if (!title || !description) {
    //   return res.status(400).json({ message: "Title and description are required" });
    // }

    // const newArticle = new articleModel({
    //   title,
    //   description
    // });

    // await newArticle.save();

    const newArticle = await articleModel.create(req.body);

    res.status(201).json({
      message: "Article created successfully",
      article: newArticle
    });
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all articles
const getAllArticles = async (req, res) => {
  try {
    const articles = await articleModel.find();
    res.status(200).json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Update article by ID
const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedArticle = await articleModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true}
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({
      message: "Article updated successfully",
      article: updatedArticle
    });
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete article by ID
const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedArticle = await articleModel.findByIdAndDelete(id);

    if (!deletedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createArticle, getAllArticles, updateArticle, deleteArticle };
