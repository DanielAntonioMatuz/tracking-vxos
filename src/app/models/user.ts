export class User {
  constructor(
    // tslint:disable-next-line:variable-name
   public  _id: string,
   public nombre: string,
   public email: string,
   public estadoLicencia: string,
   public act1: string,
   public act2: string,
   public act3: string,
   public act4: string,
   public vigencia: string,
   public fechaActivacion: string,
   public referencia: string,
   public tipoLicencia: string
  ) {
  }
}
