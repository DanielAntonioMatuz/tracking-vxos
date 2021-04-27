import {Component, DoCheck, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {SocketService} from '../../services/socket.service';
import { ConnectionService } from 'ng-connection-service';
import {NotificationsService} from '../../services/notifications.service';
import {Notification} from '../../models/notification';
import {User} from '../../models/user';
import {interval} from 'rxjs';
import {SettingsService} from '../../services/settings.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public identity;
  public notification = false;
  public textNotification;
  public users;
  public notificationActive = false;
  public dataNew = [];
  public token;
  public checkNotify = false;
  public notNotification = false;
  public notificationUpdate;
  public dataValueNew = [];
  public user: User;
  public status: string;
  public url;
  public colorNavbar = '#f0f0f0';
  public colorText = '#000000';
  public notificationColor = '#000000';
  public logo;
  public logoText = 'VxOS';
  public styleLogo;
  private source = interval(3000);
  public settings;
  public dataIdentityNotification;


  constructor(    // tslint:disable-next-line:variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private _router: Router,
    // tslint:disable-next-line:variable-name
    private _userService: UserService,
    // tslint:disable-next-line:variable-name
    private _socketService: SocketService,
    // tslint:disable-next-line:variable-name
    private _notificationService: NotificationsService,
    private  _settingsService: SettingsService
  ) {
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.backupNotification();
    this.settingsCheck();
    this._socketService.listen('new-data').subscribe((data: String) => {
      if (data === 'user connected'){
        this.notificationActive = true;
        this.settingsCheck();
      } else {
        this.dataIdentityNotification = data.toString().split('/');
        if(this.dataIdentityNotification[1] === this.identity._id){
          this.backupNotification();
          this.notNotification = false;
          this.notification = true;
          this.checkNotify = true;
          this.textNotification = this.dataIdentityNotification[0];
        }
        // this.dataNew.push({data});
        // localStorage.setItem('notifications', JSON.stringify(this.dataNew));
        // console.log(this.dataNew);
        /*if (this.dataNew.length === null){
            this.dataValueNew = 0;
          } else {
            this.dataValueNew = this.dataNew.length;
        } */
        // this.backupNotification();
      }
      setTimeout (() => {
        this.notification = false;
        this.notificationActive = false;
      }, 10000);
    });
  }

  // tslint:disable-next-line:typedef
  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/login']);
  }

  // tslint:disable-next-line:typedef
  backupNotification(){
    var array = [];
    var arrayData = [];
    setTimeout (() => {
      this._notificationService.getNotifications(this.identity._id, this.token).subscribe((data) => {
        for (let i = 0; i < data.notifications.length; i++){
          if (data.notifications[i].estatus === 'false'){
            this.dataNew.push(data.notifications[i]);
            arrayData.push(data.notifications[i]);
            array.push(this.removeDuplicates(this.dataNew, data.notifications[i]));
          }
        }
        this.dataNew = array;
        if (this.dataNew.length === 0){
          this.notNotification = true;
        }
      });
    }, 200);




  }

   removeDuplicates(originalArray, prop) {
    var newArray;
    var lookupObject  = {};

    for(var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(var i in lookupObject) {
      this.dataValueNew.push(lookupObject[i]);
      newArray = lookupObject[i];
    }
    return newArray;
  }

  // tslint:disable-next-line:typedef
  checkNotification(notification ?: Notification){

    this.notificationUpdate = {
      _id: notification._id,
      nombre: notification.nombre,
      detalles: notification.detalles,
      empresa: notification.empresa,
      fecha: notification.fecha,
      imagen: notification.imagen,
      anexos: notification.anexos,
      estatus: 'true',
      user: notification.user,
    };

    this._notificationService.updateNotifications(this.notificationUpdate, this.token).subscribe(
      response => {
        if (!response.notification){
          this.status = 'error';
        } else {
          this.status = 'success';
          this.backupNotification();
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
      // this.dataNew.splice(id, id);
    /*this.dataNew.splice(id, 1);
    localStorage.setItem('notifications', JSON.stringify(this.dataNew));
    if (this.dataNew.length === 0){
      this.notNotification = true;
    }*/
  }

  // tslint:disable-next-line:typedef
  deleteNotificationAll(){
    // this.dataNew.splice(id, id);
    this.dataNew = [];
    // localStorage.setItem('notifications', JSON.stringify(this.dataNew));
    this.notNotification = true;

  }

  settingsCheck(){
      var data = JSON.parse(localStorage.getItem('settings'))
      this.settings = data.settings;
      this.colorNavbar = this.settings[0].navbarColor;
      this.colorText = this.settings[0].textColor;
      this.notificationColor = this.settings[0].notificationColor;
      this.logo = this.settings[0].logo;
      this.logoText = this.settings[0].logoText;
      this.styleLogo = this.settings[0].styleLogo;
  }


}
