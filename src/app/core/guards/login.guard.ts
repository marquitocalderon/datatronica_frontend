import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import AuthService from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const payload = this.authService.decodeToken();
    if (this.authService.tieneToken() && payload && payload.role) {
      if (payload.role === 'ADMIN' || payload.role === 'USUARIO') {
        this.router.navigateByUrl('/dashboard');
        return false;
      }
    }
    return true;
  }
}
