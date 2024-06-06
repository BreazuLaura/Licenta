import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidPopupComponent } from './bid-popup.component';

describe('BidPopupComponent', () => {
  let component: BidPopupComponent;
  let fixture: ComponentFixture<BidPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BidPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
