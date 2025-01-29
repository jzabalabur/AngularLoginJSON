import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';  // Importa HttpClient
import { Observable } from 'rxjs';  // Para manejar la respuesta asíncrona

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  usuarios: any[] = [];  // Aquí almacenaremos los usuarios del JSON
  correo = '';
  contrasena = '';

  constructor(private router: Router, private http: HttpClient) {
    // Cargar los usuarios desde el archivo JSON cuando se inicialice el componente
    this.cargarUsuarios();
  }

  // Método para cargar los usuarios desde el archivo JSON
  cargarUsuarios() {
    this.http.get<any[]>('assets/usuarios.json').subscribe((data) => {
      this.usuarios = data;
    }, error => {
      console.error('Error cargando usuarios:', error);
    });
  }
  // Método para realizar el login
  iniciarSesion() {
    const usuarioValido = this.usuarios.find(usuario =>
      usuario.correo === this.correo && usuario.contrasena === this.contrasena
    );

    if (usuarioValido) {
      this.router.navigate(['/inicio']);  // Redirige a la página de inicio si las credenciales son correctas
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
