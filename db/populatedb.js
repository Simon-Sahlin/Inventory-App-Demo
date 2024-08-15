const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255), 
    price INT, 
    seller_name VARCHAR(255)
);

INSERT INTO items (name, price, seller_name) 
VALUES 
    ('Cheese', 12, 'Ica'), 
    ('Eggs', 8, 'Ica'), 
    ('Bacon', 3, 'Ica'), 
    ('Milk', 6.5, 'Coop'), 
    ('Orange Juice', 8, 'Coop')
;


CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255)
);

INSERT INTO categories (name) 
VALUES 
    ('Dairy'), 
    ('Protein'), 
    ('Drinks')
;

CREATE TABLE IF NOT EXISTS items_categories_rel (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  itemId INT, 
  categoryId INT
);

INSERT INTO items_categories_rel (itemId, categoryId) 
VALUES 
    (1, 1), 
    (2, 2), 
    (3, 2),
    (4, 1),
    (4, 3),
    (5, 3)
;

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://postgres:password@localhost:5432/inventory_app_db",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
