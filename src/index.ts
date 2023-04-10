import { users, products, purchases } from "./database";
import { CATEGORY } from "./database";
// import { createUser } from "./database";
import express, {Request, Response} from "express"
import cors from "cors"
import { TProduct, TPurchase, TUser } from "./types";
import { db } from "./database/knex";

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
app.get('/users', async (req: Request, res:Response) =>{
    try {
        const result = await db.raw(`SELECT * FROM users;`)
        res.status(200).send(result)
    } catch (error) {
        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro")
        }

        if(error instanceof Error){

            res.send(error.message)
        }
        else{
            console.log("Erro inesperado.")
        }
    }
})

//Get all the products
app.get('/products', async (req: Request, res:Response) =>{
    try {
        const result = await db.raw(`SELECT * FROM products;`)
        res.status(200).send(result)
    } catch (error) {
        //Verifica se deu algum erro imprevisto no servidor
        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro")
        }

        //Verifica se o erro já tem nos classe "Erro" 
        if(error instanceof Error){

            res.send(error.message)
        }
        else{
            console.log("Erro inesperado.")
        }

    }
})

//Get all the purchases
app.get('/purchases', async (req: Request, res:Response) =>{
    try {
        const result = await db.raw(`SELECT * FROM purchases;`)
        res.status(200).send(result)
    } catch (error) {
        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro")
        }

        if(error instanceof Error){

            res.send(error.message)
        }
        else{
            console.log("Erro inesperado.")
        }
    }
})

//Get product by query name
app.get('/products/search/', async (req: Request, res:Response) =>{
    try {
        const q = req.query.q as string

        //Inserindo usando o knex
        if(q.length >= 1){
            const result = await db.raw(`SELECT * FROM products WHERE name = "${q}";`)
            res.status(200).send(result)
        }
    
        //--Inserindo de forma manual
        // if(q.length >= 1){
        //     const result = products.filter((product) =>{
        //         return product.name.toLowerCase().includes(q.toLowerCase())
                
        //     })
        //     res.status(200).send(result)
        // }
        //--Inserindo de forma manual

        else{
            res.status(400).send("O minimo do tamanho da string é 1.")
        }

    } catch (error) {
        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro")
        }

        if(error instanceof Error){

            res.send(error.message)
        }
        else{
            console.log("Erro inesperado.")
        }
    }
})

//Add new user
app.post('/users', async (req: Request, res:Response) =>{
    try {
        
        const id = req.body.id as number| undefined
        const name = req.body.name as string | undefined
        const email = req.body.email as string| undefined
        const password = req.body.password as string| undefined
    
        if(id !== undefined && email !== undefined && password !== undefined){
            
            const [jatemesseid] = await db.raw(`SELECT * FROM users WHERE id = "${id}";`)
            const [jatemesseemail] = await db.raw(`SELECT * FROM users WHERE email = "${email}";`)

            //Usando forma manual
            // const jatemesseid = products.find((product) => product.id === id)
            // const jatemesseemail = products.find((product) => product.email === email)
    
            if(typeof id !== "number" || typeof email !== "string" || typeof password !== "string" || typeof name !== "string"){
                res.status(400)
                throw new Error("O valor 'id' tem que ser number ou 'email' ou 'password' ou 'name' tem que ser string.")
            }
            
            if(jatemesseemail){
                res.status(400)
                throw new Error("Esse e-mail já está sendo utilizado.")
            }
        
            if(jatemesseid){
                    res.status(400)
                    throw new Error("Usuário já cadastrado.")
                }
            
            // Usando forma manual
            // const newUser:TUser ={
            //         id,
            //         email,
            //         password
            // }
            
            //Inserindo usando o knex
            await db.raw(`INSERT INTO users(id, name,email, createdAt, password) VALUES(
                "${id}", "${name}", "${email}", DATETIME('now'), "${password}");`)
            res.status(201).send("Usuário cadastrado com sucesso!")

            //Usando forma manual
            // users.push(newUser)
            // res.status(201).send("Usuário cadastrado com sucesso!")
    
        }
        else{
            res.status(400)
            throw new Error("Algo de errado com as entradas id...")
        }
    } catch (error) {
        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro")
        }

        if(error instanceof Error){

            res.send(error.message)
        }
        else{
            console.log("Erro inesperado.")
        }
    }
})

