import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName: string = '';
  userPermissions: string[] = [];

  destroy$ = new Subject();

  constructor(private storageService: StorageService, private authService: AuthService) {
    this.storageService
      .getName()
      .pipe(takeUntil(this.destroy$))
      .subscribe((name) => {
        this.userName = name;
      });

    this.storageService
      .getPermissionList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((permissions) => {
        this.userPermissions = permissions || [];
      });
  }

  ngOnInit(): void {
    this.userName = this.storageService.getProperty('name');
    this.userPermissions = this.storageService.getPermission();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  logout() {
    this.storageService.clearCookie();
  }

  login() {
    this.authService.login();
  }
}
