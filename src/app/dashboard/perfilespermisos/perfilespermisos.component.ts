import { Component } from '@angular/core';
import { PostComponentPerfiles } from './post/post.component';
import { PutComponentPerfiles } from './put/put.component';
import { ServiceService } from '../../core/service/service.service';
import { LoandingComponent } from '../components/loanding/loanding.component';

@Component({
  selector: 'app-perfilespermisos',
  standalone: true,
  imports: [PostComponentPerfiles, PutComponentPerfiles,LoandingComponent],
  templateUrl: './perfilespermisos.component.html',
  styleUrl: './perfilespermisos.component.css',
})
export class PerfilespermisosComponent {
  constructor(private dataService: ServiceService) {}
  arregloget: any[] = [];
  id_perfil: number = 0;
  modulosasignados: any[] = [];

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const url = import.meta.env.NG_APP_API + '/accesos';
    this.dataService.getApi(url).subscribe({
      next: (data) => {
        this.arregloget = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  enviarmodal(id_perfil: number, modulosasignados: any) {
    this.id_perfil = id_perfil;
    this.modulosasignados = modulosasignados;
    this.estadomodal = !this.estadomodal;
  }

  estadomodal: boolean = false;
  abremodal(show: boolean) {
    this.estadomodal = !this.estadomodal;
  }
}
