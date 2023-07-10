import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public oidcSecurityService: OidcSecurityService) {}

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe((result) => {
      // any
    });
  }

  getToken() {
    return this.oidcSecurityService.getAccessToken().subscribe((token) => {
      return token;
    });
  }
}
