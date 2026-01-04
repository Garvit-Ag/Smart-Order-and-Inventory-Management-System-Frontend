import { TestBed } from '@angular/core/testing';

import { Inputdialog } from './inputdialog';

describe('Inputdialog', () => {
  let service: Inputdialog;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Inputdialog);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
