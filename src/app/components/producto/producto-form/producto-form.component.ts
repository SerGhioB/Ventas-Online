import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../producto';
import { Categoria } from '../../categorias/categoria';
import { TipoEmpaque } from '../../tipo-empaque/tipo-empaque';
import { CategoriaService } from '../../categorias/service/categoria-service.service';
import { TipoEmpaqueService } from '../../tipo-empaque/service/tipo-empaque-service.service';
import { ProductoService } from '../service/producto-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ModalProductoService } from '../modal-producto.service';
import { ProductoCreacionDTO } from '../producto-creacion-dto';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {
  titulo: string;
  @Input() producto: Producto;
  // @Input() producto: ProductoCreacionDTO;
  categorias: Categoria[] = [];
  tipoEmpaques: TipoEmpaque[] = [];
  productoDTO: ProductoCreacionDTO = new ProductoCreacionDTO();

  constructor(
    private categoriaService: CategoriaService,
    private tipoEmpaqueService: TipoEmpaqueService,
    public modalProductoService: ModalProductoService,
    private router: Router,
    private productoService: ProductoService) { }

  ngOnInit() {
    this.categoriaService.getCategoria().subscribe((response: any) => this.categorias = response as Categoria[]);
    this.tipoEmpaqueService.getTipoEmpaque().subscribe((response: any) => this.tipoEmpaques = response as TipoEmpaque[]);
  }

  create(): void {
    const nuevo = new ProductoCreacionDTO();
    nuevo.codigoCategoria = this.producto.categoria.codigoCategoria;
    nuevo.codigoEmpaque = this.producto.tipoEmpaque.codigoEmpaque;
    nuevo.descripcion = this.producto.descripcion;
    this.productoService.create(nuevo).subscribe(
      producto => {
      Swal.fire ('Nuevo producto',
      `El producto ${producto.descripcion} ha sido creado con exito!!`,
      'success');
      producto.categoria = this.producto.categoria;
      producto.tipoEmpaque = this.producto.tipoEmpaque;
      this.modalProductoService.notificarCambio.emit(producto);
      this.modalProductoService.cerrarModal();
      this.router.navigateByUrl('/producto');
      },
      error => {
        Swal.fire('nuevo producto', `Error code ${error.status}`, 'error');
      }
    );

  }
  update(): void {
    const nuevo = new ProductoCreacionDTO();
    nuevo.codigoCategoria = this.producto.codigoCategoria;
    nuevo.codigoEmpaque = this.producto.codigoEmpaque;
    nuevo.descripcion = this.producto.descripcion;
    this.productoService.update(this.producto.codigoProducto, nuevo).subscribe(
      () => {
        Swal.fire('Actualizar Producto', `El producto ${nuevo.descripcion} ha sido actualizado!!`,
        'success'),
        this.modalProductoService.notificarCambio.emit(this.producto);
        this.modalProductoService.cerrarModal();
        this.router.navigate(['/producto']);
      }
    );
  }

  cerrarModal(): void {
    this.modalProductoService.cerrarModal();
  }

  compararCategoria(o1: Categoria, o2: Categoria): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ?
    false : o1.codigoCategoria === o2.codigoCategoria;
  }

  compararTipoEmpaque(o1: TipoEmpaque, o2: TipoEmpaque): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ?
    false : o1.codigoEmpaque === o2.codigoEmpaque;
  }
}
