import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateOrderItemComponent } from './create-or-update-order-item.component';

describe('CreateOrUpdateOrderItemComponent', () => {
  let component: CreateOrUpdateOrderItemComponent;
  let fixture: ComponentFixture<CreateOrUpdateOrderItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrUpdateOrderItemComponent]
    });
    fixture = TestBed.createComponent(CreateOrUpdateOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
