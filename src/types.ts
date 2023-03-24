export type TUser = {
    id: string
    email: string
    password:string
  }

  enum CATEGORY {
    ESSENCIAL = "essencial",
    NORMAL = "normal",
    COSMETICOS = "Cosmeticos"
  }

export type TProduct = {
    id:string
    name:string
    price:number
    category:string
  }

export type TPurchase = {
    userId:string
    productId:string
    productName:string
    quantity:number
    totalPrice:number
  }