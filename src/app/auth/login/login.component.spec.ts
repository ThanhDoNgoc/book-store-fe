import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../shared/services/auth.services';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  const user = {
    username: 'test',
    email: 'test@test',
    role: 'admin',
    permission: ['Book_Watch', 'Book_Modify', 'User_Watch'],
    token: '123',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: (email: string) => {
              if (email === 'test@email')
                of({ status: 401, message: 'invalid user' });
              else of(user);
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form registerForm be empty', () => {
    expect(component.loginForm.value).toEqual({
      email: '',
      password: '',
    });
  });

  it('should validate onSubmit', () => {
    component.loginForm.controls['email'].setValue('');
    component.onSubmit();
    expect(component.loginForm.controls['email'].invalid).toBeTruthy;
  });

  it('should onSubmit call register when form is valid', () => {
    spyOn(component.user, 'emit');

    const loginSpy = spyOn(authService, 'login').and.returnValue(of(user));

    component.loginForm.controls['email'].setValue('test@email');
    component.loginForm.controls['password'].setValue('test');

    component.onSubmit();
    expect(loginSpy).toHaveBeenCalledWith('test@email', 'test');
    expect(component.user.emit).toHaveBeenCalled();
  });

  it('should set errorMessage on 401 Unauthorized error', () => {
    const error = { status: 401 };
    spyOn(authService, 'login').and.returnValue(throwError(error));

    component.loginForm.controls['email'].setValue('test@test.com');
    component.loginForm.controls['password'].setValue('test');

    component.onSubmit();

    expect(component.errorMessage).toEqual('Invalid email or password.');
  });
});
