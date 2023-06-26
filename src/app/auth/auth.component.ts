import { Component, OnInit } from '@angular/core';
import Auth from '../shared/models/auth.model';
import { StorageService } from '../shared/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  activeTab: string = 'login';

  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit(): void {}

  onLogin(user: Auth) {
    this.storageService.saveCookie(
      user.token,
      user.username,
      user.role,
      user.permission
    );
    
    this.router.navigate(['/'])
  }
}
