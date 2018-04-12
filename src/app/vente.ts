export class Vente {
    constructor(
      public amount:number,
      public product_attribute: string,
      public attribute_option:string,
      public customer_group:string,
      public customer_age:string,
      public customer_gender:string,
      public region:string,
      public period:{From,To},
      public payment_method:string,
      public shipments_method:string,
      public shipments_weight:number,

    ) {  }

}
