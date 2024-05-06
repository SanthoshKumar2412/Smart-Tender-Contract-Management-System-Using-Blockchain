import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllTenderAdComponent } from './view-all-tender-ad.component';

describe('ViewAllTenderAdComponent', () => {
  let component: ViewAllTenderAdComponent;
  let fixture: ComponentFixture<ViewAllTenderAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAllTenderAdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAllTenderAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
