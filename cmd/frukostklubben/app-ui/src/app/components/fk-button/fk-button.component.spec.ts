import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FkButtonComponent } from './fk-button.component';

describe('FkButtonComponent', () => {
  let component: FkButtonComponent;
  let fixture: ComponentFixture<FkButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FkButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FkButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
