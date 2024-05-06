import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TenderService } from '../service/tender.service';

@Component({
  selector: 'app-view-all-tender-us',
  templateUrl: './view-all-tender-us.component.html',
  styleUrl: './view-all-tender-us.component.css'
})
export class ViewAllTenderUsComponent implements OnInit {

  tenderDetails: any[] = [];

  constructor(private tenderService: TenderService, private router: Router) { }
  
  ngOnInit(): void {
    this.getTenderDetails();
  }

  convertToDate(timestamp: number): Date {
    return new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
  }

  getTenderDetails(): void {
    this.tenderService.getAllTenderDetails()
      .subscribe((data: any[]) => {
        this.tenderDetails = data;
      });
  }

  bidNow(tenderId: string): void {
    this.router.navigate(['TenderTime', 'bid-tender', tenderId]);
  }
}
