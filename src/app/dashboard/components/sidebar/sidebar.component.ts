import { Component, Input } from '@angular/core';
import { SeguridadComponent } from './seguridad/seguridad.component';
import { CasosComponent } from './casos/casos.component';
import { ServiceService } from '../../../core/service/service.service';
import AuthService from '../../../core/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SeguridadComponent, CasosComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private dataService: ServiceService,   private AuthService: AuthService) {}
  @Input() showSidebar = false;

  arregloget: any[] = []
  modulos: any[] = [];
  
  ngOnInit(): void {
      var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        this.showSidebar = false;
      } else {
        this.showSidebar = true;
      }
    this.getData()
  }

  


  getData(): void {
    const url = import.meta.env.NG_APP_API + '/accesos';
    this.dataService.getApi(url).subscribe({
      next: (data) => {
        this.arregloget = data;
        const decodedToken = this.AuthService.decodeToken();

        if (decodedToken && decodedToken.role) {
          this.modulos = this.filterModules(data, decodedToken.role);
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  filterModules(data: any[], role: string): any[] {
    const perfil = data.find(perfil => perfil.nombre_perfil === role);
    if (perfil) {
      return perfil.modulosasignados.filter((modulo: any) => modulo.activo === true);
    } else {
      return [];
    }
  }
}
