import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  registerUser(user: any, vendorId: string) {
    return this.http.post<any>('http://localhost:3000/register', { ...user, vendorId });
  }
}
