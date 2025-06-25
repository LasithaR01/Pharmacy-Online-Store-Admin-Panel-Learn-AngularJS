import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateOrderComponent } from './create-or-update-order.component';

describe('CreateOrUpdateOrderComponent', () => {
  let component: CreateOrUpdateOrderComponent;
  let fixture: ComponentFixture<CreateOrUpdateOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrUpdateOrderComponent]
    });
    fixture = TestBed.createComponent(CreateOrUpdateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
