import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Usuario } from './service/usuario';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: Usuario;
  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
  }

  login(): void {
    this.authService.login(this.usuario).subscribe(
      response => {
        this.authService.saveToken(response.token);
        this.authService.saveUser(response.token);
        swal.fire('Login', 'Bienvenido', 'success');
        this.router.navigate(['/home']);
      }, error => {
        console.log(error);
      }
    );
  }
}
