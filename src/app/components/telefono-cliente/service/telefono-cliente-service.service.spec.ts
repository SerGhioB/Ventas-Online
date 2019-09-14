import { TestBed } from '@angular/core/testing';

import { TelefonoClienteServiceService } from './telefono-cliente-service.service';

describe('TelefonoClienteServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TelefonoClienteServiceService = TestBed.get(TelefonoClienteServiceService);
    expect(service).toBeTruthy();
  });
});
