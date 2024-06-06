import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionsMarketplaceComponent } from './auctions-marketplace.component';

describe('AuctionsMarketplaceComponent', () => {
  let component: AuctionsMarketplaceComponent;
  let fixture: ComponentFixture<AuctionsMarketplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionsMarketplaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionsMarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
