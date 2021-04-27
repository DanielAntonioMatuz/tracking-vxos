import { Component, OnInit } from '@angular/core';
import {Admin} from '../../models/Admin';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {GLOBAL} from '../../services/GLOBAL';
import {Settings} from '../../models/settings';
import {SettingsService} from '../../services/settings.service';
import {HorarioSettingsService} from '../../services/horarioSettings.service';
import {Horario} from '../../models/horario';
import {Empresa} from '../../models/empresa';
import {EmpresaConnectionsService} from '../../services/empresaConnections.service';
import {UploadService} from '../../services/upload.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.scss']
})
export class RegisterAdminComponent implements OnInit {


  public title: string;
  public user: Admin;
  public status: string;
  public identity;
  public url;
  public token;
  public ref = false;
  public settings: Settings;
  public horario: Horario;
  public empresa: Empresa;
  public active = false;
  files: File[] = [];
  public image;
  public imageData;
  public nombreEmpresaData;
  public categoriaEmpresaData;
  public descripcionEmpresaData;
  public direccionEmpresaData;


  constructor(
    // tslint:disable-next-line:variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private _router: Router,
    // tslint:disable-next-line:variable-name
    private _userService: UserService,
    private _settingsService: SettingsService,
    private _horarioService: HorarioSettingsService,
    private _empresaService: EmpresaConnectionsService,
    private _uploadService: UploadService

  ) {
    this.title = 'Registrarse';
    this.url = GLOBAL.url;
    this.user = new Admin(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    );

  }

  ngOnInit(): void {
    this.token = this._userService.getToken();
  }

  // tslint:disable-next-line:typedef
  logout() {
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/login']);
  }

  // tslint:disable-next-line:typedef
  onSubmit(form) {
    console.log(this.user);
    this._userService.registerAdmin(this.user).subscribe(
        response => {
          if (response.user && response.user._id) {
            // console.log(response.user);
            this.settings = new Settings(
              '',
              '',
              '',
              '',
              '',
              '',
              'VxOS',
              '',
              '',
              response.user._id,
            );
            console.log(response.user._id);
            this.horario = new Horario(
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              response.user._id,
            );

            const file_data = this.files[0];
            const data = new FormData();
            data.append('file', file_data);
            data.append('upload_preset','images-vxosplatform');
            data.append('cloud_name', 'vxosplatform');
            this._uploadService.uploadImage(data).subscribe((data) => {
              if(data){
                console.log(data);
                this.image = 'https://res.cloudinary.com/vxosplatform/image/upload/c_scale,h_713,w_1000/v1597631715/' + data.public_id + '.' + data.format;
                this.registerImageEmpresa(this.image);
              }
              this.empresa = new Empresa(
                this.imageData,
                this.categoriaEmpresaData,
                this.nombreEmpresaData,
                this.descripcionEmpresaData,
                this.direccionEmpresaData,
                response.user._id,
              );
              this._empresaService.registerEmpresa(this.empresa, this.token).subscribe((data) => {
                console.log(data);
              })
            });


            // console.log(response.user);
            this._settingsService.registerSettings(this.settings, this.token).subscribe((data) =>{
              this.status = 'success';
              form.reset();
            });

            this._horarioService.registerHorario(this.horario, this.token).subscribe((data) => {
              console.log(data);
            });



          } else {
            this.status = 'error';
          }
        },
        error => {
          console.log(error as any);
        }
      );

  }

  registerImageEmpresa(data){
    this.imageData = data
  }

  settingsRegister(){
    this.active = !this.active;
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  nombreEmpresa(data){
    this.nombreEmpresaData = data;
  }

  categoriaEmpresa(data){
    this.categoriaEmpresaData = data;
  }

  descripcionEmpresa(data){
    this.descripcionEmpresaData = data;
    console.log(data);
  }

  direccionEmpresa(data){
    this.direccionEmpresaData = data;
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngDoCheck() {
    this.identity = this._userService.getIdentity();
  }
}

