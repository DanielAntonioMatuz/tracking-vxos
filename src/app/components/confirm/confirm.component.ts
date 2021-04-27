import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  public cartUser;
  public precioTotal = 0;
  public valueConfirm = 0;
  public textConfirm;

  constructor(
    private _router: Router,
  ) { }

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

  confirmCart(){
    setTimeout (() => {
      this.valueConfirm = 10;
      this.textConfirm = 'configurando pedido';

      setTimeout (() => {
        this.valueConfirm = 27;
        this.textConfirm = 'contactando a los negocios';

        setTimeout (() => {
          this.valueConfirm = 52;
          this.textConfirm = 'validando pedido';

          setTimeout (() => {
            this.valueConfirm = 71;
            this.textConfirm = 'registrando pedido';

            setTimeout (() => {
              this.valueConfirm = 100;
              this.textConfirm = 'Pedido enviado';
            }, 2000);
            this._router.navigate(['/cart/confirm/details-confirm']);

          }, 5000);
        }, 2000);
      }, 3000);
    }, 2000);


  }

}
