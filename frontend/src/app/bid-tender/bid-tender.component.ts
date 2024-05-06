import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TenderService } from '../service/tender.service';
@Component({
  selector: 'app-bid-tender',
  templateUrl: './bid-tender.component.html',
  styleUrl: './bid-tender.component.css'
})
export class BidTenderComponent implements OnInit {

  tenderId: string = '';

  tenderDetails: any = {};
  bidAmount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tenderService: TenderService
  ) { }

  ngOnInit(): void {
    this.tenderId = this.route.snapshot.paramMap.get('tenderId') || '';
    this.getTenderDetails();
  }
  

  getTenderDetails(): void {
    this.tenderService.getTenderDetails(this.tenderId)
      .subscribe((data: any) => {
        this.tenderDetails = data;
      });
  }
  convertToDate(timestamp: number): Date {
    return new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
  }
  submitBid(): void {
    
 // Get the current date in ISO format
    this.tenderService.submitBid(this.tenderId, this.bidAmount)
      .subscribe((response: any) => {
        // Handle the response
        console.log(response);
      });
  }
  

}
