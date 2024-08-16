const { Router } = require("express");
const router = Router();
const { check, validationResult } = require("express-validator");

const db = require("../db/queries");

/* ------------------------------------ C ----------------------------------- */

const validateItem = [
    check("name").trim()
        .notEmpty().withMessage("Name can not empty")
        .isAlpha('en-US', {ignore: '\s'}).withMessage("Name must contain letters only"),
    check("price").trim()
        .isNumeric().withMessage("Price must be a number")
        .notEmpty().withMessage("Price can not empty"),
    check("seller").trim()
        .notEmpty().withMessage("Seller name can not empty")
        .isAlpha('en-US', {ignore: '\s'}).withMessage("Seller name must contain letters only"),
]

router.post("/createItem", [validateItem, async (req, res) => {
    const { name, price, seller, selectCatgs } = req.body;

    console.log(selectCatgs);

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).render("items/newItem", {values: {name, price, seller}, errors: errors.array()});
    }

    const createdId = await db.createItem(name, parseInt(price), seller);
    await db.createItemCatgRel(createdId, [...selectCatgs])
    res.redirect("/items");
}]);

router.get("/new", async(req, res) => {
    const categories = await db.getAllCategories();
    res.render("items/newItem", {values: {name:"", price:0, seller:""}, catgs:categories});
});

/* ------------------------------------ R ----------------------------------- */

router.get("/:itemId", async (req, res) => {
    const { itemId } = req.params;
    const item = await db.selectFromId("items", itemId);
    res.render("items/view", {item: item});
});

/* ------------------------------------ U ----------------------------------- */

router.get("/:itemId/edit", async (req, res) => {
    const { itemId } = req.params;
    const { name, price, seller_name} = await db.selectFromId("items", itemId);
    const categories = await db.getAllCategories();
    let selectedArr = await db.getItemCategoryRel(itemId);
    selectedArr = selectedArr.map(a => a.categoryid);
    res.render("items/edit", {values: {name, price, seller:seller_name}, itemId, catgs:categories, selCatgs:selectedArr});
});

router.post("/:itemId/update",[validateItem, async (req, res) => {
    const { itemId } = req.params;
    const { name, price, seller, selectCatgs} = req.body;
    const categories = await db.getAllCategories();
    let selectedArr = await db.getItemCategoryRel(itemId);
    selectedArr = selectedArr.map(a => a.categoryid);

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).render("items/edit", {values: {name, price, seller}, errors: errors.array(), itemId, catgs:categories, selCatgs:selectedArr});
    }

    await db.updateItem(itemId, name, price, seller)
    await db.replaceItemCategoryRel(itemId, [...selectCatgs])
    res.redirect("/items/"+itemId);
}]);

/* ------------------------------------ D ----------------------------------- */

router.post("/:itemId/delete", async (req, res) => {
    const { itemId } = req.params;
    await db.deleteFromId("items", itemId);
    res.redirect("/items");
});

/* ---------------------------------- Index --------------------------------- */

router.get("/", async (req, res) => {
    const categories = await db.getAllCategories();
    const selectedCatg = req.query.selectedCatg || 0;
    const items = selectedCatg == 0 ? await db.getAllItems() : await db.getItemsByCategory(selectedCatg);
    res.render("items/index", {items: items, catgs:categories, selCatg:selectedCatg});
});



module.exports = router;