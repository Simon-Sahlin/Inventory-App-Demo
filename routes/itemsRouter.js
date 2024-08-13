const { Router } = require("express");
const router = Router();

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


router.post("/createItem", (req, res) => {
    res.send("WIP")
});

router.get("/new", (req, res) => {
    res.render("items/newItem");
});

router.get("/", async (req, res) => {
    items = await db.getAllItems()
    res.render("items/index", {items: items});
});

module.exports = router;