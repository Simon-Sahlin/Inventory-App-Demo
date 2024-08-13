const pool = require("./pool");

async function getAllItems() {
  const { rows } = await pool.query("SELECT * FROM items");
  return rows;
}

async function getAllCategories() {
    const { rows } = await pool.query("SELECT * FROM categories");
    return rows;
  }

module.exports = {
    getAllItems,
    getAllCategories
};