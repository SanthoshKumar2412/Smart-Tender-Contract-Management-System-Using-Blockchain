import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidTenderComponent } from './bid-tender.component';

describe('BidTenderComponent', () => {
  let component: BidTenderComponent;
  let fixture: ComponentFixture<BidTenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BidTenderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BidTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
