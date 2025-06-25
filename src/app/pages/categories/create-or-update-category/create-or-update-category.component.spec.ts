import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateComponent } from './create-or-update-category.component';

describe('CreateOrUpdateComponent', () => {
  let component: CreateOrUpdateComponent;
  let fixture: ComponentFixture<CreateOrUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrUpdateComponent]
    });
    fixture = TestBed.createComponent(CreateOrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
