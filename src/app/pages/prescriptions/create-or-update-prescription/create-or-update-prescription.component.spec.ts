import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdatePrescriptionComponent } from './create-or-update-prescription.component';

describe('CreateOrUpdatePrescriptionComponent', () => {
  let component: CreateOrUpdatePrescriptionComponent;
  let fixture: ComponentFixture<CreateOrUpdatePrescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrUpdatePrescriptionComponent]
    });
    fixture = TestBed.createComponent(CreateOrUpdatePrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
