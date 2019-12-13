import { TestBed } from '@angular/core/testing';

import { ModalTelefonoClienteService } from './modal-telefono-cliente.service';

describe('ModalTelefonoClienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalTelefonoClienteService = TestBed.get(ModalTelefonoClienteService);
    expect(service).toBeTruthy();
  });
});
