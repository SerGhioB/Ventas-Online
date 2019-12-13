import { TestBed } from '@angular/core/testing';

import { ModalEmailClienteService } from './modal-email-cliente.service';

describe('ModalEmailClienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalEmailClienteService = TestBed.get(ModalEmailClienteService);
    expect(service).toBeTruthy();
  });
});
