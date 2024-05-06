import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTenderComponent } from './create-tender.component';

describe('CreateTenderComponent', () => {
  let component: CreateTenderComponent;
  let fixture: ComponentFixture<CreateTenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTenderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
