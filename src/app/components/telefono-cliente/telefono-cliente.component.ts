import { Component, OnInit } from '@angular/core';
import { TelefonoClienteService } from './service/telefono-cliente-service.service';

@Component({
  selector: 'app-telefono-cliente',
  templateUrl: './telefono-cliente.component.html',
  styleUrls: ['./telefono-cliente.component.css']
})
export class TelefonoClienteComponent implements OnInit {
  telefonoclientes: any[] = [];

  constructor(private telefonoClienteService: TelefonoClienteService) {
    this.telefonoClienteService.getTelefonoCliente().subscribe((data: any) => {
    this.telefonoclientes = data;
    });
   }

  ngOnInit() {
  }

}
