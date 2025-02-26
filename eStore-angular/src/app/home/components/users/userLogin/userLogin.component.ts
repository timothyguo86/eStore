// Third party imports
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'user-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './userLogin.component.html',
  styleUrl: './userLogin.component.scss',
})
export class UserLoginComponent implements OnInit {
  userLoginForm: FormGroup = new FormGroup({});

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('email');
  }

  get password(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('password');
  }

  onSubmit(): void {
    console.log();
  }
}
