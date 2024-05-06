import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TenderService } from '../service/tender.service';

@Component({
  selector: 'app-create-tender',
  templateUrl: './create-tender.component.html',
  styleUrls: ['./create-tender.component.css']
})
export class CreateTenderComponent implements OnInit {
  tenderForm!: FormGroup; // Add definite assignment assertion

  constructor(
    private fb: FormBuilder,
    private tenderService: TenderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tenderForm = this.fb.group({
      tenderName: ['', Validators.required],
      tenderType: ['', Validators.required],
      bidSubmissionDeadline: ['', Validators.required],
      contractSignDeadline: ['', Validators.required],
      estimatedCost: ['', Validators.required],
      tenderDetails: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.tenderForm.valid) {
      this.tenderService.createTender(this.tenderForm.value).subscribe(
        () => {
          console.log('Tender created successfully');
           this.tenderForm.reset(); 
         // this.router.navigate(['/success']); // Redirect to success page
        },
        (error) => {
          console.error('Failed to create tender:', error);
          // Handle error, e.g., display error message
        }
      );
    }
  }
}
