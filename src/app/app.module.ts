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
    TelefonoClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
