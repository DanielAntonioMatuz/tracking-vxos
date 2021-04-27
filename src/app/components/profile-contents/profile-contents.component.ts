import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {MenuService} from '../../services/menu.service';
import {EmpresaConnectionsService} from '../../services/empresaConnections.service';
import {Menu} from '../../models/menu';

@Component({
  selector: 'app-profile-contents',
  templateUrl: './profile-contents.component.html',
  styleUrls: ['./profile-contents.component.scss']
})
export class ProfileContentsComponent implements OnInit {

  public identity;
  public token;
  public dataUser;
  public dataUserProfile;
  public imagenData;
  public imagenMenu;
  public descripcionMenu;
  public precioMenu;
  public precioTotalMenu;
  public tituloMenu;
  public tipoMenu;
  public menuItem: Menu;
  public arrayMenuItem = [];
  public addCart = false;
  public itemCartCheck = [];

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _menuService: MenuService,
    private _empresaService: EmpresaConnectionsService

  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {

      let user_id = params['id'];

      this._menuService.getMenuPublic(user_id).subscribe((data) => {
        this.checkDataMenuUser(data.menus);
      })

      this._empresaService.getEmpresaPublic(user_id).subscribe((data) =>{
        this.checkDataProfileUser(data);
      })

    });
    this.checkDataItemCart();
  }

  checkDataMenuUser(data){
    this.dataUser = data;
  }

  checkDataProfileUser(data){
    this.dataUserProfile = data.empresa;
    this.imagenData = this.dataUserProfile[0].imagen;
  }

  detailsMenu(menu: Menu){
    this.menuItem = menu;
    this.imagenMenu = menu.imagen;
    this.descripcionMenu = menu.detalles;
    this.precioMenu = menu.precio;
    this.tituloMenu = menu.nombre;
    this.precioTotalMenu = menu.precio;
  }

  calcularPrecioMenu(value){
    var precioFinal = value * this.precioMenu;
    this.precioTotalMenu =  precioFinal;
  }

  saveItemMenu(data){
    this.arrayMenuItem.push(JSON.stringify(data));
    localStorage.setItem('cart',  this.arrayMenuItem.toString());
    this.addCart = true;
    setTimeout (() => {
      this.addCart = false;
    }, 1000);
    this.checkDataItemCart();
    /*var array = JSON.parse("[" + localStorage.getItem('cart') + "]");
    console.log(array);*/
  }

  checkDataItemCart(){
    this.itemCartCheck = JSON.parse("[" + localStorage.getItem('cart') + "]");
  }

}
