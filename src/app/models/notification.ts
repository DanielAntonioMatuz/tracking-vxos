export class Notification {
  constructor(
    // tslint:disable-next-line:variable-name
    public  _id: string,
    public nombre: string,
    public detalles: string,
    public empresa: string,
    public fecha: string,
    public imagen: string,
    public anexos: string,
    public estatus: string,
    public user: string,
  ) {
  }
}
