import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {
  form: FormGroup = new FormGroup({
    buscador: new FormControl(''),
  });

  datos: string = "";

  enviarDatos(e:any) {
    // Accede al valor del control 'buscador' directamente desde el formulario reactivo
    const searchData = this.form.get('buscador')?.value;
    this.datos = searchData;
    console.log('Datos enviados:', this.datos);
     }
}
