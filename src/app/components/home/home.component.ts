import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  constructor(private spinnerService: NgxSpinnerService, private _router: Router, private _userService: UserService) {
  }
  public user: User;
  public estatus = true;
  public details;

  @ViewChild('idValue') dataId: string;

  // tslint:disable-next-line:typedef
  ngOnInit(){
    this.spinner();
  }

  spinner(): void {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 3000);
  }

  // tslint:disable-next-line:typedef
  valueId(idValue: string){
    console.log(idValue);

    // tslint:disable-next-line:triple-equals
    console.log(idValue.length);
    if (idValue.length === 5){
      this.estatus = true;
      this._userService.getUser(idValue.toLocaleLowerCase()).subscribe(
        response => {

          if (response.user){
            this._router.navigate(['/profile', idValue.toLocaleLowerCase()]);

          } else {
            this.details = 'No existe una ID de rastreo, intentelo nuevamente, asegurese de que este escrito correctamente ';
          }

        }, error => {
          this.details = 'No existe una ID de rastreo, intentelo nuevamente, asegurese de que este escrito correctamente ';
        }
      );
    }

    if (idValue.length > 5 || idValue.length < 5){
      this.estatus = false;
      this.details = 'Su ID ingresado es erroneo, el formato es de 5 digitos';
    }
  }
}
