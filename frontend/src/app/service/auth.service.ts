// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
declare let window: any;
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient) {

  }

  login(email: string, password: string, account: string) {
    return this.http.post<any>('http://localhost:3000/login', { email, password, account }).pipe(
      map(response => {
        if (response && response.role) {
          const role = response.role; // Extract the role from the response
          this.loggedIn.next(true);
          return role; // Return the role
        }
        throw new Error('Role not found in response');
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError('Login failed');
      })
    );
  }

  logout() {
    // Perform any necessary cleanup (e.g., clear tokens)
    this.loggedIn.next(false);
    
    // Disconnect MetaMask
    if (typeof window.ethereum !== 'undefined') {
      (window as any).ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] }).then(() => {
        console.log('MetaMask disconnected');
      }).catch((error: any) => {
        console.error('Failed to disconnect MetaMask:', error);
      });
    }
  }
  
  
}
