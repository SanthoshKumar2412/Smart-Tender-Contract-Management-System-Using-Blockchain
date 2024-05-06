import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegistrationService } from '../service/registration.service';
import { Router } from '@angular/router';
declare let window: any; 

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
  userRegisterForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private registrationService: RegistrationService,private router: Router) {
    this.userRegisterForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', Validators.required],
      dob: ['', Validators.required],
      companyName: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword:['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  } passwordMatchValidator(control: FormGroup): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword || password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }

  onSubmit() {
    if (this.userRegisterForm.valid) {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        // Request access to MetaMask
        window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts: string[]) => {
          const vendorId = accounts[0];
          this.registrationService.registerUser(this.userRegisterForm.value, vendorId)
            .subscribe(
              (response: any) => {
                console.log('Registration successful:', response);
                // Reset the form after successful registration
                this.userRegisterForm.reset();
                this.router.navigate(['/login']);
              },
              (error: any) => {
                console.error('Registration failed:', error);
                // Handle error (e.g., display error message)
              }
            );
        });
      } else {
        // Handle case where MetaMask is not installed
        console.error('MetaMask not installed');
      }
    } else {
      // Form is invalid, mark all fields as touched to display errors
      Object.values(this.userRegisterForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
