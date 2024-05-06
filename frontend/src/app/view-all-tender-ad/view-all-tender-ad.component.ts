import { Component, OnInit } from '@angular/core';
import { TenderService } from '../service/tender.service';

@Component({
  selector: 'app-view-all-tender-ad',
  templateUrl: './view-all-tender-ad.component.html',
  styleUrl: './view-all-tender-ad.component.css'
})
export class ViewAllTenderAdComponent implements OnInit {

  tenderDetails: any[] = [];


  constructor(private tenderService: TenderService) { }
  
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
}
