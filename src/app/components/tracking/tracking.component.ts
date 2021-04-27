import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {AdminUser} from '../../models/adminUser';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {SocketService} from '../../services/socket.service';
import * as moment from 'moment';
import {MenuService} from '../../services/menu.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {

  public status: string;
  public identity;
  public token;
  public url;
  public users;
  public statusA = true;
  public fecha;
  public fechaA;
  public data;
  public avance = 0;
  public progress = 0;
  public dataIdentityNotification;
  public pedidoService = [];
  public changeView = false;
  public panel1 = false;
  public panel2 = true;
  public historialPedidos = [];

  @ViewChild('idValue') dataId: string;
  @ViewChild('vxos') dataVxos: string;
  @ViewChild('adb') dataAdb: string;
  @ViewChild('ctrl') dataCtrl: string;
  @ViewChild('ok') dataOk: string;

  constructor(
    // tslint:disable-next-line:variable-name
    private _userService: UserService,
  // tslint:disable-next-line:variable-name
    private _router: Router,
    private _socketService: SocketService,
    private _menuService: MenuService

) {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const anioA = hoy.getFullYear() + 1;

    const mes = hoy.getMonth() + 1;
    const dia = hoy.getDay();

    this.fecha = moment().format('DD/MM/YYYY');
    // tslint:disable-next-line:prefer-const
    this.fechaA = moment().format('DD/MM/YYYY');
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngDoCheck(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }


  ngOnInit(): void {
    var hora = moment().format('01:10:21');
    var horaActual = moment().format('HH:mm:ss');
    if (hora < horaActual){
      console.log('Si es mayor');
    }
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.dataCheck();

    this._menuService.getMenu(this.identity._id, this.token).subscribe((data) => {
      this.historialPedidos = data.menus;
    });

    this._socketService.listen('new-data').subscribe((data: String) => {
      if (data === 'user connected') {
      } else {
        this.dataIdentityNotification = data.toString().split('/');
        if (this.dataIdentityNotification[1] === this.identity._id) {
          this.dataCheck();
        }
      }
    });


  }

  // tslint:disable-next-line:typedef
  dataCheck(){
    this.progress = 0;
    this.avance = 0;
    this._userService.get_user(this.token).subscribe(
      response => {

        this.users = response.users;
        console.log(this.users);
        this.progress = 100 / this.users.length;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.users.length; i++){
          // tslint:disable-next-line:triple-equals
          if (this.users[i].estadoPedido != '' && this.users[i].estadoPedido != null){
            this.avance ++;
          } else {
            this._menuService.getMenu(this.identity._id, this.token).subscribe((data) => {
              this.pedidoService = data.menus;
              console.log(this.pedidoService);
            });
          }
        }

        // tslint:disable-next-line:radix
        this.progress = parseInt(String(this.progress * this.avance));
        this.avance = this.users.length - this.avance;
      }, error => {
        // tslint:disable-next-line:prefer-const
        let errorMessage = error as any;

        if (errorMessage != null){
          this.status = 'error';
        }
      }
    );
  }

  // tslint:disable-next-line:typedef
  valueId(idValue ?: string, user ?: User) {
    console.log(user);
    if (idValue === 'all') {
      this.statusA = false;

      this.data = {
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        estadoPedido: 'Activo',
        act1: 'ok',
        act2: 'ok',
        act3: 'ok',
        act4: 'ok',
        vigencia: moment().format('DD/MM/YYYY'),
        fechaOrden: moment().format('DD/MM/YYYY'),
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

    if (idValue === 'ctrl') {
      console.log('CTRL');
      this.data = {
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        estadoPedido: '',
        act1: 'ok',
        act2: '',
        act3: '',
        act4: '',
        vigencia: user.vigencia,
        fechaOrden: user.fechaOrden,
        referencia: user.referencia,
        pedido: user.pedido,
      };

      console.log(this.data);

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

    if (idValue === 'vxos') {

      this.data = {
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        estadoPedido: '',
        act1: 'ok',
        act2: 'ok',
        act3: '',
        act4: '',
        vigencia: user.vigencia,
        fechaOrden: user.fechaOrden,
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

    if (idValue === 'adb') {

      this.data = {
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        estadoPedido: '',
        act1: 'ok',
        act2: 'ok',
        act3: 'ok',
        act4: '',
        vigencia: user.vigencia,
        fechaOrden: user.fechaOrden,
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

    if (idValue === 'ok') {
      this.data = '';

      this.data = {
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        estadoPedido: 'Activo',
        act1: 'ok',
        act2: 'ok',
        act3: 'ok',
        act4: 'ok',
        vigencia: this.fecha,
        fechaOrden: this.fechaA,
        referencia: user.referencia,
        pedido: user.pedido,
      };
      console.log(this.data);



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

  }

  onSearchChange(searchValue: string): void {
    console.log(searchValue);
    if (searchValue !== ' '){
      this._userService.search({email: searchValue}, this.token).subscribe(
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

  changePanel(){
    this.changeView = !this.changeView;
    this.panel1 = !this.panel1;
    this.panel2 = ! this.panel2;
  }

  // tslint:disable-next-line:typedef
  onSubmit(user){
    console.log(user);
  }

  // tslint:disable-next-line:typedef
  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/login']);
  }
}
