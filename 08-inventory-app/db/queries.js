const pool = require("./pool")

async function getCategoryList() {
    const {rows} = await pool.query("SELECT * FROM categories")
    return rows
} 

async function insertCategoryList(category) {
    await pool.query("INSERT INTO categories (category) VALUES ($1)", [category])
}

module.exports = {
    getCategoryList,
    insertCategoryList
}