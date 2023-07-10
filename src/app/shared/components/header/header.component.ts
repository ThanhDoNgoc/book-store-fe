import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  logout() {
    console.log(1)
    this.authService.logout();
  }

  login() {
    this.authService.login();
  }
}
