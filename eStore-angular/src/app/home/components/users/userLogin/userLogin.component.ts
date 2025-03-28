// Third party imports
import { Location, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
// Local import
import { LoginToken } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'user-login',
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './userLogin.component.html',
  styleUrl: './userLogin.component.scss',
})
export class UserLoginComponent implements OnInit {
  userLoginForm: FormGroup = new FormGroup({});
  alertType: number = 0; // 0-success, 1-warning, 2-error
  alertMessage: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly location: Location,
  ) {}

  get email(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('email');
  }

  get password(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('password');
  }

  ngOnInit(): void {
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.userService.login(this.email?.value, this.password?.value).subscribe({
      next: (response: LoginToken) => {
        response.user.email = this.email?.value;
        this.userService.activateToken(response);
        this.alertType = 0;
        this.alertMessage = 'Login successful!';

        // Redirect to the previous page after successfully login after 1 second
        setTimeout(() => {
          this.location.back();
        }, 1000);
      },
      error: (error) => {
        this.alertType = 2;
        this.alertMessage = error.error.message;
      },
    });
  }
}
