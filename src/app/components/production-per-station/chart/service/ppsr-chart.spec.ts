import { TestBed } from '@angular/core/testing';

import { PpsrChart } from './ppsr-chart';

describe('PpsrChart', () => {
  let service: PpsrChart;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PpsrChart);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
