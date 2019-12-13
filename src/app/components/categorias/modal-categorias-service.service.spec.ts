import { TestBed } from '@angular/core/testing';

import { ModalCategoriasServiceService } from './modal-categorias-service.service';

describe('ModalCategoriasServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalCategoriasServiceService = TestBed.get(ModalCategoriasServiceService);
    expect(service).toBeTruthy();
  });
});
