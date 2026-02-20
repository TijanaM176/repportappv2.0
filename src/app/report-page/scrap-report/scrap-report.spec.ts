import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapReport } from './scrap-report';

describe('ScrapReport', () => {
  let component: ScrapReport;
  let fixture: ComponentFixture<ScrapReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrapReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrapReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
