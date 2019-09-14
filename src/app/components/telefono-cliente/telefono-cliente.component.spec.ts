import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelefonoClienteComponent } from './telefono-cliente.component';

describe('TelefonoClienteComponent', () => {
  let component: TelefonoClienteComponent;
  let fixture: ComponentFixture<TelefonoClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelefonoClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelefonoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
