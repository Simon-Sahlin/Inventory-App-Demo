const { Router } = require("express");
const router = Router();

const { categories } = require("../utils/dummyData");

router.get("/", (req, res) => {
    res.render("categories/index", {categories: categories});
});

module.exports = router;