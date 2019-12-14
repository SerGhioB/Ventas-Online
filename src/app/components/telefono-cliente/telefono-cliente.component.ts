import { Component, OnInit } from '@angular/core';
import { TelefonoClienteService } from './service/telefono-cliente-service.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { TelefonoCliente } from './telefono-cliente';
import { ModalTelefonoClienteService } from './modal-telefono-cliente.service';

@Component({
  selector: 'app-telefono-cliente',
  templateUrl: './telefono-cliente.component.html',
  styleUrls: ['./telefono-cliente.component.css']
})
export class TelefonoClienteComponent implements OnInit {
  telefonoClientes: any[];
  telefonoClientesSeleccionado: TelefonoCliente;
  tipo: string;
  
  constructor(
    private telefonoClienteService: TelefonoClienteService,
    private modalTelefonoClienteService: ModalTelefonoClienteService,
    private activatedRoute: ActivatedRoute) {    
      this.telefonoClienteService.getTelefonoClientes().subscribe((data: any) => {
        this.telefonoClientes = data;
      });
   }

  ngOnInit() {
    this.modalTelefonoClienteService.notificarCambio.subscribe(telefonoCliente => {
      if (this.tipo === 'new') {
        this.telefonoClientes.push(telefonoCliente);
      } else if (this.tipo === 'update') {
        this.telefonoClientes = this.telefonoClientes.map(telefonoClienteOriginal => {
          if (telefonoCliente.codigoTelefono === telefonoClienteOriginal.codigoTelefono) {
            telefonoClienteOriginal = telefonoCliente;
          }
          return telefonoClienteOriginal;
        });
      }
    });
  }

  delete(telefonoCliente: TelefonoCliente): void {
    Swal.fire({
      title: 'Eliminar registro',
      text: 'Está seguro de eliminar el registro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#D33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      this.telefonoClienteService.delete(telefonoCliente.codigoTelefono).subscribe(
        () => {
          this.telefonoClientes = this.telefonoClientes.filter(telCliente => telCliente !== telefonoCliente);
          Swal.fire('Telefono Cliente eliminado', `Telefono Cliente ${telefonoCliente.number} eliminado correctamente`, 'success');
        }
      );
    });
  }

  abrirModal(telefonoCliente?: TelefonoCliente) {
    if (telefonoCliente) {
      this.telefonoClientesSeleccionado = telefonoCliente;
      this.tipo = 'update';
    } else {
      this.tipo = 'new';
      this.telefonoClientesSeleccionado = new TelefonoCliente();
    }
    this.modalTelefonoClienteService.abrirModal();
  }

}
