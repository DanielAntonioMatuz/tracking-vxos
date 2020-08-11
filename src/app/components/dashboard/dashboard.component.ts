import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  public status: string;
  public identity;
  public token;
  public url;
  public users;
  public data;
  public avance = 0;
  public progress = 0;

  constructor(
    // tslint:disable-next-line:variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private _router: Router,
    // tslint:disable-next-line:variable-name
    private _userService: UserService
  ) { }

// tslint:disable-next-line:typedef use-lifecycle-interface
  ngDoCheck(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }


  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

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
        this.progress = this.users.length;
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
  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/login']);
  }

}
