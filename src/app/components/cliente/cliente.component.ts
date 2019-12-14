import { Component, OnInit } from '@angular/core';
import { ClienteService } from './service/cliente-service.service';
import { Cliente } from './cliente';
import { ModalClienteService } from './modal-cliente.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  clientes: any[];
  clientesSeleccionado: Cliente;
  tipo: string;  

  constructor(
    private clienteService: ClienteService,
    private modalClienteService: ModalClienteService,
    private activatedRouter: ActivatedRoute ) {
      this.clienteService.getClientes().subscribe((data: any) => {
        this.clientes = data;
      })    
   }

  ngOnInit() {
    this.modalClienteService.notificarCambio.subscribe( cliente => {
      if (this.tipo == 'new') {
        this.clientes.push(cliente);
      } else if (this.tipo === 'update') {
        this.clientes = this.clientes.map(clienteOrigial => {
          if (cliente.nit === clienteOrigial.nit) {
            clienteOrigial = cliente;
          }
          return clienteOrigial;
        });
      }
    });
  }

  delete(cliente: Cliente): void {
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
      this.clienteService.delete(cliente.nit).subscribe(
        () => {
          this.clientes = this.clientes.filter(client => client !== cliente);
          Swal.fire('Cliente eliminado', `Cliente ${cliente.nombre} eliminado correctamente`, 'success');
        }
      );
    });
  }

  abrirModal(cliente?: Cliente) {
    if (cliente) {
      this.clientesSeleccionado = cliente;
      this.tipo = 'update';
    } else {
      this.tipo = 'new';
      this.clientesSeleccionado = new Cliente();
    }
    this.modalClienteService.abrirModal();
  }

}
