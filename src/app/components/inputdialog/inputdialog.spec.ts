import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDialogComponent } from './inputdialog';

describe('Inputdialog', () => {
  let component: InputDialogComponent;
  let fixture: ComponentFixture<InputDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
