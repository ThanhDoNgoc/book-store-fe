import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
import Auth from '../models/auth.model';
import Register from '../models/register.model';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import * as keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public oidcSecurityService: OidcSecurityService) {}

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }
}

export function getAuthConfig() {
  return {
    authority: 'http://localhost:8080/realms/myrealm',
    redirectUrl: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    clientId: 'bookstore-cuutui',
    scope: 'openid profile email offline_access',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
    //logLevel: LogLevel.Debug,
  };
}