//Add new product
app.post('/products', async (req: Request, res:Response) =>{

    try {
        
        const id = req.body.id as string| undefined
        const name = req.body.name as string| undefined
        const price = req.body.price as number| undefined
        const category = req.body.category as CATEGORY| undefined
        const type = req.body.type as string| undefined
        const description = req.body.description as string| undefined
        const imageUrl = req.body.imageUrl as string| undefined

    
        if(id !== undefined && name !== undefined && price !== undefined && category !== undefined && type !== undefined && description !== undefined && imageUrl !== undefined){

            const [jatemesseid] = await db.raw(`SELECT * FROM products WHERE id = "${id}";`)

            // const jatemesseid = products.find((product) => product.id === id)
            
            if(typeof id !== "string" || typeof name !== "string" || typeof price !== "number" || category !== CATEGORY.COSMETICOS && category !== CATEGORY.ESSENCIAL && category !== CATEGORY.NORMAL || typeof imageUrl !== "string" || typeof type !== "string" || typeof description !== "string"){
                res.status(400)
                throw new Error("Houve um erro de tipagem nos valores.")
            }

            if(jatemesseid){
                res.status(400)
                throw new Error("Já existe esse produto.")
            }

            await db.raw(`INSERT INTO products(id, name,price, category, type, description, imageUrl) VALUES(
                "${id}", "${name}", "${price}", "${category}", "${type}", "${description}", "${imageUrl} ");`)
            res.status(201).send("Produto cadastrado com sucesso!")

            // const newProduct:TProduct ={
            //     id,
            //     name,
            //     price,
            //     category
            // }
        
            // products.push(newProduct)
            // res.status(201).send("Produto cadastrado com sucesso!")
        }
        else{
            res.status(400)
            throw new Error("Um dos valores está faltando.")
        }
    
    } catch (error) {
        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro")
        }

        if(error instanceof Error){

            res.send(error.message)
        }
        else{
            console.log("Erro inesperado.")
        }
    }

})

//Add new purchase
app.post('/purchases', async (req: Request, res:Response) =>{

    try {
        

        const id = req.body.id as string | undefined
        const buyerId = req.body.buyerId as string | undefined
        const productId = req.body.productId as string | undefined
        const quantity = req.body.quantity as number |  undefined
        // const userId = req.body.userId as string | undefined
        

        if(id !== undefined && productId !== undefined && quantity !== undefined && buyerId !== undefined){
            if(typeof id !== "string" || typeof productId !== "string" || typeof quantity !== "number" || typeof buyerId !== "string"){
                res.status(400)
                throw new Error("Houve um erro de tipagem nos valores.")
            }

            const [jatemesseid] = await db.raw(`SELECT * FROM purchases WHERE id = "${id}";`)
            const [jatemesseiduser] = await db.raw(`SELECT * FROM users WHERE id = "${buyerId}";`)
            const [jatemesseidproduct] = await db.raw(`SELECT * FROM products WHERE id = "${productId}";`)
            const totalPrice =  jatemesseidproduct.price * quantity

            // const jatemesseiduser = users.find((user) => user.id === userId)
            // const jatemesseidproduct = products.find((product) => product.id === productId)

            if(jatemesseid){
                res.status(400)
                throw new Error("Essa compra já foi realizada.")
            }

            if(jatemesseiduser && jatemesseidproduct){

                await db.raw(`INSERT INTO purchases(id, buyer_id, productId, quantity, total_price, paid, createdAt, delivered_at)
                VALUES("${id}", "${buyerId}", "${productId}", "${quantity}", "${totalPrice}", "${0}",DATETIME('now'), "${null}");)`);
                res.status(201).send("Compra cadastrada com sucesso!")


                //Força eles recebem o proprio valor.
                // const newPurchase:TPurchase ={
                //     userId: userId,
                //     productId: productId,
                //     productName: productName,
                //     quantity: quantity,
                //     totalPrice: totalPrice * quantity
                // }
            
                // purchases.push(newPurchase)
                // res.status(201).send("Compra realizada com sucesso!")
                
            }
            else{
                res.status(400).send("Usuário/produto não encontrado")
            }

        }
        else{
            res.status(400)
            throw new Error("Um dos valores está faltando.")
        }
    
    
    } catch (error) {
        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro")
        }

        if(error instanceof Error){

            res.send(error.message)
        }
        else{
            console.log("Erro inesperado.")
        }
    }
})


//Get product by id
app.get("/products/:id", async (req: Request, res: Response) =>{

    try {
        
        const id = req.params.id as string
        if(id !== undefined){

            const [jatemesseidproduct] = await db.raw(`SELECT * FROM products WHERE id = "${id}";`)

            // const jatemesseidproduct = products.find((product) => product.id === id)
            if(jatemesseidproduct){

                res.status(200).send(jatemesseidproduct)

                // const itemselecionado = products.find((product) => {
                //    if(product.id === id){
                //     return product
                //    }
                // })
                // res.status(200).send(itemselecionado)
            }
        }
        else{
            res.status(400).send("Produto não encontrado")
        }
    } catch (error) {
        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro")
        }

        if(error instanceof Error){

            res.send(error.message)
        }
        else{
            console.log("Erro inesperado.")
        }
    }
})

//Get purchase by id
app.get("/users/:id/purchases", async(req: Request, res: Response) =>{
    try {

        const id = req.params.id as string
        if(id !== undefined){
            const [jatemesseidpurchase] = await db.raw(`SELECT * FROM purchases WHERE buyer_id = "${id}";`)
            // const jatemesseidpurchase = purchases.find((purchase) => purchase.userId === id)
            if(jatemesseidpurchase){
                res.status(200).send(jatemesseidpurchase)

                // const itemselecionado = purchases.find((purchase) => {
                //    if(purchase.userId === id){
                //     return purchase
                //    }
                // })
                // res.status(200).send(itemselecionado)
            }
        }
        else{
            res.status(400).send("Usuário não encontrado")
        }
    } catch (error) {
        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro")
        }

        if(error instanceof Error){

            res.send(error.message)
        }
        else{
            console.log("Erro inesperado.")
        }
    }
    
})

