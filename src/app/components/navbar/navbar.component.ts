import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public identity;
  constructor(    // tslint:disable-next-line:variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private _router: Router,
    // tslint:disable-next-line:variable-name
    private _userService: UserService
  ) {
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/login']);
  }
}
