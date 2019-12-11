import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _usuario: Usuario;
  private _token: string;

  constructor(private httpClient: HttpClient) {  }

public get token(): string {
  if (this._token != null) {
    return this._token;
  } else if (this._token == null && sessionStorage.getItem('token') != null) {
    this._token = sessionStorage.getItem('token');
    return this._token;
  }
  return null;
}

public get usuario(): Usuario {
  if (this._usuario != null) {
    return this._usuario;
  } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
    this._usuario = JSON.parse(sessionStorage.getItem('usuario'));
    return this._usuario;
  }
  return new Usuario();
}

  // solicitar la creacion del token
  login(usuario: Usuario): Observable<any> {
    const urlEndPoint = 'https://localhost:44397/api/v1/cuentas/login';
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(urlEndPoint, usuario, {headers: httpHeaders});
    console.log(httpHeaders);
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }

  isAuthenticated(): boolean {
    const payload = this.GetDataToken(this.token);
    if (payload != null && payload.unique_name && payload.unique_name.length > 0) {
      return true;
    }
    return false;
  }

  // almacenar el usuario de la sesion
  saveUser(token: string) {
    this._usuario = new Usuario();
    const payload = this.GetDataToken(token);
    this._usuario.email = payload.unique_name;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  // para almacenar el token de la sesion
  saveToken(token: string) {
    this._token = token;
    sessionStorage.setItem('token', token);
  }

  // el que obtiene el dato del token (compuesto por 3 estructuras)
  GetDataToken(token: string): any {
    if (token != null) {
      return JSON.parse(atob(token.split('.')[1]));
    }
    return null;
  }
}
