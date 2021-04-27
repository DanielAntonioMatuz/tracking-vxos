import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {SocketService} from '../../services/socket.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  public notification = false;
  public textNotification;
  public users;
  public notificationActive = false;
  public dataNew = [];
  public identity;
  public token;
  public avance = 0;
  public progress = 0;
  public checkNotify = false;


  constructor(
    // tslint:disable-next-line:variable-name
    private _socketService: SocketService,
    // tslint:disable-next-line:variable-name
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this._socketService.listen('new-data').subscribe((data) => {
      if (data === 'user connected'){
        this.notificationActive = true;
      } else {
        console.log('NUEVO REGISTRO');
        this.notification = true;
        this.checkNotify = true;
        this.textNotification = data;
        this.dataNew.push({data});
        console.log(this.dataNew);
      }
      setTimeout (() => {
        this.notification = false;
        this.notificationActive = false;
      }, 10000);
    });
  }
  // tslint:disable-next-line:typedef
  dataCheck(){
    this._userService.get_user(this.token).subscribe(
      response => {
        this.users = response.users;
        this.progress = 100 / this.users.length;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.users.length; i++){
          // tslint:disable-next-line:triple-equals
          if (this.users[i].estadoLicencia != '' && this.users[i].estadoLicencia != null){
            this.avance ++;
          }
        }
        // tslint:disable-next-line:radix
        this.progress = this.users.length;
        this.avance = this.users.length - this.avance;

      }, error => {
        // tslint:disable-next-line:prefer-const
        let errorMessage = error as any;
        console.log(errorMessage);

        if (errorMessage != null){
        }
      }
    );
  }

}
