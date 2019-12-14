import { Component, OnInit } from '@angular/core';
import { CategoriaService } from './service/categoria-service.service';
import { Categoria } from './categoria';
import { ActivatedRoute } from '@angular/router';
import { ModalCategoriasServiceService } from './modal-categorias-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categorias: any[];
  categoriasSeleccionado: Categoria;
  tipo: string;
  paginador: any;

  constructor(
    private categoriaService: CategoriaService, 
    private modalCategoriaService: ModalCategoriasServiceService,
    private activatedRoute: ActivatedRoute) {
      this.categoriaService.getCategorias().subscribe((data: any) => {
        this.categorias = data;
      });
  }

  ngOnInit() {
   this.modalCategoriaService.notificarCambio.subscribe( categoria => {
     if (this.tipo === 'new') {
       this.categorias.push(categoria);
     } else if (this.tipo === 'update') {
       this.categorias = this.categorias.map(categoriaOriginal => {
         if (categoria.codigoCategoria === categoriaOriginal.codigoCategoria) {
           categoriaOriginal = categoria;
         }
         return categoriaOriginal;
       });
     }
   });
  }

  delete(categoria: Categoria): void {
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
      this.categoriaService.delete(categoria.codigoCategoria).subscribe(
        () => {
          this.categorias = this.categorias.filter(cat => cat !== categoria);
          Swal.fire('Categoria eliminada', `Categoria ${categoria.descripcion} eliminada correctamente`, 'success');
        }        
     );
    });
   }

   abriModal(categoria?: Categoria) {
     if (categoria) {
       this.categoriasSeleccionado = categoria;
       this.tipo = 'update';
     } else {
       this.tipo = 'new';
       this.categoriasSeleccionado = new Categoria();
     }
     this.modalCategoriaService.abrirModal();
   }
}
