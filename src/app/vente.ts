export class Vente {
    constructor(
      public amount:number,
      public operator1: string,
      public product_attribute: string,
      public attribute_option:string,
      public customer_group:string,
      public customer_age:string,
      public customer_gender:string,
      public region:string,
      public From:string,
      public To:string,
      public payment_method:string,
      public shipments_method:string,
      public shipments_weight:number,
      public operator2: string,

    ) {  }

}
