import { users, products, purchases } from "./database";
import { CATEGORY } from "./database";
// import { createUser } from "./database";
import express, {Request, Response} from "express"
import cors from "cors"
import { TProduct, TPurchase, TUser } from "./types";

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

//Test
app.get('/ping', (req: Request, res:Response) =>{
    res.status(200).send("Pong")
})

//Get all the users
app.get('/users', (req: Request, res:Response) =>{
    res.status(200).send(users)
})

//Get all the products
app.get('/products', (req: Request, res:Response) =>{
    res.status(200).send(products)
})

//Get all the purchases
app.get('/purchases', (req: Request, res:Response) =>{
    res.status(200).send(purchases)
})

//Get product by query
app.get('/products/search', (req: Request, res:Response) =>{
    const q = req.query.q as string

    const result = products.filter((product) =>{
        return product.name.toLowerCase().includes(q.toLowerCase())
        
    })
    res.status(200).send(result)
})

//Add new user
app.post('/users', (req: Request, res:Response) =>{
    const id = req.body.id as string
    const email = req.body.email as string
    const password = req.body.password as string

    const newUser:TUser ={
        id,
        email,
        password
    }

    users.push(newUser)
    res.status(201).send("Usuário cadastrado com sucesso!")
})

//Add new product
app.post('/products', (req: Request, res:Response) =>{
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const category = req.body.category as CATEGORY


    const newProduct:TProduct ={
        id,
        name,
        price,
        category
    }

    products.push(newProduct)
    res.status(201).send("Produto cadastrado com sucesso!")

})

//Add new purchase
app.post('/purchases', (req: Request, res:Response) =>{
    const userId = req.body.userId as string
    const productId = req.body.productId as string
    const productName = req.body.productName as string
    const quantity = req.body.quantity as number
    const totalPrice = req.body.totalPrice as number



    const newPurchase:TPurchase ={
        userId,
        productId,
        productName,
        quantity,
        totalPrice
    }

    purchases.push(newPurchase)
    res.status(201).send("Compra realizada com sucesso!")
})


//Get product by id
app.get("/products/:id", (req: Request, res: Response) =>{
    const id = req.params.id as string
    const itemselecionado = products.find((product) => {
       if(product.id === id){
        return product
       }
    })
    res.status(200).send(itemselecionado)
})

//Get purchase by id
app.get("/users/:id/purchases", (req: Request, res: Response) =>{
    const id = req.params.id as string
    const itemselecionado = purchases.find((purchase) => {
       if(purchase.userId === id){
        return purchase
       }
    })
    res.status(200).send(itemselecionado)
})

//Delete user by id

app.delete("/users/:id/", (req: Request, res: Response) =>{
    const id = req.params.id as string
    const indextodelete = users.findIndex((user) => user.id === id)
    if(indextodelete >= 0){
        users.splice(indextodelete, 1)
    }

    res.status(200).send("Usuário apagado com sucesso!")
})

//Delete product by id
app.delete("/products/:id/", (req: Request, res: Response) =>{
    const id = req.params.id as string
    const indextodelete = products.findIndex((product) => product.id === id)
    if(indextodelete >= 0){
        products.splice(indextodelete, 1)
    }

    res.status(200).send("Produto apagado com sucesso!")
})

//Edit user
app.put("/users/:id", (req: Request, res: Response) =>{
    const id = req.params.id as string
    
    const newId = req.body.id as string
    const newEmail = req.body.email as string
    const newPassword = req.body.password as string

    const userEdit = users.find((user) => user.id === id)

    if(userEdit){
        userEdit.id = newId || userEdit.id
        userEdit.email = newEmail || userEdit.email
        userEdit.password = newPassword || userEdit.password
    }



    res.status(200).send("Usuário editado com sucesso!!")
})

//Edit product
app.put("/products/:id", (req: Request, res: Response) =>{
    const id = req.params.id as string
    
    const newId = req.body.id as string
    const newName = req.body.name as string
    const newPrice = req.body.price as number
    const newCategory = req.body.category as CATEGORY


    const productEdit = products.find((product) => product.id === id)

    if(productEdit){
        productEdit.id = newId || productEdit.id
        productEdit.name = newName || productEdit.name
        productEdit.price = newPrice || productEdit.price
        productEdit.category = newCategory || productEdit.category
    }


    res.status(200).send("Produto editado com sucesso!!")
})

// createUser("Gabriel","gabriel1234@gmail.com", "kaka123" )

// getAllUsers()

// createProduct("F", "Feijão", 25, CATEGORY.ESSENCIAL)

// getAllProducts()

// getProductById("F")
  
// queryProductsByName("Arroz")

// createPurchase("gabriel", "F", "Feijão", 1, 25)

// getAllPurchasesFromUserId("gabriel")


