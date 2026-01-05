import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalPopupComponent } from './global-popup';

describe('GlobalPopup', () => {
  let component: GlobalPopupComponent;
  let fixture: ComponentFixture<GlobalPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalPopupComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
