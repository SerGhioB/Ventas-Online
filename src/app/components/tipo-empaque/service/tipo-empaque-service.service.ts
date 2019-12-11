import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoEmpaqueService {
  private API_URL = 'https://localhost:44397/api/v1';
  private token = '';
  constructor(private httpCliente: HttpClient) { }

  getData(url: string) {
    // const headers = new HttpHeaders({'Authorization' : `Bearer ${this.token}`});
    return this.httpCliente.get(`${this.API_URL}/${url}`/*, {headers}*/);
  }

  getTipoEmpaque() {
    return this.getData('tipoempaque');
  }

}
