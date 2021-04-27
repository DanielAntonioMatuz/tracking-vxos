import {Component, DoCheck, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {NotificationsService} from '../../services/notifications.service';

import {User} from '../../models/user';
import {GLOBAL} from '../../services/GLOBAL';
import {SocketService} from '../../services/socket.service';
import {interval, Subject} from 'rxjs';
import {first} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {SettingsService} from '../../services/settings.service';
import {Settings} from '../../models/settings';
import {Horario} from '../../models/horario';
import {HorarioSettingsService} from '../../services/horarioSettings.service';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  public user: User;
  public status: string;
  public identity;
  public token;
  public url;
  public colorNavbar = '#f0f0f0';
  public colorText = '#000000';
  public notificationColor = '#000000';
  public logo;
  public logoText = 'VxOS';
  public styleLogo;
  public servicesPlatform = false;
  public servicesBot = false;
  public servicesNotification = false;
  private source = interval(3000);
  public settings;
  public settingsUpdate;
  public changeSettings = false;
  public horarios = [];
  public horariosServicio= [];
  public dias;
  public lunes;
  public martes;
  public miercoles;
  public jueves;
  public viernes;
  public sabado;
  public domingo;
  public horario: Horario;
  public updateHorario;
  public idHorario;
  public horarioSettings;

  @ViewChild('idValue') dataId: string;
  @ViewChild('idValueLogoText') dataIdLogoText: string;
  @ViewChild('idValueColorNotification') dataIdColorNotification: string;
  @ViewChild('textArea', { read: ElementRef }) textArea: ElementRef;
  @ViewChild('textArea') dataIdStyleText: string;
  @ViewChild('colorTextNavbar') dataIdColorText: string;
  @ViewChild('diaAbre') diaAbre: string;
  @ViewChild('diaCierra') diaCierra: string;



  constructor(    // tslint:disable-next-line:variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private _router: Router,
    // tslint:disable-next-line:variable-name
    private _userService: UserService,
    // tslint:disable-next-line:variable-name
    private _socketService: SocketService,
    // tslint:disable-next-line:variable-name
    private _http: HttpClient,
    // tslint:disable-next-line:variable-name
    private _notificationService: NotificationsService,
    private _settingsService: SettingsService,
    private _horarioService: HorarioSettingsService

  ) {

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this._horarioService.getHorario(this.identity._id, this.token).subscribe((data) => {
      this.horarioSettings = data.horario;
       this.idHorario = data.horario[0]._id;
       this.loadHorario(this.idHorario);
    });

  }


  ngOnInit(): void {
    this.loadPage();
    // this.getPublicationUser(this.user, this.page);
    this._socketService.listen('new-data').subscribe(data => {
      this.settingsCheck();
    });

    this.horarios.push('Cerrado');
    this.dias = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'];
    for(let i = 0; i < 24; i++){
      if(i < 12){
        this.horarios.push(i + ':00 A.M');
      } else {
        this.horarios.push(i + ':00 P.M');
      }
    }
  }

  loadHorario(idHorario){
    this.horario = new Horario(
      idHorario,
      this.horarioSettings[0].domingoAbre,
      this.horarioSettings[0].domingoCierra,
      this.horarioSettings[0].lunesAbre,
      this.horarioSettings[0].lunesCierra,
      this.horarioSettings[0].martesAbre,
      this.horarioSettings[0].martesCierra,
      this.horarioSettings[0].miercolesAbre,
      this.horarioSettings[0].miercolesCierra,
      this.horarioSettings[0].juevesAbre,
      this.horarioSettings[0].juevesCierra,
      this.horarioSettings[0].viernesAbre,
      this.horarioSettings[0].viernesCierra,
      this.horarioSettings[0].sabadoAbre,
      this.horarioSettings[0].sabadoCierra,
      this.identity._id
    );
    console.log(this.horarioSettings);
  }

  // tslint:disable-next-line:typedef
  loadPage(){
    this._route.params.subscribe(params => {
      const id = params.id;
      this.settingsCheck();
      this.getUser(id);

    });
  }

  settingsCheck(){
    this._settingsService.getSettings(this.identity._id, this.token).subscribe(data => {
      this.settings = data.settings;
      this.colorNavbar = this.settings[0].navbarColor;
      this.colorText = this.settings[0].textColor;
      this.notificationColor = this.settings[0].notificationColor;
      this.logo = this.settings[0].logo;
      this.logoText = this.settings[0].logoText;
      this.styleLogo = this.settings[0].styleLogo;

      console.log(data);
      localStorage.setItem('settings', JSON.stringify(data));
      console.log(localStorage.getItem('settings'));
    })
  }

  // tslint:disable-next-line:typedef
  getUser(id){
    this._userService.getUserService(id).subscribe(
      response => {

        if (response.user){
          this.user = response.user;
          setTimeout (() => {
            this.servicesPlatform = true;
            this.servicesBot = true;
            this.servicesNotification = true;
          }, 3000);

        } else {


        }

      }, error => {
        this._router.navigate(['/my-profile', this.identity._id]);
        this.status = 'error';
        this.servicesBot = false;
        this.servicesNotification = false;
        this.servicesPlatform = false;
      }
    );
  }

  // tslint:disable-next-line:typedef


  // tslint:disable-next-line:typedef
  valueId(idValue){
    this.settings[0].navbarColor = idValue;
    this.dataUpdateSettings(this.settings);
  }

  valueIdLogoText(idValue){
    this.settings[0].logoText = idValue;
    this.dataUpdateSettings(this.settings);
  }

  valueIdNotifications(idValue){
    this.settings[0].notificationColor = idValue;
    this.dataUpdateSettings(this.settings);
  }

  valueIdStyleLogo(idValue){
    this.settings[0].styleLogo = idValue;
    this.dataUpdateSettings(this.settings);
  }

  valueIdColorText(idValue){
    this.settings[0].textColor = idValue;
    this.dataUpdateSettings(this.settings);
  }

  dataUpdateSettings(settings: Settings){
    this.changeSettings = true;
    this.settingsUpdate = {
      _id: settings[0]._id,
      navbarColor: settings[0].navbarColor,
      textColor: settings[0].textColor,
      notificationColor: settings[0].notificationColor,
      fecha: settings[0].fecha,
      logo: settings[0].logo,
      logoText: settings[0].logoText,
      styleLogo: settings[0].styleLogo,
      user: this.identity._id,
    };

    this._settingsService.updateSettings(this.settingsUpdate, this.token).subscribe(
      response => {
        if (!response.settings){
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
    setTimeout (() => {
      this.settingsCheck();
    }, 200);
    setTimeout (() => {
      this.changeSettings = false;
    }, 5000);
  }

  public  autoGrow() {
    const textArea = this.textArea.nativeElement;
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  reloadService(){
    window.location.reload()
  }

  horarioDia(event){
    this.updateVegetablesCollection(event);
    console.log(this.horariosServicio);
  }

  updateVegetablesCollection ( hora) {
    if (this.horariosServicio.indexOf(hora) === -1) {
      this.horariosServicio.push(hora);
      console.log('La nueva colección de vegetales es: ' + this.horariosServicio);
    } else if (this.horariosServicio.indexOf(hora) > -1) {
      console.log(hora + ' ya existe en la colección de verduras.');
    }
  }



  saveHours(form){
    console.log(this.horario);
    this._horarioService.updateHorario(this.horario, this.token).subscribe((data) => {
      console.log(data);
      setTimeout (() => {
        this.changeSettings = true;
      }, 500);
      setTimeout (() => {
        this.changeSettings = false;
      }, 5000);
    });
  }

}
