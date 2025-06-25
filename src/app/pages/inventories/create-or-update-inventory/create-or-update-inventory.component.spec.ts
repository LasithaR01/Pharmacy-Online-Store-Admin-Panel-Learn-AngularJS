import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateInventoryComponent } from './create-or-update-inventory.component';

describe('CreateOrUpdateInventoryComponent', () => {
  let component: CreateOrUpdateInventoryComponent;
  let fixture: ComponentFixture<CreateOrUpdateInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrUpdateInventoryComponent]
    });
    fixture = TestBed.createComponent(CreateOrUpdateInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
