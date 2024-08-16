const pool = require("./pool");

async function getAllItems() {
    const { rows } = await pool.query("SELECT * FROM items");
    return rows;
}

async function getItemsByCategory(catId){
    const { rows } = await pool.query("SELECT * FROM items_categories_rel INNER JOIN items ON items_categories_rel.itemId = items.id WHERE categoryId = $1", [catId]);
    return rows;
}

async function createItem(name, price, seller_name){
    let { rows } = await pool.query("INSERT INTO items (name, price, seller_name) VALUES ($1, $2, $3) RETURNING id", [name, price, seller_name]);
    return rows[0].id;
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

async function updateCategory(id, name){
    await pool.query("UPDATE categories SET name=$1 WHERE id=$2", [name, id])
}

/* ------------------------------------ - ----------------------------------- */

async function createItemCatgRel(id, catgs){
    let vString = "INSERT INTO items_categories_rel (itemId, categoryId) VALUES ";
    catgs.forEach(catg=>{
        vString += "("+id+","+catg+"),";
    });
    vString = vString.slice(0,-1);
    await pool.query(vString);
}

async function getItemCategoryRel(itemId){
    const { rows } = await pool.query("SELECT * FROM items_categories_rel WHERE itemId=$1", [itemId]);
    return rows;
}

async function replaceItemCategoryRel(id, catgs){
    await pool.query("DELETE FROM items_categories_rel WHERE itemId=$1", [id])
    await createItemCatgRel(id, catgs);
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
    deleteFromId,
    updateCategory,
    getItemsByCategory,
    createItemCatgRel,
    getItemCategoryRel,
    replaceItemCategoryRel
};