import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../shared/services/auth.services';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;

  const user = {
    username: 'test',
    email: 'test@test',
    role: 'admin',
    permission: ['Book_Watch', 'Book_Modify', 'User_Watch'],
    token: '123'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: AuthService,
          useValue: { register: () => of(user) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize registerForm with empty values', () => {
    expect(component.registerForm.value).toEqual({
      name: '',
      username: '',
      email: '',
      password: '',
      rePassword: '',
    });
  });

  it('should validate onSubmit', () => {
    component.registerForm.controls['name'].setValue('');
    component.onSubmit();
    expect(component.registerForm.controls['name'].invalid).toBeTruthy();
  });

  it('should sign up user and emit', () => {
    spyOn(component.user, 'emit');

    const registerSpy = spyOn(authService, 'register').and.returnValue(of(user));

    component.registerForm.controls['name'].setValue('test');
    component.registerForm.controls['username'].setValue('test');
    component.registerForm.controls['email'].setValue('test@test');
    component.registerForm.controls['password'].setValue('test');
    component.registerForm.controls['rePassword'].setValue('test');

    component.onSubmit();

    expect(registerSpy).toHaveBeenCalledWith({
      name: 'test',
      username: 'test',
      email: 'test@test',
      password: 'test'
    });
    expect(component.user.emit).toHaveBeenCalledWith(user);
  });
});