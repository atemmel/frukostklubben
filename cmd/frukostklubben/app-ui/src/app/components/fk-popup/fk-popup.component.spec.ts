import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FkPopupComponent } from './fk-popup.component';

describe('FkPopupComponent', () => {
  let component: FkPopupComponent;
  let fixture: ComponentFixture<FkPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FkPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FkPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
