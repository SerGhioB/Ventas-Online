import { Component, OnInit } from '@angular/core';
import { InventarioService } from './service/inventario-service.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Inventario } from './inventario';
import { ModalInventarioService } from './modal-inventario.service';


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  inventarios: any[];
  inventariosSeleccionado: Inventario;
  tipo: string;
  
  constructor(
    private inventarioService: InventarioService,
    private modalInventarioService: ModalInventarioService,
    private activatedRoute: ActivatedRoute) {
      this.inventarioService.getInventarios().subscribe((data: any) => {
        this.inventarios = data;
      });    
   }

  ngOnInit() {
    this.modalInventarioService.notificarCambio.subscribe( inventario => {
      if ( this.tipo === 'new') {
        this.inventarios.push(inventario);
      } else if ( this.tipo === 'update') {
        this.inventarios = this.inventarios.map(inventarioOriginal => {
          if (inventario.codigoInventario === inventarioOriginal.codigoInventario) {
            inventarioOriginal = inventario;
          }
          return inventarioOriginal;
        });
      }
    });
  }

  delete(inventario: Inventario): void {
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
      this.inventarioService.delete(inventario.codigoInventario).subscribe(
        () => {
          this.inventarios = this.inventarios.filter(invent => invent !== inventario);
          Swal.fire('Inventario eliminado', `Inventario ${inventario.tipoRegistro} eliminado correctamente`, 'success');
        }
      );
    });
  }

  abrirModal(inventario?: Inventario) {
    if (inventario) {
      this.inventariosSeleccionado = inventario;
      this.tipo = 'update';
    } else {
      this.tipo = 'new';
      this.inventariosSeleccionado = new Inventario();
    }
    this.modalInventarioService.abrirModal();
  }

}
