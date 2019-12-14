import { Component, OnInit } from '@angular/core';
import { EmailClienteService } from './service/email-cliente-service.service';
import { EmailCliente } from './email-cliente';
import { ModalEmailClienteService } from './modal-email-cliente.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-email-cliente',
  templateUrl: './email-cliente.component.html',
  styleUrls: ['./email-cliente.component.css']
})
export class EmailClienteComponent implements OnInit {
  emailClientes: any[];
  emailClientesSeleccionados: EmailCliente;
  tipo: string;

  constructor(
    private emailClienteService: EmailClienteService,
    private modaleEmailClienteService: ModalEmailClienteService,
    private activatedRoute: ActivatedRoute) {
      this.emailClienteService.getClientes().subscribe((data: any) => {
        this.emailClientes = data;
      });    
  }

  ngOnInit() {
    this.modaleEmailClienteService.notificarCambio.subscribe( emailCliente => {
      if(this.tipo === 'new') {
        this.emailClientes.push(emailCliente);
      } else if (this.tipo === 'update') {
        this.emailClientes = this.emailClientes.map(emailClienteOriginal => {
          if (emailCliente.codigoEmail === emailClienteOriginal.codigoEmail) {
            emailClienteOriginal = EmailCliente;
          }
          return emailClienteOriginal;
        });
      }
    });
  }

  delete(emailCliente: EmailCliente): void {
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
      this.emailClienteService.delete(emailCliente.codigoEmail).subscribe(
        () => {
          this.emailClientes = this.emailClientes.filter(emailC => emailC !== emailCliente);
          Swal.fire('Email cliente eliminado', `Email cliente ${emailCliente.email} eliminado correctamente`, 'success');
        }
      );
    });
  }

  abrirModal(emailCliente?: EmailCliente) {
    if (emailCliente) {
      this.emailClientesSeleccionados = emailCliente;
      this.tipo = 'update';
    } else {
      this.tipo = 'new';
      this.emailClientesSeleccionados = new EmailCliente();
    }
    this.modaleEmailClienteService.abrirModal();
  }
}
