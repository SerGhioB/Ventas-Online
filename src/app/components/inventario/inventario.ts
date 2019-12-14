import { Producto } from '../producto/producto';

export class Inventario {
    codigoInventario: number;
    codigoProducto: number;
    producto: Producto;
    fecha: string; 
    tipoRegistro: string;
    precio: number;
    entradas: number;
    salidas: number;
    codigoEmpaque: number;       
}
