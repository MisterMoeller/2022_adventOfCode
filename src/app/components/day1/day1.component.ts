import { Component, OnInit } from '@angular/core';
import {realData_day1, testData_day1} from "./data";
import {Elf} from "./models/Elf";

@Component({
  selector: 'app-day1',
  templateUrl: './day1.component.html',
  styleUrls: ['./day1.component.scss']
})
export class Day1Component implements OnInit {
  mostCalories_Test: number = 0;
  mostCalories_Real: number = 0;
  elvesTestData: Elf[] = []
  elvesRealData: Elf[] = []
  top3Calories_Real: number[] = [];
  top3Calories_combined: number = 0;
  constructor() { }

  ngOnInit(): void {
    this.elvesTestData = this.createElvesFromData(testData_day1);
    this.mostCalories_Test = Math.max(...this.elvesTestData.map(elf => elf.getTotalCalories()));

    this.elvesRealData = this.createElvesFromData(realData_day1);
    this.mostCalories_Real = Math.max(...this.elvesRealData.map(elf => elf.getTotalCalories()));
    const caloriesSorted = [...this.elvesRealData.map(elf => elf.getTotalCalories())].sort((a, b) => b -a )
    this.top3Calories_Real = caloriesSorted.slice(0, 3)
    console.log({caloriesSOrted: caloriesSorted})
    this.top3Calories_combined = this.top3Calories_Real.reduce((p, n) => p + n);
  }

  private createElvesFromData(data: string): Elf[] {
    const dataDividedByElf = data.split("\n\n");
    const elves = [];
    for (let elfData of dataDividedByElf) {
      const elf = new Elf();
      const foodItems: number[] = elfData.split("\n").map(str => Number.parseInt(str))
      for (let foodItem of foodItems) {
        elf.addFoodItem(foodItem);
      }
      elves.push(elf);
    }
    return elves;
  }
}
