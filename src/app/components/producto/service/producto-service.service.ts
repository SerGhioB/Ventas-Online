import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Producto } from '../producto';
import { Categoria } from '../../categorias/categoria';
import { TipoEmpaque } from '../../tipo-empaque/tipo-empaque';
import { catchError, map } from 'rxjs/operators';
import { ProductoCreacionDTO } from '../producto-creacion-dto';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private API_URL = 'https://localhost:44397/api/v1';
  private token = '';
  constructor(private httpClient: HttpClient, private router: Router) { }

  /*
  getData(url: string) {
    const headers = new HttpHeaders({'Authorization' : `Bearer ${this.token}`});
    return this.httpCliente.get(`${this.API_URL}/${url}`, {headers});
  }
  */

  /*
  getProducto() {
    return this.getData('producto');
  }
  */
 getProductos(): Observable<Producto[]> {
   return this.httpClient.get<Producto[]>(`${this.API_URL}/producto`);
 }

 getProductoPage(page?: number): Observable<any>{
   return this.httpClient.get(`${this.API_URL}/producto/page/${page}`);
 }

  getCategorias(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(`${this.API_URL}/categoria`);
  }

  getTipoEmpaques(): Observable<TipoEmpaque[]> {
    return this.httpClient.get<TipoEmpaque[]>(`${this.API_URL}/tipoempaque`);
  }

  create(producto: ProductoCreacionDTO): Observable<Producto> {
    return this.httpClient.post(`${this.API_URL}/producto`, producto)
    .pipe(
      map((response: any) => response as Producto),
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Producto> {
    return this.httpClient.delete<Producto>(`${this.API_URL}/producto/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  update(id: number, producto: ProductoCreacionDTO): Observable<any> {
    return this.httpClient.put<any>
    (`${this.API_URL}/producto/${id}`, producto)
    .pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  getProducto(id: number): Observable<Producto>{
    return this.httpClient.get<Producto>(`${this.API_URL}/producto/${id}`)
    .pipe(
      catchError(e => {
        if (e.status !== 401) {
          this.router.navigate(['/producto']);
        }
        return throwError(e);
      })
    );
  }

}
