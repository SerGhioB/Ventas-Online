import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalCategoriasServiceService {
  modal: boolean = false;
  private _notificarCambio = new EventEmitter<any>();
  
  constructor() { }

  abrirModal() {
    this.modal = true;
  }
  
  cerrarModal() {
    this.modal = false;
  }

  get notificarCambio(): EventEmitter<any> {
    return this._notificarCambio;
  }
}
