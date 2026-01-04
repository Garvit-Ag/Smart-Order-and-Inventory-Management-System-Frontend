import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalConfirmationComponent } from './global-confirmation';

describe('GlobalConfirmation', () => {
  let component: GlobalConfirmationComponent;
  let fixture: ComponentFixture<GlobalConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalConfirmationComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
