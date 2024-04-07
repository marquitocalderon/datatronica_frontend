import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClienteComponent } from './cliente/cliente.component';
import { LoginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    // canActivate: [LoginGuard],
    title: 'Login',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dasboard.routes').then(
        (ruta) => ruta.DASHBOARD_RUTAS
      ),
  },
  {
    path: 'casos-equipos',
    component: ClienteComponent,
  },
];
