import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateProductAlternativeComponent } from './create-or-update-product-alternative.component';

describe('CreateOrUpdateProductAlternativeComponent', () => {
  let component: CreateOrUpdateProductAlternativeComponent;
  let fixture: ComponentFixture<CreateOrUpdateProductAlternativeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrUpdateProductAlternativeComponent]
    });
    fixture = TestBed.createComponent(CreateOrUpdateProductAlternativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
