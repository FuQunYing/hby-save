import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartControlComponent } from './cart-control.component';

describe('CartControlComponent', () => {
  let component: CartControlComponent;
  let fixture: ComponentFixture<CartControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
