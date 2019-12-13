import { TestBed } from '@angular/core/testing';

import { ModalInventarioService } from './modal-inventario.service';

describe('ModalInventarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalInventarioService = TestBed.get(ModalInventarioService);
    expect(service).toBeTruthy();
  });
});
