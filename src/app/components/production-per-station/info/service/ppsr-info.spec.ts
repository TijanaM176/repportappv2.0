import { TestBed } from '@angular/core/testing';

import { PpsrInfo } from './ppsr-info';

describe('PpsrInfo', () => {
  let service: PpsrInfo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PpsrInfo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
