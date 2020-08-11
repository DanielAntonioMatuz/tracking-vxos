import { Component, OnInit } from '@angular/core';
import {Admin} from '../../models/Admin';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {GLOBAL} from '../../services/GLOBAL';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.scss']
})
export class RegisterAdminComponent implements OnInit {


  public title: string;
  public user: Admin;
  public status: string;
  public identity;
  public url;
  public token;
  public ref = false;


  constructor(
    // tslint:disable-next-line:variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private _router: Router,
    // tslint:disable-next-line:variable-name
    private _userService: UserService
  ) {
    this.title = 'Registrarse';
    this.url = GLOBAL.url;
    this.user = new Admin(
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    );

  }

  ngOnInit(): void {
    this.token = this._userService.getToken();

  }

  // tslint:disable-next-line:typedef
  logout() {
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/login']);
  }

  // tslint:disable-next-line:typedef
  onSubmit(form) {
    console.log(this.user);
    this._userService.registerAdmin(this.user).subscribe(
        response => {
          if (response.user && response.user._id) {
            // console.log(response.user);

            this.status = 'success';
            form.reset();

          } else {
            this.status = 'error';
          }
        },
        error => {
          console.log(error as any);
        }
      );

  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngDoCheck() {
    this.identity = this._userService.getIdentity();
  }
}

