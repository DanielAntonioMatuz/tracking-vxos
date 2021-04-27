export class User {
  constructor(
    // tslint:disable-next-line:variable-name
   public  _id: string,
   public nombre: string,
   public email: string,
   public estadoPedido: string,
   public act1: string,
   public act2: string,
   public act3: string,
   public act4: string,
   public vigencia: string,
   public fechaOrden: string,
   public referencia: string,
   public pedido: string,
    public user : string
  ) {
  }
}
