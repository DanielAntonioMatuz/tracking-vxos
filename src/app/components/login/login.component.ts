import { Component, OnInit, DoCheck } from '@angular/core';
import {AdminUser} from '../../models/adminUser';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GLOBAL} from '../../services/GLOBAL';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, DoCheck {

  public title: string;
  public user: AdminUser;
  public status: string;
  public identity;
  public token;
  public url;


  constructor(
    // tslint:disable-next-line:variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private _router: Router,
    // tslint:disable-next-line:variable-name
    private _userService: UserService
  ) {
    this.url = GLOBAL.url;
    this.user = new AdminUser(
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    );
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngDoCheck(){
     this.identity = this._userService.getIdentity();
  }


  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
  }

  // tslint:disable-next-line:typedef
  onSubmit(){
    this._userService.signup(this.user).subscribe(
      response => {
        this.identity = response.user;

        console.log(this.identity);

        if (!this.identity || !this.identity._id){
          this.status = 'error';
        } else {

          // Persistir datos del usuario
          localStorage.setItem('identity', JSON.stringify(this.identity));

          // Conseguir el token
          this.getToken();
        }

        this.status = 'success';
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
  getToken(){
    this._userService.signup(this.user, 'true').subscribe(
      response => {
        this.token = response.token;

        console.log(this.token);

        if (this.token.length <= 0){
          this.status = 'error';
        } else {
          // Persistir datos del usuario
          localStorage.setItem('token', JSON.stringify(this.token));
          this._router.navigate(['/dashboard']);

        }

        this.status = 'success';
      }, error => {
        const errorMessage = error as any;
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

}
