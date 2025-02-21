import { Component, computed, effect, inject, Injector, signal } from '@angular/core';

import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

import { Task } from './../../models/task.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([]);

    filter = signal<'all' | 'pending' | 'completed'>('all');

    //computed calcula nuevos valores a partir de las señales que se pasan como argumento
    tasksByFilter = computed(() => {
      const filter = this.filter();
      const tasks = this.tasks();
      if (filter === 'pending') {
        return tasks.filter((task) => !task.completed);
      } 
      if (filter === 'completed') {
        return tasks.filter((task) => task.completed);
      } 
      return tasks;
    });

    newTaskCtrl = new FormControl('',{
      nonNullable: true,
      validators: [
        Validators.required,
        //Validators.pattern()
      ],
    });

    injector = inject(Injector);


    ngOnInit() {
      const storage = localStorage.getItem('tasks');
      if (storage) {
        const tasks = JSON.parse(storage);
        this.tasks.set(tasks);
      }
      this.trackTasks();
    }

    //effect vigila los cambios de las señales que se pasan como argumento y ejecuta la función cada vez que cambian
    trackTasks() {
      effect(() => {
        const tasks = this.tasks();
        console.log(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }, { injector: this.injector });
    }


    changeHandler() {
      if (this.newTaskCtrl.valid) {
        const value = this.newTaskCtrl.value.trim();
        if(value !== '') {
          this.addTask(value);
          this.newTaskCtrl.setValue('');
        }
      }
    }

    addTask(title: string) {
      const newTask: Task = {
        id: Date.now(),
        title,
        completed: false,
      };
      this.tasks.update((tasks) => [...tasks, newTask]);
    }

    deleteTask(index: number) {
      this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
    }

    updateTask(index: number) {
      this.tasks.update( prevState => {
        return prevState.map((task, position) => {
          if (position === index) {
            return {
              ...task,
              completed: !task.completed,
            };
          }
          return task;
        });
      });
    }

    updateTaskEditingMode(index: number) {
      this.tasks.update( prevState => {
        return prevState.map((task, position) => {
          if (position === index) {
            return {
              ...task,
              editing: true,
            };
          }
          return {
            ...task,
            editing: false,
          };
        });
      });
    }

    updateTaskText(index: number, event: Event) {
      const input = event.target as HTMLInputElement;
      this.tasks.update( prevState => {
        return prevState.map((task, position) => {
          if (position === index) {
            return {
              ...task,
              title: input.value,
              editing: false,
            };
          }
          return task;
        });
      });
    }

    changeFilter(filter: 'all' | 'pending' | 'completed') {
      this.filter.set(filter);
    }

}
