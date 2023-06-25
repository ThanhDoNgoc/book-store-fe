import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import User from '../../shared/models/auth.model';
import { AuthService } from '../../shared/services/auth.services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() user: EventEmitter<User> = new EventEmitter();

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    rePassword: new FormControl('', Validators.required),
  });
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (
      this.registerForm.controls['password'].value !==
      this.registerForm.controls['rePassword'].value
    ) {
      return;
    }

    this.authService
      .register({
        name: this.registerForm.controls['name'].value,
        username: this.registerForm.controls['username'].value,
        email: this.registerForm.controls['email'].value,
        password: this.registerForm.controls['password'].value,
      })
      .subscribe((user) => {
        this.user.emit(user)
      });
  }
}
