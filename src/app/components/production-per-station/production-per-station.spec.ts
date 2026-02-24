import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionPerStation } from './production-per-station';

describe('ProductionPerStation', () => {
  let component: ProductionPerStation;
  let fixture: ComponentFixture<ProductionPerStation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionPerStation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionPerStation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
