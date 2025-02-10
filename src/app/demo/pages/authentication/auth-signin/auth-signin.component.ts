import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/core/auth.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export default class AuthSigninComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
  ) {
    // Initialize form with default values
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['']
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (response && response.accessToken) {
            this.cookieService.set('accessToken', response.accessToken, {
              expires: 1,
              secure: true,
              sameSite: 'Lax'
            });
            this.router.navigate(['/dashboard']);
          }
        }
      });
    }
  }
}
