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
        const result = await db("users")
        // const result = await db.raw(`SELECT * FROM users;`)
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
        const result = await db("products")
        // const result = await db.raw(`SELECT * FROM products;`)
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
        const result = await db("purchases")
        // const result = await db.raw(`SELECT * FROM purchases;`)
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
        const paid = req.body.paid as number | undefined
        const total_price = req.body.total_price as number | undefined
        const delivered_at = req.body.delivered_at as number | undefined
        // const quantity = req.body.quantity as number |  undefined
        // const userId = req.body.userId as string | undefined
        

        if(id !== undefined && productId !== undefined && paid !== undefined && buyerId !== undefined && total_price !== undefined && delivered_at !== undefined){
            if(typeof id !== "string" || typeof productId !== "string" || typeof paid !== "number" || typeof buyerId !== "string" || typeof total_price !== "number"){
                res.status(400)
                throw new Error("Houve um erro de tipagem nos valores.")
            }

            const [jatemesseid] = await db.raw(`SELECT * FROM purchases WHERE id = "${id}";`)
            const [jatemesseiduser] = await db.raw(`SELECT * FROM users WHERE id = "${buyerId}";`)
            const [jatemesseidproduct] = await db.raw(`SELECT * FROM products WHERE id = "${productId}";`)


            // const jatemesseiduser = users.find((user) => user.id === userId)
            // const jatemesseidproduct = products.find((product) => product.id === productId)

            if(jatemesseid){
                res.status(400)
                throw new Error("Essa compra já foi realizada.")
            }

            if(jatemesseiduser && jatemesseidproduct){

                const newPurchase = {
                    id,
                    buyerId,
                    productId,
                    paid,
                    total_price,
                    delivered_at
                }

                await db("purchases").insert(newPurchase)
                res.status(201).send("Compra cadastrada com sucesso!")

                // await db.raw(`INSERT INTO purchases(id, buyer_id, productId, quantity, total_price, paid, createdAt, delivered_at)
                // VALUES("${id}", "${buyerId}", "${productId}", "${quantity}", "${totalPrice}", "${0}",DATETIME('now'), "${null}");)`);


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


// Get product by id
app.get("/products/:id", async (req: Request, res: Response) =>{

    try {
        
        const id = req.params.id as string | undefined
        if(id !== undefined){

            const jatemesseidproduct = await db.raw(`SELECT * FROM products WHERE id = "${id}";`)

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

//Get purchase by id using query builder
app.get("/purchases/:id", async(req: Request, res: Response) =>{
    try {
        const idrecebido = req.params.id as string

        if(idrecebido !== undefined){
            const productList = await db.select("products.id as id do produto", "products.name as nome", "products.price as preco", "products.description as descricao", "products.imageUrl as link da imagem", "purchases_products.quantity as quantidade")
            .from("purchases_products")
            .innerJoin("products", "purchases_products.product_id", "=", "products.id")
            .where({"purchase_id": idrecebido})

            const [jatemesseidpurchase] = await db.select("purchases.id as id da compra", "purchases.total_price as preco_total", "purchases.createdAt as compra feita dia","purchases.paid as pago", "purchases.buyer_id as id do comprador", "users.name as nome", "users.email as email")
            .from("purchases")
            .innerJoin("users", "purchases.buyer_id", "=", "users.id")
            .where({'purchases.id': idrecebido})
            
            if(jatemesseidpurchase.pago === 0){
                
                jatemesseidpurchase.pago = false
            }
            else{
                jatemesseidpurchase.pago = true
            }

            if(productList && jatemesseidpurchase){
                for(let x = 0; x <= productList.length -1; x++){
                    jatemesseidpurchase.preco_total = jatemesseidpurchase.preco_total + (productList[x].preco * productList[x].quantidade)
                }
                res.status(200).send({...jatemesseidpurchase,productList})
            }
            
        }
        else{
            res.status(400)
            throw new Error("Id não encontrado.")
        }


    } catch (error:any) {
        if(res.statusCode === 200){
            res.status(500)
            res.send(error.message)
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
// app.get("/purchases/:id", async(req: Request, res: Response) =>{
//     try {

//         const id = req.params.id as string | undefined

//         if(id !== undefined){
//             const jatemesseidpurchase = await db.raw(`SELECT * FROM purchases WHERE buyer_id = "${id}";`)

//             // const jatemesseidpurchase = purchases.find((purchase) => purchase.userId === id)
//             if(jatemesseidpurchase){
//                 res.status(200).send(jatemesseidpurchase)

//                 // const itemselecionado = purchases.find((purchase) => {
//                 //    if(purchase.userId === id){
//                 //     return purchase
//                 //    }
//                 // })
//                 // res.status(200).send(itemselecionado)
//             }
//         }
//         else{
//             res.status(400).send("Usuário não encontrado")
//         }
//     } catch (error) {
//         if(res.statusCode === 200){
//             res.status(500)
//             res.send("Erro")
//         }

//         if(error instanceof Error){

//             res.send(error.message)
//         }
//         else{
//             console.log("Erro inesperado.")
//         }
//     }
    
// })

//Delete user by id
app.delete("/users/:id", async (req: Request, res: Response) =>{

    try {
        const idrecebido = req.params.id as string | undefined

        if(idrecebido !== undefined){
            // const jatemesseiduser = await db.raw(`SELECT * FROM users WHERE id = "${id}";`)
            const jatemesseiduser = await db.select("*").from("users").where({id: idrecebido})
            // const jatemesseiduser = users.find((user) => user.id === id)
            if(jatemesseiduser){
                
                // const indextodelete = users.findIndex((user) => user.id === id)
                // if(indextodelete >= 0){
                    //     users.splice(indextodelete, 1)
                    // }
                    
                await db("users").del().where({id: idrecebido})
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
app.delete("/products/:id/", async(req: Request, res: Response) =>{

    try {
        const idrecebido = req.params.id as string | undefined
        if(idrecebido !== undefined){
            // const jatemesseidproduct = products.find((product) => product.id === id)
            const jatemesseidproduct = await db.select("*").from("products").where({id: idrecebido})
            if(jatemesseidproduct){

                // const indextodelete = products.findIndex((product) => product.id === idrecebido)
                // if(indextodelete >= 0){
                //     products.splice(indextodelete, 1)
                // }
                await db("products").del().where({id: idrecebido})
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

//Delete purchase by id
app.delete("/purchases/:id/", async(req: Request, res: Response) =>{

    try {
        const idrecebido = req.params.id as string | undefined

        if(idrecebido !== undefined){
            // const jatemesseidpurchase = purchases.find((purchase) => purchase.id === id)
            const jatemesseidpurchase = await db.select("*").from("purchases").where({id: idrecebido})
            if(jatemesseidpurchase){

                // const indextodelete = products.findIndex((product) => product.id === idrecebido)
                // if(indextodelete >= 0){
                //     products.splice(indextodelete, 1)
                // }
                await db("purchases").del().where({id: idrecebido})
                res.status(200).send("Produto apagado com sucesso!")
            }
        }
        else{
            res.status(400).send("Compra não encontrada")
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
app.put("/users/:id", async (req: Request, res: Response) =>{

    try {
        const idrecebido = req.params.id as string | undefined

        if(idrecebido !== undefined){
            // const jatemesseiduser = users.find((user) => user.id === id)
            const [jatemesseiduser] = await db.select("*").from("users").where({id: idrecebido})
            if(jatemesseiduser){

                const newId = req.body.id as string|  undefined
                const newEmail = req.body.email as string|  undefined
                const newPassword = req.body.password as string|  undefined
                const newName = req.body.name as string | undefined

                if(newId !== undefined && newEmail !== undefined && newPassword !== undefined  && newName !== undefined){
                    if(typeof newId !== "string" || typeof newEmail !== "string" || typeof newPassword !== "string" || typeof newName !== "string"){
                        res.status(400)
                        throw new Error("Houve um erro de tipagem nos valores.")
                    }
            
                // const userEdit = users.find((user) => user.id === idrecebido)
            
                // if(userEdit){
                //     userEdit.id = newId || userEdit.id
                //     userEdit.email = newEmail || userEdit.email
                //     userEdit.password = newPassword || userEdit.password
                // }


                await db.raw(`UPDATE users
                SET 
                name= "${newName}",
                id = "${newId}",
                email= "${newEmail}", 
                password = "${newPassword}",
                createdAt = DATETIME('now')
                WHERE 
                id = ${idrecebido}`)

                // const newUser = {
                //     id: newId || jatemesseiduser.id,
                //     name : newName || jatemesseiduser.name,
                //     email : newEmail || jatemesseiduser.email,
                //     password : newPassword || jatemesseiduser.password,
                //     createdAt: "DATETIME('now')"
                // }
                // await db("users").update(newUser).where({id: idrecebido})
            
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
app.put("/products/:id", async (req: Request, res: Response) =>{

    try {
        const idrecebido = req.params.id as string | undefined

        if(idrecebido !== undefined){
            // const jatemesseidproduct = products.find((product) => product.id === id)
            const [jatemesseidproduct] = await db.select("*").from("products").where({id: idrecebido})
            if(jatemesseidproduct){

                const newId = req.body.id as string|  undefined
                const newName = req.body.name as string|  undefined
                const newPrice = req.body.price as number|  undefined
                const newCategory = req.body.category as CATEGORY|  undefined
                const newType = req.body.type as string | undefined
                const newDescription = req.body.description as string | undefined | null
                const newImageUrl = req.body.imageUrl as string | undefined | null

                if(newId !== undefined && newName !== undefined && newPrice !== undefined && newCategory !== undefined && newType !== undefined){
                    if(typeof newId !== "string" || typeof newName !== "string" || typeof newPrice !== "number" || typeof newType !== "string" || typeof newCategory !== "string"){
                        res.status(400)
                        throw new Error("Houve um erro de tipagem nos valores.")
                    }
            
                const newProduct = {
                    id: newId || jatemesseidproduct.id,
                    name : newName || jatemesseidproduct.name,
                    price : newPrice || jatemesseidproduct.email,
                    category : newCategory || jatemesseidproduct.password,
                    type: newType || jatemesseidproduct.type,
                    description: newDescription || jatemesseidproduct.description || null,
                    imageUrl: newImageUrl || jatemesseidproduct.imageUrl || null
                }

                await db("products").update(newProduct).where({id: idrecebido})

                res.status(200).send("Produto editado com sucesso!!")
            
                // const productEdit = products.find((product) => product.id === idrecebido)
            
                // if(productEdit){
                //     productEdit.id = newId || productEdit.id
                //     productEdit.name = newName || productEdit.name
                //     productEdit.price = newPrice || productEdit.price
                //     productEdit.category = newCategory || productEdit.category
                // }
            
            
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


