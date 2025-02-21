import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tittle = 'todo-app';
  welcome = 'Bienvenido a mi primera aplicación en Angular';
  tasks = [
    'Instalar el Angular CLI',
    'Crear un nuevo proyecto',
    'Crear los componentes',
    'Crear los servicios',
  ]
}
