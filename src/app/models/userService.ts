export class UserService {
  constructor(
    // tslint:disable-next-line:variable-name
    public  _id: string,
    public name: string,
    public surname: string,
    public email: string,
    public password: string,
    public image: string,
    public cellphone: string,

  ) {
  }
}
