import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SweetAlert } from './sweet-alert';

describe('SweetAlert', () => {
  let component: SweetAlert;
  let fixture: ComponentFixture<SweetAlert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SweetAlert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SweetAlert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
