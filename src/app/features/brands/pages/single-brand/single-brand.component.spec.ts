import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBrandComponent } from './single-brand.component';

describe('SingleBrandComponent', () => {
  let component: SingleBrandComponent;
  let fixture: ComponentFixture<SingleBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleBrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
