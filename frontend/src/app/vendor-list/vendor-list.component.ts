import { Component, OnInit } from '@angular/core';
  import { VendorService } from '../service/vendor.service'

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrl: './vendor-list.component.css'
})
export class VendorListComponent implements OnInit {
 
    vendors: any[] = [];
  
    constructor(private vendorService: VendorService) {}
  
    ngOnInit(): void {
      this.getVendors();
    }
  
    getVendors(): void {
      this.vendorService.getVendors().subscribe(
        (data: any[]) => {
          this.vendors = data;
        },
        (error) => {
          console.error('Error fetching vendors:', error);
        }
      );
    }
  }
  

