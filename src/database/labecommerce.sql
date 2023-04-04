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

SELECT * FROM users;

CREATE TABLE products (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
	price REAL NOT NULL,
	category TEXT NOT NULL
);

INSERT INTO products(id, name, price, category)
VALUES("A", "Arroz", 10.10, "Essencial"),
("M", "Macarrão", 3.50, "Normal"),
("F", "Feijão", 8, "Essencial"),
("C", "Coca-Cola", 9, "Normal"),
("S", "Shampoo", 8.50, "Cosmetico");

SELECT * FROM products;


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