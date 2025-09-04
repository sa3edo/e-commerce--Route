import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategotiesSlider } from './categoties-slider';

describe('CategotiesSlider', () => {
  let component: CategotiesSlider;
  let fixture: ComponentFixture<CategotiesSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategotiesSlider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategotiesSlider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
