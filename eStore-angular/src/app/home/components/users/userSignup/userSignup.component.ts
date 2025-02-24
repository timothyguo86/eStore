// Third party import
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
// Local import

@Component({
  selector: 'user-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './userSignup.component.html',
  styleUrl: './userSignup.component.scss',
})
export class UserSignupComponent implements OnInit {
  userSignupForm: FormGroup = new FormGroup({});

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.userSignupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      address: [''],
      city: [''],
      state: [''],
      pin: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
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

  onSubmit() {}
}
