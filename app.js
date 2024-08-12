const express = require("express");
const app = express();

const path = require("node:path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetPath = path.join(__dirname, "public");
app.use(express.static(assetPath));

app.use(express.urlencoded({ extended: true }));


const indexRouter = require("./routes/indexRouter");
const itemsRouter = require("./routes/itemsRouter");
const categoriesRouter = require("./routes/categoriesRouter");


app.use("/items", itemsRouter);
app.use("/categories", categoriesRouter);
app.use("/", indexRouter);


const PORT = 6969;
app.listen(PORT, ()=> console.log(`YIPPI!! Express app - listening on port ${PORT}`));