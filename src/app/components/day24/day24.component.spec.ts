import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day24Component } from './day24.component';

describe('Day24Component', () => {
  let component: Day24Component;
  let fixture: ComponentFixture<Day24Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day24Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day24Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
