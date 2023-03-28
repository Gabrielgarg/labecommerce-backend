import { TUser, TProduct,TPurchase } from "./types";

export enum CATEGORY {
    ESSENCIAL = "essencial",
    NORMAL = "normal",
    COSMETICOS = "Cosmeticos"
  }

export let users:TUser[] = [
    {
        id: "gabriel",
        email: "gabriel123@gmail.com",
        password: "quemirabobo"
    },
    {
        id: "joao",
        email: "joao123@gmail.com",
        password: "quemirabobo3"
    }
]

export const products:TProduct[] = [
    {
        id: "A",
        name: "Arroz",
        price: 30,
        category: CATEGORY.ESSENCIAL
    },
    {
        id: "M",
        name: "Macarrão",
        price: 10,
        category: CATEGORY.ESSENCIAL
    }
    
]

export const purchases:TPurchase[] = [
    {
        userId: "gabriel",
        productId: "A",
        productName: "Arroz",
        quantity: 1,
        totalPrice: 30,
    },
    {
        userId: "joao",
        productId: "M",
        productName: "Macarrão",
        quantity: 1,
        totalPrice: 10,
    }
    
]


// export function getAllUsers () {
//     console.log("Todas as pessoas cadastradas são:\n")
//     console.log(users,"\n")
    
// }

// export function createUser(idrecebido:string, emailrecebido:string, passwordrecebido:string) {
    
//     const jatemesseitem = users.find((user) => user.id === idrecebido)
//     if(jatemesseitem){
//         console.log("Usuário ja cadastrado!\n")
//     }
//     else{
//         const array:TUser =
//         {id: idrecebido, email:emailrecebido, password:passwordrecebido}
        
//         users.push(array)
//         console.log("Cadastro realizado com sucesso!\n")
//     }
// }

// export function createProduct(idrecebido:string, namerecebido:string, pricerecebido:number, categoryrecebido:string) {

//     const jatemesseitem = products.find((product) => product.id === idrecebido && product.name === namerecebido)
//     if(jatemesseitem){
//         console.log("Produto já cadastrado!\n")
//     }
//     else{
//         const array:TProduct =
//             {id: idrecebido, name:namerecebido, price:pricerecebido, category:categoryrecebido }
        
//         products.push(array)
//         console.log("Cadastro do produto realizado com sucesso!\n")
//     }
// }


// export function getAllProducts () {
//     console.log("Todas os produtos cadastrados são:\n")
//     console.log(products,"\n")
// }

// export function getProductById (idrecebido:string){
//     const jatemesseitem = products.filter((product) => product.id === idrecebido)
//     if(jatemesseitem){
//         console.log("Produto encontrado!\n")
//         console.log(jatemesseitem,"\n")
//     }
//     else{
//         console.log(jatemesseitem,"\n")
//     }
// }
// export function queryProductsByName(namerecebido:string){
//     const jatemesseitem = products.filter((product) => product.name === namerecebido)
//     if(jatemesseitem){
//         console.log(`Produtos encontrados com a palavra: ${namerecebido}: \n`)
//         console.log(jatemesseitem,"\n")
//     }
//     else{
//         console.log("Produto não encontrado.\n")
//     }
// }

// export function createPurchase (userIdrecebido:string, productIdrecebido:string, namerecebido:string, quantityrecebido:number, totalPricerecebido:number) {
//     const jatemesseitem = users.find((user) => user.id === userIdrecebido)
//     if(jatemesseitem){
//         const array:TPurchase =
//         {userId: userIdrecebido, productId:productIdrecebido, productName:namerecebido, quantity:quantityrecebido, totalPrice:totalPricerecebido, id:"5" }
    
//         purchases.push(array)
//         console.log("Cadastro da compra realizada com sucesso!\n")
//     }
// }

// export function getAllPurchasesFromUserId (userIdrecebido:string) {
//     const jatemesseitem = purchases.filter((purchases) => purchases.userId === userIdrecebido)
//     if(jatemesseitem){
//         console.log(`Compras realizadas por ${userIdrecebido}:\n`)
//         console.log(jatemesseitem)
//     }
// }