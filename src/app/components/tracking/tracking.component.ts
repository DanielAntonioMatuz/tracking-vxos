import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {AdminUser} from '../../models/adminUser';
import {User} from '../../models/user';
import {Router} from '@angular/router';

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

  @ViewChild('idValue') dataId: string;
  @ViewChild('vxos') dataVxos: string;
  @ViewChild('adb') dataAdb: string;
  @ViewChild('ctrl') dataCtrl: string;
  @ViewChild('ok') dataOk: string;






  constructor(
    // tslint:disable-next-line:variable-name
    private _userService: UserService,
  // tslint:disable-next-line:variable-name
    private _router: Router

) {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const anioA = hoy.getFullYear() + 1;

    const mes = hoy.getMonth() + 1;
    const dia = hoy.getDay();

    this.fecha = dia + 2 + '/' + mes + '/' + anioA;
    // tslint:disable-next-line:prefer-const
    this.fechaA = dia + 2 + '/' + mes + '/' + anio;
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngDoCheck(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
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
        console.log(this.users.length);
        this.progress = 100 / this.users.length;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.users.length; i++){
          // tslint:disable-next-line:triple-equals
          if (this.users[i].estadoLicencia != '' && this.users[i].estadoLicencia != null){
            this.avance ++;
          }
        }
        // tslint:disable-next-line:radix
        this.progress = parseInt(String(this.progress * this.avance));
        this.avance = this.users.length - this.avance;
        console.log(this.avance);
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
    if (idValue === 'all') {
      this.statusA = false;

      this.data = {
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        estadoLicencia: 'Activo',
        act1: 'ok',
        act2: 'ok',
        act3: 'ok',
        act4: 'ok',
        vigencia: this.fecha,
        fechaActivacion: this.fechaA,
        referencia: user.referencia,
        tipoLicencia: user.tipoLicencia,
      };

      this._userService.update_config(this.data).subscribe(
        response => {
          if (!response.user){
            this.status = 'error';
          } else {
            this.status = 'success';
            window.location.reload();
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
        estadoLicencia: '',
        act1: 'ok',
        act2: '',
        act3: '',
        act4: '',
        vigencia: user.vigencia,
        fechaActivacion: user.fechaActivacion,
        referencia: user.referencia,
        tipoLicencia: user.tipoLicencia,
      };

      this._userService.update_config(this.data).subscribe(
        response => {
          if (!response.user){
            this.status = 'error';
          } else {
            this.status = 'success';
            window.location.reload();
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
        estadoLicencia: '',
        act1: 'ok',
        act2: 'ok',
        act3: '',
        act4: '',
        vigencia: user.vigencia,
        fechaActivacion: user.fechaActivacion,
        referencia: user.referencia,
        tipoLicencia: user.tipoLicencia,
      };

      this._userService.update_config(this.data).subscribe(
        response => {
          if (!response.user){
            this.status = 'error';
          } else {
            this.status = 'success';
            window.location.reload();
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
        estadoLicencia: '',
        act1: 'ok',
        act2: 'ok',
        act3: 'ok',
        act4: '',
        vigencia: user.vigencia,
        fechaActivacion: user.fechaActivacion,
        referencia: user.referencia,
        tipoLicencia: user.tipoLicencia,
      };

      this._userService.update_config(this.data).subscribe(
        response => {
          if (!response.user){
            this.status = 'error';
          } else {
            this.status = 'success';
            window.location.reload();
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

      this.data = {
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        estadoLicencia: 'Activo',
        act1: 'ok',
        act2: 'ok',
        act3: 'ok',
        act4: 'ok',
        vigencia: this.fecha,
        fechaActivacion: this.fechaA,
        referencia: user.referencia,
        tipoLicencia: user.tipoLicencia,
      };

      this._userService.update_config(this.data).subscribe(
        response => {
          if (!response.user){
            this.status = 'error';
          } else {
            this.status = 'success';
            window.location.reload();
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
      this._userService.search({email: searchValue}).subscribe(
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
