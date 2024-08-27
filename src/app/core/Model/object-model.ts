export class User{
  name!:string;
  password!:string;
  role!:string;
  mobNumber!:string;
  address!:string;
  gender!:string;
  email!:string;
  agreetc!:boolean;
  age!:number;
}

export class Product{
  id!:number;
  name!:string
  uploadPhoto!:string;
  productDesc!:string;
  mrp!:number;
  dp!:number;
  status!:boolean;
}
export class Order{
  id!:number;
  userId!:number;
  sellerId!:number;
  product!:Product;
  deliveryAddress!:string;
  contact!:number;
  dateTime!:string;
}
