import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import User from '../../shared/models/auth.model';
import { AuthService } from '../../shared/services/auth.services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  @Output() user: EventEmitter<User> = new EventEmitter();
  errorMessage: string = '';

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    rePassword: new FormControl('', Validators.required),
  });
  constructor(private authService: AuthService) {}

  destroy$ = new Subject();

  ngOnInit(): void {
    this.registerForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.errorMessage = '';
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  onSubmit() {
    if (
      this.registerForm.controls['password'].value !==
      this.registerForm.controls['rePassword'].value
    ) {
      this.errorMessage = 'password and repeat password must be the same';
      return;
    }
    if (!this.registerForm.invalid) {
      this.authService
        .register({
          name: this.registerForm.controls['name'].value,
          username: this.registerForm.controls['username'].value,
          email: this.registerForm.controls['email'].value,
          password: this.registerForm.controls['password'].value,
        })
        .subscribe((user) => {
          this.user.emit(user);
        });
    }
  }
}
