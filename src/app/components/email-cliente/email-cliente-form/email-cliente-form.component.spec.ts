import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailClienteFormComponent } from './email-cliente-form.component';

describe('EmailClienteFormComponent', () => {
  let component: EmailClienteFormComponent;
  let fixture: ComponentFixture<EmailClienteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailClienteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailClienteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
