import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-confirm',
  templateUrl: './details-confirm.component.html',
  styleUrls: ['./details-confirm.component.scss']
})
export class DetailsConfirmComponent implements OnInit {

  public cartUser;
  public precioTotal = 0;
  public valueConfirm = 0;
  public textConfirm;

  constructor() { }

  ngOnInit(): void {
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
