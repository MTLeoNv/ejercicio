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
  title = 'ejercicio';

  // Propiedades
  producto = {
    nombre: '',
    cantidad: 0,
    precio: 0,
  };
  listaProductos: { nombre: string; cantidad: number; precio: number }[] = [];
  modoEdicion = false;
  indiceEdicion: number | null = null;

  // Métodos
  agregarProducto() {
    if (this.producto.nombre && this.producto.cantidad > 0 && this.producto.precio > 0) {
      this.listaProductos.push({ ...this.producto });
      this.limpiarFormulario();
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }

  editarProducto(index: number) {
    this.modoEdicion = true;
    this.indiceEdicion = index;
    this.producto = { ...this.listaProductos[index] };
  }

  actualizarProducto() {
    if (this.indiceEdicion !== null) {
      this.listaProductos[this.indiceEdicion] = { ...this.producto };
      this.limpiarFormulario();
      this.modoEdicion = false;
    }
  }

  eliminarProducto(index: number) {
    this.listaProductos.splice(index, 1);
  }

  calcularTotal() {
    return this.listaProductos.reduce((total, item) => total + item.cantidad * item.precio, 0);
  }

  limpiarFormulario() {
    this.producto = { nombre: '', cantidad: 0, precio: 0 };
    this.indiceEdicion = null;
  }
}
