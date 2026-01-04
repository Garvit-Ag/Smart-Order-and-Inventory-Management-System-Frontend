import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalPopup } from './global-popup';

describe('GlobalPopup', () => {
  let component: GlobalPopup;
  let fixture: ComponentFixture<GlobalPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
