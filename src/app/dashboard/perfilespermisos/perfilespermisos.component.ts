import { Component } from '@angular/core';
import { PostComponentPerfiles } from './post/post.component';
import { PutComponentPerfiles } from './put/put.component';
import { ServiceService } from '../../core/service/service.service';

@Component({
  selector: 'app-perfilespermisos',
  standalone: true,
  imports: [PostComponentPerfiles, PutComponentPerfiles],
  templateUrl: './perfilespermisos.component.html',
  styleUrl: './perfilespermisos.component.css'
})
export class PerfilespermisosComponent {

  constructor(private dataService: ServiceService) {}
  arregloget: any[] = []
  
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
      }
    });
  }

}
