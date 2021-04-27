import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {UploadService} from '../../services/upload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  constructor(private spinnerService: NgxSpinnerService, private _router: Router,
              private _userService: UserService, private _servicesGlobal: UploadService) {
  }
  public user: User;
  public estatus = true;
  public details;
  public cookies = true;
  public ciudadOrigen = false;
  public ciudadOrigenData;

  //@ViewChild('idValue') dataId: string;

  // tslint:disable-next-line:typedef
  ngOnInit(){
    this.spinner();
    if (localStorage.getItem('cookies') === 'ok'){
      this.cookies = false;
    }
    this._servicesGlobal.getGeolocation().subscribe((data) => {
      this.ciudadOrigenData = data.city;
      if (data.city === 'Tuxtla Gutiérrez'){
        this.ciudadOrigen = true;
      } else {
        this.ciudadOrigen = false;
      }
    });

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
            this.estatus = false;
            // tslint:disable-next-line:max-line-length
            this.details = 'No existe un ID de rastreo bajo este código, intentelo nuevamente, asegurese de que este escrito correctamente ';
          }

        }, error => {
          this.estatus = false;
          this.details = 'No existe un ID de rastreo bajo este código, intentelo nuevamente, asegurese de que este escrito correctamente ';
        }
      );
    }

    if (idValue.length > 5 || idValue.length < 5){
      this.estatus = false;
      this.details = 'Su ID ingresado es erroneo, el formato es de 5 digitos';
    }
  }

  // tslint:disable-next-line:typedef
  acceptCookies(){
    localStorage.setItem('cookies', 'ok');
  }
}
