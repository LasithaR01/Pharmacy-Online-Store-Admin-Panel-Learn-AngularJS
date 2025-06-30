import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateSupplierComponent } from './create-or-update-supplier.component';

describe('CreateOrUpdateSupplierComponent', () => {
  let component: CreateOrUpdateSupplierComponent;
  let fixture: ComponentFixture<CreateOrUpdateSupplierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrUpdateSupplierComponent]
    });
    fixture = TestBed.createComponent(CreateOrUpdateSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
