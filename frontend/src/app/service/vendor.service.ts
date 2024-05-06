import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private baseUrl = 'http://localhost:3000'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  getVendors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/vendors`);
  }
}
