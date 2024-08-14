const pool = require("./pool");

async function getAllItems() {
    const { rows } = await pool.query("SELECT * FROM items");
    return rows;
}

async function createItem(name, price, seller_name){
    await pool.query("INSERT INTO items (name, price, seller_name) VALUES ($1, $2, $3)", [name, price, seller_name]);
}

async function updateItem(id, name, price, seller_name){
    await pool.query("UPDATE items SET name=$1, price=$2, seller_name=$3 WHERE id=$4", [name, price, seller_name, id])
}

/* ------------------------------------ - ----------------------------------- */

async function getAllCategories() {
    const { rows } = await pool.query("SELECT * FROM categories");
    return rows;
}

async function createCategory(name){
    await pool.query("INSERT INTO categories (name) VALUES ($1)", [name]);
}

/* ------------------------------------ - ----------------------------------- */

async function selectFromId(table, id){
    const { rows } = await pool.query("SELECT * FROM "+table+" WHERE id=" + id);
    return rows[0];
}

async function deleteFromId(table, id){
    await pool.query("DELETE FROM "+table+" WHERE id=$1", [id]);
}


module.exports = {
    getAllItems,
    createItem,
    getAllCategories,
    createCategory,
    selectFromId,
    updateItem,
    deleteFromId
};