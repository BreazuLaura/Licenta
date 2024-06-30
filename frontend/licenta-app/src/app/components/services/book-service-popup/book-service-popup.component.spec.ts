import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookServicePopupComponent } from './book-service-popup.component';

describe('BookServicePopupComponent', () => {
  let component: BookServicePopupComponent;
  let fixture: ComponentFixture<BookServicePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookServicePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookServicePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
