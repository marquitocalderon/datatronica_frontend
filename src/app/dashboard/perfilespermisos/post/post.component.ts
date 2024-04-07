import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ServiceService } from '../../../core/service/service.service';
import AuthService from '../../../core/auth/auth.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponentPerfiles {
  constructor(private dataService: ServiceService) {}
  authService = inject(AuthService);

  perfiles: any[] = [];

  modulos: any[] = [];

  getData(): void {
    const url = import.meta.env.NG_APP_API + '/perfiles';
    this.dataService.getApi(url).subscribe({
      next: (data) => {
        this.perfiles = data;
      },
      error: (atrapar) => {
        console.log(atrapar);
      },
    });
  }

  ngOnInit(): void {
    this.getData();
    this.getData2();
  }

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  form: FormGroup = new FormGroup({
    perfiles: new FormControl(''),
    moduloselegidos: new FormControl(''),
  });

  getData2(): void {
    const url = import.meta.env.NG_APP_API + '/modulos';
    this.dataService.getApi(url).subscribe({
      next: (data) => {
        this.modulos = data;
      },
      error: (atrapar) => {
        console.log(atrapar);
      },
    });
  }

  modulosSeleccionados: any[] = [];
  nombrePerfil: string = ''; // Agrega esta variable si no está declarada en tu clase
  id_perfil: string = ''; // Agrega esta variable si no está declarada en tu clase

  onChangePerfil(event: any) {
    const perfilSeleccionado = event.target.value;
    if (!perfilSeleccionado) {
      console.error('Perfil no válido');
      return;
    }

    const partes = perfilSeleccionado.split(':');

    if (partes.length === 2) {
      const nombre_perfil = partes[1].trim().toUpperCase();
      this.nombrePerfil = nombre_perfil;
      this.id_perfil = partes[0].trim();

      if (nombre_perfil === 'ADMIN') {
        this.modulosSeleccionados = this.modulos;
        console.log(this.modulosSeleccionados);
      } else if (nombre_perfil === 'SOPORTE') {
        this.modulosSeleccionados = this.modulos.filter(
          (modulo) => modulo.modulo === 'SOPORTE'
        );
        console.log(this.modulosSeleccionados);
      } else if (nombre_perfil === 'ASISTENTE') {
        this.modulosSeleccionados = this.modulos.filter(
          (modulo) => modulo.modulo === 'ASISTENTE'
        );
        console.log(this.modulosSeleccionados);
      } else {
        this.modulosSeleccionados = this.modulos.filter(
          (modulo) =>
            modulo.modulo === 'SOPORTE' || modulo.modulo === 'ASISTENTE'
        );
      }

      // Recorrer la lista de módulos y establecer su estado 'checked' a false
      this.modulos.forEach((modulo) => {
        modulo.checked = false;
      });
    } else {
      console.error('Formato de perfil no válido');
    }
  }

  toggleCheckbox(modulo: any) {
    // Invertir el estado del módulo
    modulo.checked = !modulo.checked;
  }


  
  loading: boolean = false

  // Función para enviar los datos del formulario
  enviarDatos(e: any) {
    const perfilSeleccionado = this.form.get('perfiles')?.value;
    if (perfilSeleccionado === null || perfilSeleccionado === '') {
      alert('Por favor, seleccione un perfil antes de enviar.');
      return; // Evita que el formulario se envíe si no se ha seleccionado un perfil
    }
    console.log(this.id_perfil, this.modulosSeleccionados);

    const datosEnviar = {
      permisosmodulos: this.modulosSeleccionados.map((dato: any) => ({
        id_perfil: Number(this.id_perfil),
        id_modulo: dato.id_modulo,
        activo: dato.checked,
      })),
    };

    console.log(datosEnviar)

    this.loading = true;

    const url = import.meta.env.NG_APP_API + '/accesos';

    this.dataService.postApi(url, datosEnviar).subscribe({
      next: (response) => {
        console.log(response);
        window.location.reload();
      },
      error: (error) => {
        console.error('Error:', error);
        alert(error.error.message);
        // Manejo de errores
      },
    });
  }
}
