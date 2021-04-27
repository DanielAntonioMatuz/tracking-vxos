import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {EmpresaConnectionsService} from '../../services/empresaConnections.service';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss']
})
export class ContentsComponent implements OnInit {

  public identity;
  public token;
  public dataUser;
  public topUser;

  constructor(
    private _userService: UserService,
    private _empresasService: EmpresaConnectionsService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

  }

  ngOnInit(): void {
    this._empresasService.getEmpresas().subscribe((data) => {
      this.dataUserObject(data.users);
      console.log(data);
    });
    this._empresasService.getPaginationEmpresas(1).subscribe((data) => {
      this.dataTopUser(data.publications);
    });




  }

  dataUserObject(data){
    this.dataUser = data;
  }

  dataTopUser(data){
    this.topUser = data;
    console.log(data);
  }

}
