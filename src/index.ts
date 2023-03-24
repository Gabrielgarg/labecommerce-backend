import { users, products, purchases, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database";
import { CATEGORY } from "./database";
import { createUser } from "./database";

createUser("Gabriel","gabriel1234@gmail.com", "kaka123" )

getAllUsers()

createProduct("F", "Feijão", 25, CATEGORY.ESSENCIAL)

getAllProducts()

getProductById("F")
  
queryProductsByName("Arroz")

createPurchase("gabriel", "F", "Feijão", 1, 25)

getAllPurchasesFromUserId("gabriel")
