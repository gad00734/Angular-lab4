import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow-sm">
            <div class="card-body">
              <h1 class="card-title text-center mb-4">Login</h1>
              <form #loginForm="ngForm" (ngSubmit)="onLogin(loginForm)">
                <div class="mb-3">
                  <label for="email" class="form-label">Email address</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    name="email" 
                    placeholder="Enter your email"
                    [(ngModel)]="user.email"
                    required
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
                    #email="ngModel"
                  >
                  <div *ngIf="email.invalid && (email.dirty || email.touched)" class="text-danger">
                    <div *ngIf="email.errors?.['required']">
                      Email is required.
                    </div>
                    <div *ngIf="email.errors?.['pattern']">
                      Please enter a valid email address.
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="password" 
                    name="password"
                    placeholder="Enter your password"
                    [(ngModel)]="user.password"
                    required
                    #password="ngModel"
                  >
                  <div *ngIf="password.invalid && (password.dirty || password.touched)" class="text-danger">
                    <div *ngIf="password.errors?.['required']">
                      Password is required.
                    </div>
                  </div>
                </div>
                <div class="d-grid">
                  <button type="submit" class="btn btn-primary" [disabled]="loginForm.invalid">Login</button>
                </div>
              </form>
              <div class="text-center mt-3">
                <p>Don't have account? <a routerLink="/register">Register</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './login.css'
})
export class LoginComponent {
  user = { email: '', password: '' };

  onLogin(form: any) {
    if (form.valid) {
      console.log('Login successful:', this.user);
      // Implement your login logic here
    } else {
      console.log('Login failed: Form is invalid');
    }
  }
} 