const { Router } = require("express");
const router = Router();

const { items } = require("../utils/dummyData");





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

router.get("/", (req, res) => {
    res.render("items/index", {items: items});
});

module.exports = router;