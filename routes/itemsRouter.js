const { Router } = require("express");
const router = Router();
const { check, validationResult } = require("express-validator");

const db = require("../db/queries");





// router.get("/:itemId/editItem", (req, res) => {
//     res.send("WIP")
// });

// router.post("/:itemId/updateItem", (req, res) => {
//     res.send("WIP")
// });

// router.post("/:itemId/deleteItem", (req, res) => {
//     res.send("WIP")
// });

// router.get("/:itemId", (req, res) => {
//     res.send("WIP")
// });

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

router.get("/", async (req, res) => {
    items = await db.getAllItems()
    res.render("items/index", {items: items});
});

module.exports = router;