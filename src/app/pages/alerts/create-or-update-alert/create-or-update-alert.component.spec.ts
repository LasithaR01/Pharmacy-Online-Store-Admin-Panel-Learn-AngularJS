import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateAlertComponent } from './create-or-update-alert.component';

describe('CreateOrUpdateAlertComponent', () => {
  let component: CreateOrUpdateAlertComponent;
  let fixture: ComponentFixture<CreateOrUpdateAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrUpdateAlertComponent]
    });
    fixture = TestBed.createComponent(CreateOrUpdateAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
