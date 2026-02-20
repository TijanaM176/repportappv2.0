import { TestBed } from '@angular/core/testing';

import { ScrapReportService } from './scrap-report-service';

describe('ScrapReportService', () => {
  let service: ScrapReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrapReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
