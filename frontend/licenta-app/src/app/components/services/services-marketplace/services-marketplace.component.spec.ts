import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesMarketplaceComponent } from './services-marketplace.component';

describe('ServicesMarketplaceComponent', () => {
  let component: ServicesMarketplaceComponent;
  let fixture: ComponentFixture<ServicesMarketplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesMarketplaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesMarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
