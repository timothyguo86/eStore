// Third party import
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
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
      firstName: [''],
      lastName: [''],
      address: [''],
      city: [''],
      state: [''],
      pin: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
    });
  }

  onSubmit() {}
}
