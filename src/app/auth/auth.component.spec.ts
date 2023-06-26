import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import { StorageService } from '../shared/services/storage.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import Auth from '../shared/models/auth.model';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let storageService: StorageService;
  let router: Router;

  const user: Auth = {
    username: 'test',
    email: 'test@test',
    role: 'admin',
    permission: ['Book_Watch', 'Book_Modify', 'User_Watch'],
    token: '123',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    storageService = TestBed.inject(StorageService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save cookie and navigate back', () => {
    const saveCookieSpy = spyOn(storageService, 'saveCookie');
    const navigateSpy = spyOn(router, 'navigate');

    component.onLogin(user);

    expect(saveCookieSpy).toHaveBeenCalledWith(
      user.token,
      user.username,
      user.role,
      user.permission
    );
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
