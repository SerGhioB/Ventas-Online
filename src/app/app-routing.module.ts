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
import { AuthguardGuard } from './components/guards/authguard.guard';
import { ProductoFormComponent } from './components/producto/producto-form/producto-form.component';



const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthguardGuard]},
  {path: 'categorias', component: CategoriasComponent, canActivate: [AuthguardGuard]},
  {path: 'categorias/page/:page', component: CategoriasComponent, canActivate: [AuthguardGuard]},
  {path: 'tipoempaques', component: TipoEmpaqueComponent, canActivate: [AuthguardGuard]},
  {path: 'categorias', component: CategoriasComponent, canActivate: [AuthguardGuard]},
  {path: 'inventarios', component: InventarioComponent, canActivate: [AuthguardGuard]},
  {path: 'productos', component: ProductoComponent, canActivate: [AuthguardGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'clientes', component: ClienteComponent, canActivate: [AuthguardGuard] },
  {path: 'emailclientes', component: EmailClienteComponent, canActivate: [AuthguardGuard]},
  {path: 'telefonoclientes', component: TelefonoClienteComponent, canActivate: [AuthguardGuard]},
  {path: 'productoForm', component: ProductoFormComponent, canActivate: [AuthguardGuard]},
/*  {path: 'producto/form/id'}*/
  {path: '**', pathMatch: 'full', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
