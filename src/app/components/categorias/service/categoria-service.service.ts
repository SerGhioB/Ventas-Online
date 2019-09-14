import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  // private API_URL = 'http://192.168.31.145.:9200/api/v1'; // copiar mi ULR del API
  // private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NjY2NzM4MzAsInVzZXJfbmFtZSI6ImV0dW1heCIsImp0aSI6ImRkY2IzMTYwLTAzZWMtNDJmMy04OTA0LTE4NTU1ZDAxYjczNCIsImNsaWVudF9pZCI6ImFsbWFjZW4iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.Z-YvUQ1Wp7ahxNdRHJBp-pfNgMEK0pCoJmTF5ns-m6k';
  private API_URL = 'https://localhost:44397/api/v1';
  private token = '';
  constructor(private httpCliente: HttpClient) { }

  getData(url: string) {
    const headers = new HttpHeaders({'Authorization' : `Bearer ${this.token}`});
    return this.httpCliente.get(`${this.API_URL}/${url}`, {headers});
  }

  getCategoria() {
    return this.getData('categoria');
  }
}
