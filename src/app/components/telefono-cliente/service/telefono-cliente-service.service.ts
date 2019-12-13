import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TipoEmpaqueService } from '../../tipo-empaque/service/tipo-empaque-service.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TelefonoClienteService {
  private API_URL = 'https://localhost:44397/api/v1';
  private token = '';

  constructor(private httpClient: HttpClient, private router: Router) { }
/*
  getData(url: string) {
    // const headers = new HttpHeaders({'Authorization' : `Bearer ${this.token}`});
    return this.httpCliente.get<TipoEmpaqueService[]>(`${this.API_URL}/${url}`, {headers});
  }
*/

  getTelefonoClientes(): Observable<TelefonoCliente[]> {
    return this.httpClient.get<TelefonoCliente[]
  }
}
