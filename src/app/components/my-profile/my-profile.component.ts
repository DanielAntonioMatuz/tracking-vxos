import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {GLOBAL} from '../../services/GLOBAL';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  public user: User;
  public status: string;
  public identity;
  public token;
  public url;

  constructor(    // tslint:disable-next-line:variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private _router: Router,
    // tslint:disable-next-line:variable-name
    private _userService: UserService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }


  ngOnInit(): void {
    this.loadPage();
    // this.getPublicationUser(this.user, this.page);
  }

  // tslint:disable-next-line:typedef
  loadPage(){
    this._route.params.subscribe(params => {
      const id = params.id;

      this.getUser(id);

    });
  }

  // tslint:disable-next-line:typedef
  getUser(id){
    this._userService.getUser(id).subscribe(
      response => {

        if (response.user){
          console.log(response);
          this.user = response.user;

        } else {
          this.status = 'error';
        }

      }, error => {
        this._router.navigate(['/my-profile', this.identity._id]);
      }
    );
  }
}
