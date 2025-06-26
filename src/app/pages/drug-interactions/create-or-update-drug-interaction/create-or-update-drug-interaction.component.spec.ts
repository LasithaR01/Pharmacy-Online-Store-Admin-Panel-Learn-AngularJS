import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateDrugInteractionComponent } from './create-or-update-drug-interaction.component';

describe('CreateOrUpdateDrugInteractionComponent', () => {
  let component: CreateOrUpdateDrugInteractionComponent;
  let fixture: ComponentFixture<CreateOrUpdateDrugInteractionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrUpdateDrugInteractionComponent]
    });
    fixture = TestBed.createComponent(CreateOrUpdateDrugInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
