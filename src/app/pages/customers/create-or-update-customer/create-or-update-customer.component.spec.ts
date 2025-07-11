import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateCustomerComponent } from './create-or-update-customer.component';

describe('CreateOrUpdateCustomerComponent', () => {
  let component: CreateOrUpdateCustomerComponent;
  let fixture: ComponentFixture<CreateOrUpdateCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrUpdateCustomerComponent]
    });
    fixture = TestBed.createComponent(CreateOrUpdateCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
