const { Router } = require("express");
const router = Router();
const { check, validationResult } = require("express-validator");


const db = require("../db/queries");






const validateCategory = [
    check("name").trim()
        .notEmpty().withMessage("Name can not empty")
        .isAlpha('en-US', {ignore: '\s'}).withMessage("Name must contain letters only"),
]

router.post("/new", [validateCategory, async (req, res) => {
    const { name } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).render("categories/newCategory", {values: {name}, errors: errors.array()});
    }

    await db.createCategory(name);
    res.redirect("/categories");
}]);



router.get("/new", (req, res) => {
    res.render("categories/newCategory", {values: {name:"", price:0, seller:""}});
});



router.get("/", async (req, res) => {
    const categories = await db.getAllCategories();
    res.render("categories/index", {categories: categories});
});

module.exports = router;