const pool = require("./pool");

async function getAllItems() {
    const { rows } = await pool.query("SELECT * FROM items");
    return rows;
}

async function createItem(name, price, seller_name){
    await pool.query("INSERT INTO items (name, price, seller_name) VALUES ($1, $2, $3)", [name, price, seller_name]);
}

async function getAllCategories() {
    const { rows } = await pool.query("SELECT * FROM categories");
    return rows;
}

async function createCategory(name){
    await pool.query("INSERT INTO categories (name) VALUES ($1)", [name]);
}


module.exports = {
    getAllItems,
    createItem,
    getAllCategories,
    createCategory,
};