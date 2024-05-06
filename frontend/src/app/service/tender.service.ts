import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TenderService {
  private baseUrl = 'http://localhost:3000'; // Backend API base URL
 
  constructor(private http: HttpClient) {}

  createTender(formData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create-tender`, formData).pipe(
      catchError((error) => {
        console.error('Failed to create tender:', error);
        return throwError('Something went wrong, please try again later.');
      })
    );
  }

  getAllTenderDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tender-details`);
  }
  getTenderDetails(tenderId: string) {
    return this.http.get(`${this.baseUrl}/bid-tender/${tenderId}`);
  }
  
  submitBid(tenderId: string, bidAmount: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit-bid/${tenderId}`, { amount: bidAmount});
  }
  
  
}
