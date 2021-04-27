import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-renovar',
  templateUrl: './renovar.component.html',
  styleUrls: ['./renovar.component.scss']
})
export class RenovarComponent implements OnInit {

  public user: User;
  public status: string;
  public identity;
  public token;
  public url;
  public users;
  public data;
  public fecha;

  @ViewChild('dataRen') dataRen: string;


  constructor(
    // tslint:disable-next-line:variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private _router: Router,
    // tslint:disable-next-line:variable-name
    private _userService: UserService,
    // tslint:disable-next-line:variable-name
  ) {

  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.dataCheck();
  }

  // tslint:disable-next-line:typedef
  dataCheck(){
    this._userService.get_user(this.token).subscribe(
      response => {
        this.users = response.users;
      }, error => {
        // tslint:disable-next-line:prefer-const
        let errorMessage = error as any;
        console.log(errorMessage);

        if (errorMessage != null){
          this.status = 'error';
        }
      }
    );
  }

  // tslint:disable-next-line:typedef
  valueId(idValue ?: string, user ?: User) {
    console.log(idValue);
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const anioA = hoy.getFullYear() + 1;
    const mes = hoy.getMonth() + 1;
    const dia = hoy.getDay() + 4;
    this.fecha = dia + '/' + mes + '/' + anio;
    const fechaA = dia + '/' + mes + '/' + anioA;




    this.data = {
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        estadoPedido: 'Activo',
        act1: user.act1,
        act2: user.act2,
        act3: user.act4,
        act4: user.act4,
        vigencia: fechaA,
        fechaOrden: this.fecha,
        referencia: user.referencia,
        pedido: user.pedido,
      };

    this._userService.update_config(this.data).subscribe(
        response => {
          if (!response.user){
            this.status = 'error';
          } else {
            this.status = 'success';
            this.dataCheck();
          }
        },
        error => {
          // tslint:disable-next-line:prefer-const
          let errorMessage = error as any;
          console.log(errorMessage);

          if (errorMessage != null){
            this.status = 'error';
          }
        }
      );
    }

  onSearchChange(searchValue: string): void {
    console.log(searchValue);
    if (searchValue !== ' '){
      this._userService.search({email: searchValue}, this.identity._id).subscribe(
        response => {
          this.users = response.search;
        }, error => {
          // tslint:disable-next-line:prefer-const
          let errorMessage = error as any;
          console.log(errorMessage);
          if (errorMessage != null){
            this.status = 'error';
          }
        }
      );
    }
  }

}
