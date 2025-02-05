import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [FormsModule, CommonModule, RouterModule],
})
export class AppComponent {
  title = 'Gestor de Tareas';

  // Propiedades
  tarea = {
    descripcion: '',
    prioridad: 'Media',
    completada: false,
  };

  listaTareas: { descripcion: string; prioridad: string; completada: boolean }[] = [];
  modoEdicion = false;
  indiceEdicion: number | null = null;

  constructor() {
    this.cargarTareas(); // Cargar tareas almacenadas al iniciar
  }

  // Métodos
  agregarTarea() {
    if (this.tarea.descripcion.trim()) {
      this.listaTareas.push({ ...this.tarea });
      this.guardarTareas(); // Guardar en localStorage
      this.limpiarFormulario();
    } else {
      alert('Por favor, ingrese una descripción para la tarea.');
    }
  }

  editarTarea(index: number) {
    this.modoEdicion = true;
    this.indiceEdicion = index;
    this.tarea = { ...this.listaTareas[index] };
  }

  actualizarTarea() {
    if (this.indiceEdicion !== null) {
      this.listaTareas[this.indiceEdicion] = { ...this.tarea };
      this.guardarTareas(); // Guardar cambios en localStorage
      this.limpiarFormulario();
      this.modoEdicion = false;
    }
  }

  eliminarTarea(index: number) {
    this.listaTareas.splice(index, 1);
    this.guardarTareas(); // Guardar cambios en localStorage
  }

  eliminarTodasTareas() {
    if (this.listaTareas.length === 0) {
      alert('No hay tareas agregadas.');
      return;
    }

    const confirmacion = confirm('¿Estás seguro de que deseas eliminar todas las tareas?');
    if (confirmacion) {
      this.listaTareas = [];
      localStorage.removeItem('tareas');
    }
  }

  cambiarEstado(index: number) {
    this.listaTareas[index].completada = !this.listaTareas[index].completada;
    this.guardarTareas(); // Guardar cambios en localStorage
  }

  contarPendientes() {
    return this.listaTareas.filter((tarea) => !tarea.completada).length;
  }

  limpiarFormulario() {
    this.tarea = { descripcion: '', prioridad: 'Media', completada: false };
    this.indiceEdicion = null;
  }

  guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(this.listaTareas));
  }

  cargarTareas() {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
      this.listaTareas = JSON.parse(tareasGuardadas);
    }
  }
}
