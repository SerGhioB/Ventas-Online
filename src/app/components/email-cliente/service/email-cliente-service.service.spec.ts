import { TestBed } from '@angular/core/testing';

import { EmailClienteServiceService } from './email-cliente-service.service';

describe('EmailClienteServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailClienteServiceService = TestBed.get(EmailClienteServiceService);
    expect(service).toBeTruthy();
  });
});
