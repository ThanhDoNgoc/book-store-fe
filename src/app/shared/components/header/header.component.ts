import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName: string | undefined = undefined;
  userPermissions: string[] = [];

  constructor(private storageService: StorageService) {
    this.storageService.getName().subscribe((name) => {
      this.userName = name;
    });

    this.storageService.getPermissionList().subscribe((permissions) => {
      this.userPermissions = permissions || [];
    });
  }

  ngOnInit(): void {
    this.userName = this.storageService.getProperty('name') || undefined;
    this.userPermissions = this.storageService.getPermission() || [];
  }

  logout() {
    this.storageService.clearCookie();
  }
}
