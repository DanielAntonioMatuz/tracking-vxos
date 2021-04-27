import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'
  ]
})
export class CartComponent implements OnInit {

  public cartUser;
  public precioTotal = 0;

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
