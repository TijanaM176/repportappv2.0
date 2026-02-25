import { TestBed } from '@angular/core/testing';

import { PprsService } from './pprs-service';

describe('PprsService', () => {
  let service: PprsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PprsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
