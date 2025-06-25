import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateStockComponent } from './create-or-update-stock.component';

describe('CreateOrUpdateStockComponent', () => {
  let component: CreateOrUpdateStockComponent;
  let fixture: ComponentFixture<CreateOrUpdateStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrUpdateStockComponent]
    });
    fixture = TestBed.createComponent(CreateOrUpdateStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
