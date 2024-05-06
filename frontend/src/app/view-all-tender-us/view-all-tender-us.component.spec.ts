import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllTenderUsComponent } from './view-all-tender-us.component';

describe('ViewAllTenderUsComponent', () => {
  let component: ViewAllTenderUsComponent;
  let fixture: ComponentFixture<ViewAllTenderUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAllTenderUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAllTenderUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
