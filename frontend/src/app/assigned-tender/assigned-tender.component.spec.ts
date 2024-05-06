import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedTenderComponent } from './assigned-tender.component';

describe('AssignedTenderComponent', () => {
  let component: AssignedTenderComponent;
  let fixture: ComponentFixture<AssignedTenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignedTenderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignedTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
