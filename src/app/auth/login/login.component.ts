import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.services';
import User from '../../shared/models/auth.model';
import { Subject, Subscription, catchError, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit,  OnDestroy {
  @Output() user: EventEmitter<User> = new EventEmitter();

  errorMessage?: string;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  destroy$ = new Subject()

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.errorMessage = ''; 
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null)
    this.destroy$.complete()
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .login(
          this.loginForm.controls['email'].value,
          this.loginForm.controls['password'].value
        )
        .pipe(
          catchError((error) => {
            if (error.status === 401) {
              this.errorMessage = 'Invalid email or password.';
            }
            return [];
          })
        )
        .subscribe((user) => {
          console.log(user);
          this.user.emit(user);
        });
    }
  }
}
