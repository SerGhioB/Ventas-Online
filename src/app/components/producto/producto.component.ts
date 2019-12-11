import { Component, OnInit } from '@angular/core';
import { ProductoService } from './service/producto-service.service';
import { ModalProductoService } from './modal-producto.service';
import { Producto } from './producto';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos: any[];
  productosSeleccionado: Producto;
  tipo: string;
  paginador: any;

  constructor(
    private productoService: ProductoService, 
    private modalProductoService: ModalProductoService,
    private activatedRoute: ActivatedRoute) {
    this.productoService.getProductos().subscribe((data: any) => {
      this.productos = data;
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = + params.get('page');
      if (!page) {
        page = 0;
      }
      this.productoService.getProductoPage(page)
        .subscribe((response: any) => {
          this.productos = response.content as Producto[];
          this.paginador = response;
        });
    });
    this.modalProductoService.notificarCambio.subscribe( producto => {
      if (this.tipo === 'new') {
        this.productos.push(producto);
      } else if (this.tipo === 'update') {
        this.productos = this.productos.map(productoOriginal => {
          if (producto.codigoProducto === productoOriginal.codigoProducto) {
            productoOriginal = producto;
          }
          return productoOriginal;
        });
      }
    });
  }

  delete(producto: Producto): void {
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
      this.productoService.delete(producto.codigoProducto).subscribe(
        () => {
          this.productos = this.productos.filter(prod => prod !== producto);
          Swal.fire('Producto eliminado', `Producto ${producto.descripcion} eliminado correctamente`, 'success');
        }
      );
    });
  }

  abrirModal(producto?: Producto) {
    if (producto) {
      this.productosSeleccionado = producto;
      this.tipo = 'update';
    } else {
      this.tipo = 'new';
      this.productosSeleccionado = new Producto();
    }
    this.modalProductoService.abrirModal();
  }
}
