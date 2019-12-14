import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Producto } from '../../producto/producto';
import { InventarioCreacionDTO } from '../inventario-creacion-dto';
import { Inventario } from '../inventario';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private API_URL = 'https://localhost:44397/api/v1';
  private token = '';

  constructor(private httpClient: HttpClient, private router: Router) { }

  /*
  getData(url: string) {
    const headers = new HttpHeaders({'Authorization' : `Bearer ${this.token}`});
    return this.httpCliente.get(`${this.API_URL}/${url}`, {headers});
  }
*/

  getInventarios(): Observable<Inventario[]> {
    return this.httpClient.get<Inventario[]>(`${this.API_URL}/inventario`);
  }

  getInventarioPage(page?: number): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/inventario/page/${page}`);
  }

  getProductos(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(`${this.API_URL}/producto`);
  }

  create(inventario: InventarioCreacionDTO): Observable<Inventario> {
    return this.httpClient.post(`${this.API_URL}/inventario`, inventario)
    .pipe(
      map((response: any) => response as Inventario),
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Inventario> {
    return this.httpClient.delete<Inventario>(`${this.API_URL}/inventario/${id}`)
    .pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  update(id: number, inventario: InventarioCreacionDTO): Observable<any> {
    return this.httpClient.put<any>
    (`${this.API_URL}/inventario/${id}`, inventario)
    .pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  getInventario(id: number): Observable<Inventario> {
    return this.httpClient.get<Inventario>(`${this.API_URL}/inventario/${id}`)
    .pipe(
      catchError(e => {
        if (e.status !== 401) {
          this.router.navigate(['/inventario']);
        }
        return throwError(e);
      })
    );
  }
}
