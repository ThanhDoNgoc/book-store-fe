import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private nameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private permissionsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private cookieService: CookieService) {
    const nameFromCookie = this.getProperty('name');
    const permissionsFromCookie = this.getPermission();

    this.nameSubject.next(nameFromCookie);
    this.permissionsSubject.next(permissionsFromCookie);
  }

  getName(): Observable<string> {
    return this.nameSubject.asObservable();
  }

  getPermissionList(): Observable<string[]> {
    return this.permissionsSubject.asObservable();
  }

  getProperty(key: string): string {
    return this.cookieService.get(key) || '';
  }

  getPermission(): string[] {
    return this.cookieService.get('permissions') ? JSON.parse(this.cookieService.get('permissions')) : [];
  }

  saveCookie(token: string, name: string, role: string, permissions: string[]) {
    this.cookieService.set('token', token);
    this.cookieService.set('name', name);
    this.cookieService.set('role', role);
    this.cookieService.set('permissions', JSON.stringify(permissions));

    this.nameSubject.next(name);
    this.permissionsSubject.next(permissions);
  }

  clearCookie() {
    this.cookieService.delete('token');
    this.cookieService.delete('name');
    this.cookieService.delete('role');
    this.cookieService.delete('permissions');

    this.nameSubject.next('');
    this.permissionsSubject.next([]);
  }
}
