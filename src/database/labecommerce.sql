-- Active: 1680527572141@@127.0.0.1@3306

CREATE TABLE users (
	id INTEGER PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL
);

INSERT INTO users(id, name, email, password)
VALUES(1, "Gabriel", "gabriel123@gmail.com", "gabriel123"),
(2, "Joao", "joao123@gmail.com", "joao123"),
(3, "Felipe", "felipe123@gmail.com", "felipe123");


CREATE TABLE products (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
	price REAL NOT NULL,
	category TEXT NOT NULL,
	type TEXT NOT NULL
);

INSERT INTO products(id, name, price, category, type)
VALUES("1", "Arroz", 10.10, "Essencial", "A"),
("2", "Macarrão", 3.50, "Normal", "M"),
("3", "Feijão", 8, "Essencial", "F"),
("4", "Coca-Cola", 9, "Normal", "C"),
("5", "Shampoo", 8.50, "Cosmetico", "S");


-- get all users
SELECT * FROM users;

-- get all products
SELECT * FROM products;

-- Search product by id
SELECT * FROM products WHERE id = "A";

-- Create user
INSERT INTO users(id, name,email, password) VALUES(
	4, "Lucas", "lucas123@gmail.com", "lucas123"
);

-- Create new product
INSERT INTO products(id, name,price, category, type) VALUES(
	"6", "Abacaxi", 4.5, "Essencial", "A"
);

-- Get product by id
SELECT * FROM products WHERE id = "4";

-- Delete user by id
DELETE FROM users WHERE id = 4;

-- Delete product by id
DELETE FROM products WHERE id = "4";

-- Edit user by id
UPDATE users SET name = "Lucas", email = "lucasnovoemail@gmail.com", password = "lucasnovo123"
WHERE id = 2;

-- Edit product by id
UPDATE products SET name = "Figo", 
price = 10, 
category = "normal"
WHERE id = 3;

-- Get all users ordered by email
SELECT * FROM users ORDER BY email ASC;

-- Get all products ordered by price with 20 items of limit
SELECT * FROM products ORDER BY price ASC LIMIT 20 OFFSET 1;

-- Get all products using space between the prices
SELECT * FROM products WHERE price >= 5 AND price <= 10 ORDER BY price ASC

-- Formas de atualizar dados:

-- Atualizar somente 1 dado por vez:
-- UPDATE users
-- SET password = "bananinha123"
-- WHERE id = 1;


-- Atualizando 2 dados por vez:
-- UPDATE users - pega a tabela users
-- SET - comando para colocar os valores
-- 	email = "fulana@outro-email.com",
-- 	password = "fulana00" - substitui colocando os novos dados
-- WHERE id = 2; - procura quem vai atualizar


-- Deletar 1 item pelo id:
-- DELETE FROM users
-- WHERE id = 3;

-- Deletar a tabela toda:
-- DROP TABLE users;