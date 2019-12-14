import { Component, OnInit } from '@angular/core';
import { TipoEmpaqueService } from './service/tipo-empaque-service.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { TipoEmpaque } from './tipo-empaque';
import { ModalTipoEmpaqueService } from './modal-tipo-empaque.service';

@Component({
  selector: 'app-tipo-empaque',
  templateUrl: './tipo-empaque.component.html',
  styleUrls: ['./tipo-empaque.component.css']
})
export class TipoEmpaqueComponent implements OnInit {
  tipoEmpaques: any[];
  tipoEmpaquesSeleccionado: TipoEmpaque;
  tipo: string;

  constructor(
    private tipoEmpaqueService: TipoEmpaqueService,
    private modalTipoEmpaqueService: ModalTipoEmpaqueService,
    private activatedRoute: ActivatedRoute) {
      this.tipoEmpaqueService.getTipoEmpaques().subscribe((data: any) => {
        this.tipoEmpaques = data;
      })    
   }

  ngOnInit() {
    this.modalTipoEmpaqueService.notificarCambio.subscribe( tipoEmpaque => {
      if (this.tipo === 'new') {
        this.tipoEmpaques.push(tipoEmpaque);
      } else if (this.tipo === 'update') {
        this.tipoEmpaques = this.tipoEmpaques.map(tipoEmpaqueOriginal => {
          if (tipoEmpaque.codigoEmpaque === tipoEmpaqueOriginal.codigoEmpaque) {
            tipoEmpaqueOriginal = tipoEmpaque;
          }
          return tipoEmpaqueOriginal;
        });
      }
    });
  }

  delete(tipoEmpaque: TipoEmpaque): void {
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
      this.tipoEmpaqueService.delete(tipoEmpaque.codigoEmpaque).subscribe(
        () => {
          this.tipoEmpaques = this.tipoEmpaques.filter(tipoEmp => tipoEmp !== tipoEmpaque);
          Swal.fire('Tipo Empaque eliminado', `Tipo Empaque ${tipoEmpaque.descripcion} eliminado correctamente`, 'success');
        }
      );
    });
  }

  abrirModal(tipoEmpaque?: TipoEmpaque) {
    if (tipoEmpaque) {
      this.tipoEmpaquesSeleccionado = tipoEmpaque;
      this.tipo = 'update';
    } else {
      this.tipo = 'new';
      this.tipoEmpaquesSeleccionado = new TipoEmpaque();
    }
    this.modalTipoEmpaqueService.abrirModal();
  }

}
