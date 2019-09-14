import { Component, OnInit } from '@angular/core';
import { EmailClienteService } from './service/email-cliente-service.service';

@Component({
  selector: 'app-email-cliente',
  templateUrl: './email-cliente.component.html',
  styleUrls: ['./email-cliente.component.css']
})
export class EmailClienteComponent implements OnInit {
  emailclientes: any[] = [];

  constructor(private emailClienteService: EmailClienteService) {
    this.emailClienteService.getEmailCliente().subscribe((data: any) => {
      this.emailclientes = data;
    });
  }

  ngOnInit() {
  }

}
