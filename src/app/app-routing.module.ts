import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { TipoEmpaqueComponent } from './components/tipo-empaque/tipo-empaque.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { ProductoComponent } from './components/producto/producto.component';
import { LoginComponent } from './components/login/login.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { EmailClienteComponent} from './components/email-cliente/email-cliente.component';
import { TelefonoClienteComponent } from './components/telefono-cliente/telefono-cliente.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'categorias', component: CategoriasComponent},
  {path: 'tipoempaques', component: TipoEmpaqueComponent},
  {path: 'inventarios', component: InventarioComponent},
  {path: 'productos', component: ProductoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'clientes', component: ClienteComponent},
  {path: 'emailclientes', component: EmailClienteComponent},
  {path: 'telefonoclientes', component: TelefonoClienteComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
