import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree } from '@angular/router';
import {
  OidcSecurityService,
  AuthenticatedResult,
} from 'angular-auth-oidc-client';
import { Observable, map, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.oidcSecurityService.isAuthenticated$.pipe(
      take(1),
      map(({ isAuthenticated }) => {
        if (isAuthenticated) {
          return true;
        }
        return this.router.parseUrl('/');
      })
    );
  }
}
