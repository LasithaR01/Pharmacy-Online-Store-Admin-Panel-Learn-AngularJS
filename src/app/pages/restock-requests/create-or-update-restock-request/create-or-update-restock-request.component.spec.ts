import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateRestockRequestComponent } from './create-or-update-restock-request.component';

describe('CreateOrUpdateRestockRequestComponent', () => {
  let component: CreateOrUpdateRestockRequestComponent;
  let fixture: ComponentFixture<CreateOrUpdateRestockRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrUpdateRestockRequestComponent]
    });
    fixture = TestBed.createComponent(CreateOrUpdateRestockRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
