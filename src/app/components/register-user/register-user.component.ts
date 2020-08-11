import {Component, DoCheck, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {GLOBAL} from '../../services/GLOBAL';
import {stringify} from '@angular/compiler/src/util';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
  providers: [UserService]
})
export class RegisterUserComponent implements OnInit, DoCheck {

  public title: string;
  public user: User;
  public status: string;
  public identity;
  public url;
  public token;
  public ref = false;
  public idData;
  public users;



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
    // @ts-ignore
    this.user = new User(
      '',
      '',
      '',
      '',
      '',
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
    this.dataCheck();
  }

  // tslint:disable-next-line:typedef
  dataCheck() {
    this._userService.get_user(this.token).subscribe(
      response => {
        this.users = response.users;
        // tslint:disable-next-line:radix
        // console.log(stringify(this.users[this.users.length - 1]._id.substr(1, 4)));
        // tslint:disable-next-line:radix
        this.idData = parseInt(this.users[this.users.length - 1]._id.substr(1, 4)) + 1;
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
  onSubmit(form){
    console.log(this.user);
    if (this.user._id === this.user.referencia){
      this.ref = false;
      this._userService.registerUser(this.user, this.token).subscribe(
        response => {
          if (response.user && response.user._id){
            // console.log(response.user);

            this.status = 'success';
            form.reset();
            this.dataCheck();

          } else {
            this.status = 'error';
          }
        },
        error => {
          console.log(error as any);
        }
      );
    }else {
      this.ref = true;
    }
  }

  // tslint:disable-next-line:typedef
  ngDoCheck(){
    this.identity = this._userService.getIdentity();
  }

}
