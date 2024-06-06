import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopAuctionModalComponent } from './stop-auction-modal.component';

describe('StopAuctionModalComponent', () => {
  let component: StopAuctionModalComponent;
  let fixture: ComponentFixture<StopAuctionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopAuctionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopAuctionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
