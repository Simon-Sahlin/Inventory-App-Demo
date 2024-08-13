const { Router } = require("express");
const router = Router();

const db = require("../db/queries");

router.get("/", async (req, res) => {
    const categories = await db.getAllCategories();
    res.render("categories/index", {categories: categories});
});

module.exports = router;