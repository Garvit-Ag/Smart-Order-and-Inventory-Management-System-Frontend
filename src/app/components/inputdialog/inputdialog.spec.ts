import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inputdialog } from './inputdialog';

describe('Inputdialog', () => {
  let component: Inputdialog;
  let fixture: ComponentFixture<Inputdialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inputdialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Inputdialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
