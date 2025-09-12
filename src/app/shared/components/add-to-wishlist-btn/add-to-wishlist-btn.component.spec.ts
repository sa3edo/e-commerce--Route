import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToWishlistBtnComponent } from './add-to-wishlist-btn.component';

describe('AddToWishlistBtnComponent', () => {
  let component: AddToWishlistBtnComponent;
  let fixture: ComponentFixture<AddToWishlistBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToWishlistBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToWishlistBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
