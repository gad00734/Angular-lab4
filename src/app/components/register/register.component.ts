import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

export function noSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const hasSpaces = (control.value || '').indexOf(' ') >= 0;
    return hasSpaces ? { 'noSpaces': { value: control.value } } : null;
  };
}

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null; // Don't validate if controls don't exist
    }

    if (password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    } else {
      return null;
    }
  };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow-sm">
            <div class="card-body">
              <h1 class="card-title text-center mb-4">Register</h1>
              <form [formGroup]="registerForm" (ngSubmit)="onRegister()">
                <div class="mb-3">
                  <label for="name" class="form-label">Name</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="name" 
                    formControlName="name"
                    placeholder="Enter your name"
                  >
                  <div *ngIf="registerForm.get('name')?.invalid && (registerForm.get('name')?.dirty || registerForm.get('name')?.touched)" class="text-danger">
                    <div *ngIf="registerForm.get('name')?.errors?.['required']">
                      Name is required.
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email address</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    formControlName="email"
                    placeholder="Enter your email"
                  >
                  <div *ngIf="registerForm.get('email')?.invalid && (registerForm.get('email')?.dirty || registerForm.get('email')?.touched)" class="text-danger">
                    <div *ngIf="registerForm.get('email')?.errors?.['required']">
                      Email is required.
                    </div>
                    <div *ngIf="registerForm.get('email')?.errors?.['email']">
                      Please enter a valid email address.
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="username" 
                    formControlName="username"
                    placeholder="Enter your username"
                  >
                  <div *ngIf="registerForm.get('username')?.invalid && (registerForm.get('username')?.dirty || registerForm.get('username')?.touched)" class="text-danger">
                    <div *ngIf="registerForm.get('username')?.errors?.['required']">
                      Username is required.
                    </div>
                    <div *ngIf="registerForm.get('username')?.errors?.['noSpaces']">
                      Username cannot contain spaces.
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="password" 
                    formControlName="password"
                    placeholder="Enter your password"
                  >
                  <div *ngIf="registerForm.get('password')?.invalid && (registerForm.get('password')?.dirty || registerForm.get('password')?.touched)" class="text-danger">
                    <div *ngIf="registerForm.get('password')?.errors?.['required']">
                      Password is required.
                    </div>
                    <div *ngIf="registerForm.get('password')?.errors?.['pattern']">
                      Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Confirm Password</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="confirmPassword" 
                    formControlName="confirmPassword"
                    placeholder="Confirm your password"
                  >
                  <div *ngIf="registerForm.get('confirmPassword')?.invalid && (registerForm.get('confirmPassword')?.dirty || registerForm.get('confirmPassword')?.touched)" class="text-danger">
                    <div *ngIf="registerForm.get('confirmPassword')?.errors?.['required']">
                      Confirm Password is required.
                    </div>
                  </div>
                  <div *ngIf="registerForm.errors?.['passwordMismatch'] && (registerForm.get('confirmPassword')?.dirty || registerForm.get('confirmPassword')?.touched)" class="text-danger">
                    Passwords do not match.
                  </div>
                </div>

                <div class="mt-4">
                  <h3>Addresses</h3>
                  <button type="button" class="btn btn-success mb-3" (click)="addAddress()">Add Address</button>

                  <div formArrayName="addresses">
                    <div *ngFor="let addressGroup of addresses.controls; let i = index" [formGroupName]="i" class="card p-3 mb-3 shadow-sm">
                      <h4>Address {{ i + 1 }}</h4>
                      <div class="mb-3">
                        <label for="address-{{i}}" class="form-label">Address</label>
                        <input type="text" class="form-control" id="address-{{i}}" formControlName="address" placeholder="Enter address">
                        <div *ngIf="addressGroup.get('address')?.invalid && (addressGroup.get('address')?.dirty || addressGroup.get('address')?.touched)" class="text-danger">
                          Address is required.
                        </div>
                      </div>
                      <div class="mb-3">
                        <label for="street-{{i}}" class="form-label">Street</label>
                        <input type="text" class="form-control" id="street-{{i}}" formControlName="street" placeholder="Enter street">
                        <div *ngIf="addressGroup.get('street')?.invalid && (addressGroup.get('street')?.dirty || addressGroup.get('street')?.touched)" class="text-danger">
                          Street is required.
                        </div>
                      </div>
                      <div class="mb-3">
                        <label for="country-{{i}}" class="form-label">Country</label>
                        <input type="text" class="form-control" id="country-{{i}}" formControlName="country" placeholder="Enter country">
                        <div *ngIf="addressGroup.get('country')?.invalid && (addressGroup.get('country')?.dirty || addressGroup.get('country')?.touched)" class="text-danger">
                          Country is required.
                        </div>
                      </div>
                      <div class="mb-3">
                        <label for="city-{{i}}" class="form-label">City</label>
                        <input type="text" class="form-control" id="city-{{i}}" formControlName="city" placeholder="Enter city">
                        <div *ngIf="addressGroup.get('city')?.invalid && (addressGroup.get('city')?.dirty || addressGroup.get('city')?.touched)" class="text-danger">
                          City is required.
                        </div>
                      </div>
                      <button type="button" class="btn btn-danger" (click)="removeAddress(i)">Delete Address</button>
                    </div>
                  </div>
                </div>

                <div class="d-grid mt-4">
                  <button type="submit" class="btn btn-primary" [disabled]="registerForm.invalid">Register</button>
                </div>
              </form>
              <div class="text-center mt-3">
                <p>Already have an account? <a routerLink="/login">Login</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './register.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, noSpacesValidator()]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword: ['', Validators.required],
      addresses: this.fb.array([])
    }, { validators: passwordMatchValidator() });
  }

  get addresses() {
    return this.registerForm.get('addresses') as FormArray;
  }

  newAddress(): FormGroup {
    return this.fb.group({
      address: ['', Validators.required],
      street: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  addAddress() {
    this.addresses.push(this.newAddress());
  }

  removeAddress(i: number) {
    this.addresses.removeAt(i);
  }

  onRegister() {
    if (this.registerForm.valid) {
      console.log('Registration successful:', this.registerForm.value);
      // Implement your registration logic here
    } else {
      console.log('Registration failed: Form is invalid');
      this.markAllAsTouched(this.registerForm);
    }
  }

  markAllAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markAllAsTouched(control);
      }
    });
  }
} 