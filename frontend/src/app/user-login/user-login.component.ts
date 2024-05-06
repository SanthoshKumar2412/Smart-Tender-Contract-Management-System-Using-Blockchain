import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
declare let window: any; // Declare 'window' to avoid TypeScript errors

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'] // Use 'styleUrls' instead of 'styleUrl'
})
export class UserLoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        // Request access to MetaMask
        window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts: string[]) => {
          const account = accounts[0]; // Use the first account
          this.authService.login(email, password, account).subscribe(
            (role: string) => {
              console.log('Role:', role); // Log the role received from the server
              if (role === 'admin') {
                console.log(role);
                console.log('Navigating to admin page...');
                this.router.navigate(['/admin']);
              } else if (role === 'user') {
                console.log('Navigating to user page...');
                this.router.navigate(['/TenderTime']);
              }
            },
            error => {
              console.error('Login failed:', error);
              // Handle error (e.g., display error message)
            }
          );
        }).catch((error: any) => {
          console.error('Failed to connect MetaMask:', error);
          // Handle error (e.g., display error message)
        });
      } else {
        console.error('MetaMask not installed');
        // Handle error (e.g., display error message)
      }
    }
  }
}