//Delete user by id

app.delete("/users/:id/", (req: Request, res: Response) =>{

    try {
        const id = req.params.id as string

        if(id !== undefined){
            const jatemesseiduser = users.find((user) => user.id === id)
            if(jatemesseiduser){

                const indextodelete = users.findIndex((user) => user.id === id)
                if(indextodelete >= 0){
                    users.splice(indextodelete, 1)
                }
            
                res.status(200).send("Usuário apagado com sucesso!")
            }
        }
        else{
            res.status(400).send("Usuário não encontrado")
        }
        
    } catch (error) {
        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro")
        }

        if(error instanceof Error){

            res.send(error.message)
        }
        else{
            console.log("Erro inesperado.")
        }
    }
})

//Delete product by id
app.delete("/products/:id/", (req: Request, res: Response) =>{

    try {
        const id = req.params.id as string
        if(id !== undefined){
            const jatemesseidproduct = products.find((product) => product.id === id)
            if(jatemesseidproduct){

                const indextodelete = products.findIndex((product) => product.id === id)
                if(indextodelete >= 0){
                    products.splice(indextodelete, 1)
                }
            
                res.status(200).send("Produto apagado com sucesso!")
            }
        }
        else{
            res.status(400).send("Produto não encontrado")
        }
    } catch (error) {
        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro")
        }

        if(error instanceof Error){

            res.send(error.message)
        }
        else{
            console.log("Erro inesperado.")
        }
    }
})

//Edit user
app.put("/users/:id", (req: Request, res: Response) =>{

    try {
        const id = req.params.id as string
        if(id !== undefined){
            const jatemesseiduser = users.find((user) => user.id === id)
            if(jatemesseiduser){

                const newId = req.body.id as string|  undefined
                const newEmail = req.body.email as string|  undefined
                const newPassword = req.body.password as string|  undefined

                if(newId !== undefined && newEmail !== undefined && newPassword !== undefined ){
                    if(typeof newId !== "string" || typeof newEmail !== "string" || typeof newPassword !== "string"){
                        res.status(400)
                        throw new Error("Houve um erro de tipagem nos valores.")
                    }
            
                const userEdit = users.find((user) => user.id === id)
            
                if(userEdit){
                    userEdit.id = newId || userEdit.id
                    userEdit.email = newEmail || userEdit.email
                    userEdit.password = newPassword || userEdit.password
                }
            
                res.status(200).send("Usuário editado com sucesso!!")
            }

            }
        }
        else{
            res.status(400).send("Usuário não encontrado")
        }
    } catch (error) {
        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro")
        }

        if(error instanceof Error){

            res.send(error.message)
        }
        else{
            console.log("Erro inesperado.")
        }
    }
    
})

//Edit product
app.put("/products/:id", (req: Request, res: Response) =>{

    try {
        const id = req.params.id as string
        if(id !== undefined){
            const jatemesseidproduct = products.find((product) => product.id === id)
            if(jatemesseidproduct){

                const newId = req.body.id as string|  undefined
                const newName = req.body.name as string|  undefined
                const newPrice = req.body.price as number|  undefined
                const newCategory = req.body.category as CATEGORY|  undefined

                if(newId !== undefined && newName !== undefined && newPrice !== undefined && newCategory !== undefined  ){
                    if(typeof newId !== "string" || typeof newName !== "string" || typeof newPrice !== "number" ){
                        res.status(400)
                        throw new Error("Houve um erro de tipagem nos valores.")
                    }
            
            
                const productEdit = products.find((product) => product.id === id)
            
                if(productEdit){
                    productEdit.id = newId || productEdit.id
                    productEdit.name = newName || productEdit.name
                    productEdit.price = newPrice || productEdit.price
                    productEdit.category = newCategory || productEdit.category
                }
            
            
                res.status(200).send("Produto editado com sucesso!!")
            }
            else{
                res.status(400)
                throw new Error("Houve um erro de tipagem nos valores.")
            }
        }
        else{
            res.status(400)
            throw new Error("Não encontrei esse produto.")
        }
        }
        
    } catch (error) {
        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro")
        }

        if(error instanceof Error){

            res.send(error.message)
        }
        else{
            console.log("Erro inesperado.")
        }
    }
    
})

// createUser("Gabriel","gabriel1234@gmail.com", "kaka123" )

// getAllUsers()

// createProduct("F", "Feijão", 25, CATEGORY.ESSENCIAL)

// getAllProducts()

// getProductById("F")
  
// queryProductsByName("Arroz")

// createPurchase("gabriel", "F", "Feijão", 1, 25)

// getAllPurchasesFromUserId("gabriel")


