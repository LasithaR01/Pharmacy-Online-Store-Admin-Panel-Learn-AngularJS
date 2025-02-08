import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService, // To get the access token
    private router: Router // To redirect if token is missing or expired
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the access token from cookies
    const token = this.cookieService.get('accessToken');

    // If there's a token, add it to the request headers
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });
    } else {
      // If no token, force login by redirecting to login page
      this.router.navigate(['/auth/signin']);
    }

    // Continue the request and handle errors (e.g., expired token)
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          // Handle Unauthorized or Forbidden error
          console.error('Token expired or unauthorized:', error);
          this.router.navigate(['/auth/signin']);
        }
        return throwError(error); // Return the error to the caller
      })
    );
  }
}
