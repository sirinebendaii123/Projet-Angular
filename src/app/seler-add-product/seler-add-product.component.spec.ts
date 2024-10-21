import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelerAddProductComponent } from './seler-add-product.component';

describe('SelerAddProductComponent', () => {
  let component: SelerAddProductComponent;
  let fixture: ComponentFixture<SelerAddProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelerAddProductComponent]
    });
    fixture = TestBed.createComponent(SelerAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
