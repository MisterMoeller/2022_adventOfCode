import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day23Component } from './day23.component';

describe('Day23Component', () => {
  let component: Day23Component;
  let fixture: ComponentFixture<Day23Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day23Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day23Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
