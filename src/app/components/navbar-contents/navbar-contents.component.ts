import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-navbar-contents',
  templateUrl: './navbar-contents.component.html',
  styleUrls: ['./navbar-contents.component.scss']
})
export class NavbarContentsComponent implements OnInit {

  public identity;
  public token;
  public cartUser;
  public precioTotal = 0;

  constructor(
    private _userService: UserService,

  ) { }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.cartDataCheck();
  }

  cartDataCheck(){
    this.cartUser = JSON.parse("[" + localStorage.getItem('cart') + "]");
    for (let i = 0; i < this.cartUser.length; i++){
      if(this.cartUser[i].precio != ''){
        this.precioTotal += parseInt(this.cartUser[i].precio);
      }
    }
  }

}
