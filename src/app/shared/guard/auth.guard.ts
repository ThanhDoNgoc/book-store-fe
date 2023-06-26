import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
} from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const permissionParam = route.data['permission'];

    const permissions = this.storageService.getPermission();

    if (permissions && permissions.includes(permissionParam)) {
      return true;
    } else {
      this.router.navigate(['/']); 
      return false;
    }
  }
}
