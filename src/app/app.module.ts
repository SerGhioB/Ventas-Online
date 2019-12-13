import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { TipoEmpaqueComponent } from './components/tipo-empaque/tipo-empaque.component';
import { MenuComponent } from './components/menu/menu.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InventarioComponent } from './components/inventario/inventario.component';
import { ProductoComponent } from './components/producto/producto.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms'; // majeno de los formularios
import { ClienteComponent } from './components/cliente/cliente.component';
import { EmailClienteComponent } from './components/email-cliente/email-cliente.component';
import { TelefonoClienteComponent } from './components/telefono-cliente/telefono-cliente.component';
import { TokenInterceptor } from './components/login/interceptors/token.interceptor';
import { AuthInterceptor } from './components/login/interceptors/auth.Interceptors';
import { ProductoFormComponent } from './components/producto/producto-form/producto-form.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { CategoriasFormComponent } from './components/categorias/categorias-form/categorias-form.component';
import { ClienteFormComponent } from './components/cliente/cliente-form/cliente-form.component';
import { EmailClienteFormComponent } from './components/email-cliente/email-cliente-form/email-cliente-form.component';
import { InventarioFormComponent } from './components/inventario/inventario-form/inventario-form.component';
import { TelefonoClienteFormComponent } from './components/telefono-cliente/telefono-cliente-form/telefono-cliente-form.component';
import { TipoEmpaqueFormComponent } from './components/tipo-empaque/tipo-empaque-form/tipo-empaque-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    CategoriasComponent,
    TipoEmpaqueComponent,
    MenuComponent,
    CategoriasComponent,
    InventarioComponent,
    ProductoComponent,
    LoginComponent,
    ClienteComponent,
    EmailClienteComponent,
    TelefonoClienteComponent,
    ProductoFormComponent,
    PaginatorComponent,
    CategoriasFormComponent,
    ClienteFormComponent,
    EmailClienteFormComponent,
    InventarioFormComponent,
    TelefonoClienteFormComponent,
    TipoEmpaqueFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
