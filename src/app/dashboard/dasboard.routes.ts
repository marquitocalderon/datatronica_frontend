import { Routes } from '@angular/router';
import { PerfilespermisosComponent } from './perfilespermisos/perfilespermisos.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './dashboard.component';
import { guardGuard } from '../core/guards/guard.guard';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CasosComponent } from './casos/casos.component';

export const DASHBOARD_RUTAS: Routes = [
    {
        path: '',
        canActivate: [guardGuard],
        data: { permisoRol: ['ADMIN', 'USUARIO', 'SOPORTE', 'ASISTENTE'] },
        component: LayoutComponent,
        children: [
            { path: '', component: DashboardComponent, },
            {
                path: 'perfiles', component: PerfilespermisosComponent, canActivate: [guardGuard],
                data: { permisoRol: ['ADMIN'] },
            },
            {
                path: 'usuarios', component: UsuariosComponent, canActivate: [guardGuard],
                data: { permisoRol: ['ADMIN'] },
            },
            {
                path: 'casos', component: CasosComponent, canActivate: [guardGuard],
                data: { permisoRol: ['ADMIN'] },
            }
        ],
        title: 'Admin'
    },
]