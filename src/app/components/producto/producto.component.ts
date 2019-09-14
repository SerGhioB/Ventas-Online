import { Component, OnInit } from '@angular/core';
import { ProductoService } from './service/producto-service.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos: any[] = [];

  constructor(private productoService: ProductoService) {
    this.productoService.getProducto().subscribe((data: any) => {
      this.productos = data;
    });
  }

  ngOnInit() {
  }

}
