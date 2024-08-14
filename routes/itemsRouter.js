const { Router } = require("express");
const router = Router();
const { check, validationResult } = require("express-validator");

const db = require("../db/queries");

/* ------------------------------------ - ----------------------------------- */

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
    const { name, price, seller } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).render("items/newItem", {values: {name, price, seller}, errors: errors.array()});
    }

    await db.createItem(name, parseInt(price), seller);
    res.redirect("/items");
}]);


router.get("/new", (req, res) => {
    res.render("items/newItem", {values: {name:"", price:0, seller:""}});
});

/* ------------------------------------ - ----------------------------------- */

router.get("/:itemId", async (req, res) => {
    const { itemId } = req.params;
    const item = await db.selectFromId("items", itemId);
    res.render("items/view", {item: item});
});

/* ------------------------------------ - ----------------------------------- */

router.get("/:itemId/edit", async (req, res) => {
    const { itemId } = req.params;
    const { name, price, seller_name} = await db.selectFromId("items", itemId);
    res.render("items/edit", {values: {name, price, seller:seller_name}, itemId});
});


router.post("/:itemId/update",[validateItem, async (req, res) => {
    const { itemId } = req.params;
    const { name, price, seller } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).render("items/edit", {values: {name, price, seller}, errors: errors.array(), itemId});
    }

    await db.updateItem(itemId, name, price, seller)
    res.redirect("/items/"+itemId);
}]);

router.post("/:itemId/delete", (req, res) => {
    const { itemId } = req.params;
    db.deleteFromId("items", itemId);
    res.redirect("/items");
});

/* ------------------------------------ - ----------------------------------- */

router.get("/", async (req, res) => {
    items = await db.getAllItems()
    res.render("items/index", {items: items});
});



module.exports = router;