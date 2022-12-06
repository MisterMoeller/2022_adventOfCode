import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";


@Component({
  selector: 'app-day6',
  templateUrl: './day6.component.html',
  styleUrls: ['./day6.component.scss']
})
export class Day6Component implements OnInit {
  loseung_1: number = 0;
  loseung_2: number = 0;

  constructor(public dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getDataOfDay("6").subscribe(data => {
      this.loseung_1 = this.findFirstPattern(data, 4);
      this.loseung_2 = this.findFirstPattern(data, 14);
    })
  }

  findFirstPattern(data: string, patternLength: number) {
    let index = 0;
    for (let i = patternLength - 1; i < data.length; i++) {
      const uniqueSet = new Set()
      for (let j = patternLength - 1; j >= 0; j--) {
        uniqueSet.add(data[i - j]);
      }
      if (uniqueSet.size === patternLength) {
        index = i;
        break;
      }
    }
    return index + 1;
  }

}
