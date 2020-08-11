import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../services/message.service';
// import * as swal from 'sweetalert';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public msgService = true;
  public tickect;


  // tslint:disable-next-line:variable-name
  constructor(private _MessageService: MessageService) {

  }

  ngOnInit(): void {
    // tslint:disable-next-line:max-line-length
    this.tickect = 'A' +  Math.ceil(Math.random() * 10000) + 'Q' + Math.ceil(Math.random() * 10000) + 'T' + Math.ceil(Math.random() * 10000);
  }

  // tslint:disable-next-line:typedef
  contactForm(form) {
    this._MessageService.sendMessage(form).subscribe(() => {
      this.msgService = false;
      // swal('Formulario de contacto', 'Mensaje enviado correctamente', 'success');
    });
  }

}
