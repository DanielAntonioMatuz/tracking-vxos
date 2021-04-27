import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import {User} from '../../models/user';
import {MessageService} from '../../services/message.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: []
})
export class ProfileComponent implements OnInit {

  public status;
  public soliLicense;
  public fecha;
  public user: User;
  public estatus = true;
  public details;
  public btnRs = false;
  public tickect;
  public msgService = true;
  public cfm = false;
  public identity;
  public token;

  constructor(
    // tslint:disable-next-line:variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private _router: Router,
    // tslint:disable-next-line:variable-name
    private _userService: UserService,
    // tslint:disable-next-line:variable-name
    private _MessageService: MessageService

  ) {
    this.details = 'Ocultar rastreo de licencia';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {

    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = hoy.getMonth() + 1;
    const dia = hoy.getDay() + 4;
    // tslint:disable-next-line:max-line-length
    this.tickect = 'A' +  Math.ceil(Math.random() * 10000) + 'Q' + Math.ceil(Math.random() * 10000) + 'T' + Math.ceil(Math.random() * 10000);

    // tslint:disable-next-line:prefer-const one-variable-per-declaration

    // console.log(dia + 2 + '/' + mes + '/' + anio);
    this.fecha = dia + '/' + mes + '/' + anio;
    this.loadPage();
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
          // console.log(response);
          this.user = response.user;
          // console.log(this.fecha);
          // console.log(this.fecha);
          // console.log(response.user.vigencia);
          const fechVigencia = new Date(response.user.vigencia);
          const fechActual = new Date(this.fecha);
          console.log(fechActual);
          console.log(fechVigencia);
          this.status = true;
          this.soliLicense = 'Solicito renovación de mi licencia de con vigencia: ' + this.user.vigencia;

          // tslint:disable-next-line:triple-equals max-line-length
          /*if (new Date(response.user.vigencia).getTime() < new Date(this.fecha).getTime() && new Date(response.user.vigencia).getTime() != undefined){
            this.cfm = true;
            this.status = true;
            const data = {
              _id: this.user._id,
              nombre: this.user.nombre,
              email: this.user.email,
              estadoLicencia: 'Inactivo',
              act1: this.user.act1,
              act2: this.user.act2,
              act3: this.user.act4,
              act4: this.user.act4,
              vigencia: this.user.vigencia,
              fechaActivacion: this.user.fechaActivacion,
              referencia: this.user.referencia,
              tipoLicencia: this.user.tipoLicencia,
            };

            this._userService.update_config(data).subscribe(
              // tslint:disable-next-line:no-shadowed-variable
              response => {
                if (!response.user){
                  this.status = 'error';
                } else {
                  this.status = 'success';
                }
              },
              error => {
                // tslint:disable-next-line:prefer-const
                let errorMessage = error as any;
                console.log(errorMessage);

                if (errorMessage != null){
                  this.status = 'error';
                }
              }
            );
            this.soliLicense = 'Solicito renovación de mi licencia de con vigencia: ' + this.user.vigencia;
          } else {
            this.status = false;
          }*/
        } else {
          this.status = 'error';
        }

      }, error => {
      }
    );
  }

  // tslint:disable-next-line:typedef
  exportAsPDF(myDiv: string)
  {
    const data = document.getElementById('report');
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('l', 'cm', 'a4'); // Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
      pdf.save('report_licence.pdf');
    });
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

  // tslint:disable-next-line:typedef
  hiddenRastreo(){
    // this.btnRs = true;

    if (this.btnRs === false) {
      this.btnRs = true;
      this.details = 'Mostrar rastreo de licencia';
    } else {
      this.btnRs = false;
      this.details = 'Ocultar rastreo de licencia';

    }
  }

  // tslint:disable-next-line:typedef
  contactForm(form) {
    this._MessageService.sendMessage(form).subscribe(() => {
      this.msgService = false;
      // swal('Formulario de contacto', 'Mensaje enviado correctamente', 'success');
    });
  }
}
