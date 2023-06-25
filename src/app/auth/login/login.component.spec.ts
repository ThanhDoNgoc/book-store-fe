import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../shared/services/auth.services';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const user = {
    username: 'test',
    email: 'test@test',
    role: 'admin',
    permission: ['Book_Watch', 'Book_Modify', 'User_Watch'],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        {
          provide: AuthService,
          useValue: { login: ()=> of(user) },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
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

  it('should onSubmit call register when form is valid', ()=>{
    spyOn(component.user, 'emit');
    
    component.loginForm.controls['email'].setValue('test@email');
    component.loginForm.controls['password'].setValue('test');
    
    component.onSubmit()
    expect(component.user.emit).toHaveBeenCalledWith(user);
  })
});
