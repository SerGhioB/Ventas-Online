import { Component, OnInit } from '@angular/core';
import { ProductoService } from './service/producto-service.service';
import { ModalProductoService } from './modal-producto.service';
import { Producto } from './producto';
import swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos: any[];
  productosSeleccionado: Producto;
  tipo: string;

  constructor(private productoService: ProductoService, private modalProductoService: ModalProductoService) {
    this.productoService.getProductos().subscribe((data: any) => {
      this.productos = data;
    });
  }

  ngOnInit() {
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

  abrirModal(producto: Producto) {
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
