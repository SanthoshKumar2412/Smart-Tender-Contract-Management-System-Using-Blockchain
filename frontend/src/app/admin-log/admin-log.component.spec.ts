import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLogComponent } from './admin-log.component';

describe('AdminLogComponent', () => {
  let component: AdminLogComponent;
  let fixture: ComponentFixture<AdminLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminLogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
