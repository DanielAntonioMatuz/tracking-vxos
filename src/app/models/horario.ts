export class Horario {
  constructor(
    // tslint:disable-next-line:variable-name
    public  _id: string,
    public domingoAbre: string,
    public domingoCierra: string,
    public lunesAbre: string,
    public lunesCierra: string,
    public martesAbre: string,
    public martesCierra: string,
    public miercolesAbre: string,
    public miercolesCierra: string,
    public juevesAbre: string,
    public juevesCierra: string,
    public viernesAbre: string,
    public viernesCierra: string,
    public sabadoAbre: string,
    public sabadoCierra: string,
    public user: string
  ) {
  }
}
