import { TestBed } from '@angular/core/testing';

import { PpsrTable } from './ppsr-table';

describe('PpsrTable', () => {
  let service: PpsrTable;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PpsrTable);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
