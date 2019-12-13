import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { TipoEmpaque } from '../tipo-empaque';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TipoEmpaqueService {
  private API_URL = 'https://localhost:44397/api/v1';
  private token = '';
  constructor(private httpClient: HttpClient, private router: Router) { }

  /*
  getData(url: string) {
    // const headers = new HttpHeaders({'Authorization' : `Bearer ${this.token}`});
    return this.httpCliente.get(`${this.API_URL}/${url}`, {headers});
  }
  */

  getTipoEmpaques(): Observable<TipoEmpaque[]> {
    return this.httpClient.get<TipoEmpaque[]>(`${this.API_URL}/tipoempaque`);
  }

  getTipoEmpaquePage(page?: number): Observable<any>{
    return this.httpClient.get(`${this.API_URL}/tipoempaque/page${page}`);
  }

  create(tipoEmpaque: TipoEmpaqueCreacionDTO): Observable<TipoEmpaque>{
    return this.httpClient.post(`${this.API_URL}/tipoempaque`, tipoEmpaque)
    .pipe(
      map((response: any) => response as TipoEmpaque),
      catchError (e => {
        if (e.status === 400) {
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  delete (id: number): Observable<TipoEmpaque> {
    return this.httpClient.delete<TipoEmpaque>(`${this.API_URL}/tipoempaque/${id}`)
    .pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  update(id: number, tipoEmpaque: TipoEmpaqueCreacionDTO): Observable<any> {
    return this.httpClient.put<any>
    (`${this.API_URL}/tipoempaque/${id}`,tipoEmpaque)
    .pipe (
      catchError( e=> {
        if (e.status === 400) {
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }
  
  getTipoEmpaque(id: number): Observable<TipoEmpaque[]> {
    return this.httpClient.get<TipoEmpaque>(`${this.API_URL}/tipoempaque/${id}`)
    .pipe(
      catchError (e => {
        if (e.status !== 401) {
          this.router.navigate(['/tipoempaque']);
        }
        return throwError(e);
      })
    );
  }

}
