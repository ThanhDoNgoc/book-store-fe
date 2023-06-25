import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../shared/services/auth.services';
import User from '../../shared/models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() user: EventEmitter<User> = new EventEmitter();

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .login(
          this.loginForm.controls['email'].value,
          this.loginForm.controls['password'].value
        )
        .subscribe((user) => {
          this.user.emit(user);
        });
    }
  }
}
