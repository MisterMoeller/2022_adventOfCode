import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day11Component } from './day11.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";

describe('Day11Component', () => {
  let component: Day11Component;
  let fixture: ComponentFixture<Day11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient],
      declarations: [ Day11Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('same ergebnis', () => {
    component.ngOnInit();


    console.log(component)
  });


});
