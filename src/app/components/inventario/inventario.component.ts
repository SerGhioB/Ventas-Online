import { Component, OnInit } from '@angular/core';
import { InventarioService } from './service/inventario-service.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  inventarios: any[] = [];

  constructor(private inventarioService: InventarioService) {
    this.inventarioService.getInventario().subscribe((data: any) => {
      this.inventarios = data;
    });
   }

  ngOnInit() {
  }

}
