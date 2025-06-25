import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateNotificationComponent } from './create-or-update-notification.component';

describe('CreateOrUpdateNotificationComponent', () => {
  let component: CreateOrUpdateNotificationComponent;
  let fixture: ComponentFixture<CreateOrUpdateNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrUpdateNotificationComponent]
    });
    fixture = TestBed.createComponent(CreateOrUpdateNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
