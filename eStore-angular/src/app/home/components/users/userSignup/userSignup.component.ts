// Third party import
import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// Local import
import { User } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/user.service';
import { matchPasswordsValidator } from './validators/matchPasswords.validator';

@Component({
  selector: 'user-signup',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './userSignup.component.html',
  styleUrl: './userSignup.component.scss',
})
export class UserSignupComponent implements OnInit {
  userSignupForm: FormGroup = new FormGroup({});
  alertMessage: string = '';
  alertType: number = 0; // 0-success, 1-warning, 2-error

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userSignupForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: [''],
        address: [''],
        city: [''],
        state: [''],
        pin: [''],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      // Form group level validation
      {
        validators: matchPasswordsValidator(),
      },
    );
  }

  get firstName(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('firstName');
  }

  get email(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('email');
  }

  get password(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('password');
  }

  get confirmPassword(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('confirmPassword');
  }

  onSubmit(): void {
    const user: User = this.userSignupForm.value;

    this.userService.createUser(user).subscribe({
      next: (result) => {
        if (result.message === 'success') {
          this.alertMessage = 'User created successfully';
          this.alertType = 0;
        } else if (result.message === 'Email already exists') {
          this.alertMessage = 'User creation failed';
          this.alertType = 1;
        }
      },
      error: (error) => {
        this.alertMessage = error.message;
        this.alertType = 2;
      },
    });
  }
}
