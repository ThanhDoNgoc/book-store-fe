import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AuthService } from '../../shared/services/auth.services';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  const user = {
    username: 'test',
    email: 'test@test',
    role: 'admin',
    permission: ['Book_Watch', 'Book_Modify', 'User_Watch'],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [
        {
          provide: AuthService,
          useValue: { register: ()=> of(user) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form registerForm be empty', () => {
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
    expect(component.registerForm.controls['name'].invalid).toBeTruthy;
  });

  it('should onSubmit call register when form is valid', ()=>{
    spyOn(component.user, 'emit');
    
    component.registerForm.controls['name'].setValue('test');
    component.registerForm.controls['username'].setValue('test');
    component.registerForm.controls['email'].setValue('test@test');
    component.registerForm.controls['password'].setValue('test');
    component.registerForm.controls['rePassword'].setValue('test');
    
    component.onSubmit()
    expect(component.user.emit).toHaveBeenCalledWith(user);
  })
});
