import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ServiceService } from '../../../core/service/service.service';
import AuthService from '../../../core/auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-put',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './put.component.html',
  styleUrl: './put.component.css'
})
export class PutComponentPerfiles {
  constructor(private dataService: ServiceService) {}
  authService = inject(AuthService);
  
   isModalOpen = false;
 
   openModal() {
     this.isModalOpen = true;
   }
 
   closeModal() {
     this.isModalOpen = false;
   }

  @Input() idPerfil: number = 0;
  @Input() datos: any[] = [];

  form: FormGroup = new FormGroup({
    perfiles: new FormControl(''),
    moduloselegidos: new FormControl(''),
  });



  ngOnInit() {
    initFlowbite();
    // Iterar sobre los datos para establecer el estado inicial de los checkboxes
    this.datos.forEach(modulo => {
      modulo.checked = modulo.activo; // Establecer el estado inicial basado en la propiedad 'activo'
    });
  }

  toggleCheckbox(modulo: any) {
    // Invertir el estado del módulo
    modulo.checked = !modulo.checked;
  }

  loading : boolean = false;
  enviarDatos(e:any) {
    const datosEnviar = {
      permisosmodulos: this.datos.map(modulo => ({
        id_perfil: this.idPerfil,
        id_modulo: modulo.id_modulo,
        activo: modulo.checked,
      }))
    };
  
    const url = import.meta.env.NG_APP_API + '/accesos';

    this.dataService.putApi(url, datosEnviar).subscribe({
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
  
  //-------------------------------------------------------------------------------------

  @Output() addshowModalEvent = new EventEmitter<boolean>();

  //creamos un metodo para output
  showmodalclose(show: boolean) {
    this.addshowModalEvent.emit(show);
  }

  //-------------------------------------------------------------------------------------
}
