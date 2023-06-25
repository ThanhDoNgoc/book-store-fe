import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

import { environment } from '../environments/environment';
import Auth from '../models/auth.model';
import Register from '../models/register.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string): Observable<Auth> {
    return this.httpClient.get<Auth>(environment.auth.login) 
  }

  register(register: Register): Observable<Auth> {
    return this.httpClient.get<Auth>(environment.auth.register)
  }
}
