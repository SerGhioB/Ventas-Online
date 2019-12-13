import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelefonoClienteFormComponent } from './telefono-cliente-form.component';

describe('TelefonoClienteFormComponent', () => {
  let component: TelefonoClienteFormComponent;
  let fixture: ComponentFixture<TelefonoClienteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelefonoClienteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelefonoClienteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
