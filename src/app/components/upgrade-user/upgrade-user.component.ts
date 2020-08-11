import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-upgrade-user',
  templateUrl: './upgrade-user.component.html',
  styleUrls: ['./upgrade-user.component.scss']
})
export class UpgradeUserComponent implements OnInit {
  public status: string;
  public identity;
  public token;
  public url;
  public users;
  public data: User;

  @ViewChild('LPU') dataLPU: string;
  @ViewChild('LCC') dataLCC: string;

  constructor(
    // tslint:disable-next-line:variable-name
    private _userService: UserService,
    // tslint:disable-next-line:variable-name
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

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
  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/login']);
  }
  // tslint:disable-next-line:typedef
  valueId(idValue ?: string, user ?: User) {
    console.log(idValue);
    if (idValue === 'lcc') {

      this.data = {
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        estadoLicencia: user.estadoLicencia,
        act1: user.act1,
        act2: user.act2,
        act3: user.act4,
        act4: user.act4,
        vigencia: user.vigencia,
        fechaActivacion: user.fechaActivacion,
        referencia: user.referencia,
        tipoLicencia: 'Creative Cloud',
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

    if (idValue === 'lpu') {
      console.log('lpu');
      this.data = {
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        estadoLicencia: user.estadoLicencia,
        act1: user.act1,
        act2: user.act2,
        act3: user.act4,
        act4: user.act4,
        vigencia: user.vigencia,
        fechaActivacion: user.fechaActivacion,
        referencia: user.referencia,
        tipoLicencia: 'Producto único',
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
