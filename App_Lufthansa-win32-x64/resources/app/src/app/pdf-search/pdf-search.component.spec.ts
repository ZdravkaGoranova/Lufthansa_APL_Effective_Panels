import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfSearchComponent } from './pdf-search.component';

describe('PdfSearchComponent', () => {
  let component: PdfSearchComponent;
  let fixture: ComponentFixture<PdfSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfSearchComponent]
    });
    fixture = TestBed.createComponent(PdfSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
