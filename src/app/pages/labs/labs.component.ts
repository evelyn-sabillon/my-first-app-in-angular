import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {signal} from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  //variables publicas po defecto
  welcome = 'Bienvenido a mi primera aplicación en Angular';
  tasks = signal([
    'Instalar el Angular CLI',
    'Crear un nuevo proyecto',
    'Crear los componentes',
    'Crear los servicios',
  ]);

  name = signal('Evelyn');
  //private age = 23;
  age = 23;
  disabled = true;
  img = 'https://www.w3schools.com/howto/img_avatar.png';

  person = signal({
    name: 'E',
    age: 23,
    avatar: 'https://www.w3schools.com/howto/img_avatar.png',
  });

  colorCtrl = new FormControl();
  
  widthCtrl = new FormControl( 50, {
    nonNullable: true,
  });

  nameCtrl = new FormControl( 50, {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(4),

    ]
  });

  constructor() {
    this.colorCtrl.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }


  clickHandler() {
    alert('Hola mundo');
  }

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  changeAge(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update((prevState) => {
      return { 
        ...prevState, 
        age: parseInt(newValue,10), 
      };
    }); 
  }

  changeName(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update((prevState) => {
      return { 
        ...prevState, 
        name: newValue, 
      };
    }); 
  }



}
