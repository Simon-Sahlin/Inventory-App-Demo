const { Router } = require("express");
const router = Router();
const { check, validationResult } = require("express-validator");


const db = require("../db/queries");




/* ------------------------------------ C ----------------------------------- */

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

/* ------------------------------------ R ----------------------------------- */

router.get("/:categoryId", async (req, res) => {
    const { categoryId } = req.params;
    const category = await db.selectFromId("categories", categoryId);
    res.render("categories/view", {category: category});
});

/* ------------------------------------ U ----------------------------------- */

router.get("/:categoryId/edit", async (req, res) => {
    const { categoryId } = req.params;
    const { name } = await db.selectFromId("categories", categoryId);
    res.render("categories/edit", {values: {name}, categoryId});
});


router.post("/:categoryId/update",[validateCategory, async (req, res) => {
    const { categoryId } = req.params;
    const { name } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).render("categories/edit", {values: {name}, errors: errors.array(), categoryId});
    }

    await db.updateCategory(categoryId, name)
    res.redirect("/categories/"+categoryId);
}]);

/* ------------------------------------ D ----------------------------------- */

router.post("/:categoryId/delete", async (req, res) => {
    const { categoryId } = req.params;
    await db.deleteFromId("categories", categoryId);
    res.redirect("/categories");
});

/* ---------------------------------- Index --------------------------------- */


router.get("/", async (req, res) => {
    const categories = await db.getAllCategories();
    res.render("categories/index", {categories: categories});
});

module.exports = router;