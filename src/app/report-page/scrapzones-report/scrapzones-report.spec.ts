import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapzonesReport } from './scrapzones-report';

describe('ScrapzonesReport', () => {
  let component: ScrapzonesReport;
  let fixture: ComponentFixture<ScrapzonesReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrapzonesReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrapzonesReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
