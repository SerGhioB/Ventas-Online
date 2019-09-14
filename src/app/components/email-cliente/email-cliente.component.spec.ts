import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailClienteComponent } from './email-cliente.component';

describe('EmailClienteComponent', () => {
  let component: EmailClienteComponent;
  let fixture: ComponentFixture<EmailClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
