import {Component, OnInit} from '@angular/core';
import {realData_3, testData_3} from "./data_3";

interface Rucksack {
  firstBag: number[];
  firstBag_unique: Set<number>;
  secondBag: number[];
  secondBag_unique: Set<number>;
  itemsInBothBags: number[]
}

@Component({
  selector: 'app-day3',
  templateUrl: './day3.component.html',
  styleUrls: ['./day3.component.scss']
})
export class Day3Component implements OnInit {
  rucksacks: Rucksack[] = [];
  result_1: number = 0;
  result_2: number = 0;


  rucksackGroups: Set<number>[][] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.rucksacks = this.parser(realData_3);
    for (let rucksack of this.rucksacks) {
      rucksack.itemsInBothBags = this.findItemsInBothBagsOfRucksack(rucksack);
    }

    for (let i = 0; i < this.rucksacks.length; i = i+3) {
      this.rucksackGroups.push([this.getCombinedUniqueItems(this.rucksacks[i]), this.getCombinedUniqueItems(this.rucksacks[i+1]), this.getCombinedUniqueItems(this.rucksacks[i+2])])
    }

    console.log(this.rucksackGroups)
    const mappedGroups = this.rucksackGroups.map(group => this.getSharedItemOfThreeSets(group[0], group[1], group[2]));
    this.result_2 = mappedGroups.map(g => g[0]).reduce((a, b) => a+b);


    this.result_1 = this.rucksacks.map(r => r.itemsInBothBags[0]).reduce((prev, cur): number => prev + cur);
  }

  private getCombinedUniqueItems(rucksack: Rucksack) {
    return new Set([...rucksack.firstBag_unique, ...rucksack.secondBag_unique]);
  }

  private getSharedItemOfThreeSets(set1: Set<number>, set2: Set<number>, set3: Set<number>): number[] {
    const combinedSortedArray: number[] = [...set1, ...set2, ...set3].sort(this.compareByNumber);
    const trippleItems = [];

    for (let i = 0; i < combinedSortedArray.length - 2; i++) {
      if (combinedSortedArray[i] === combinedSortedArray[i+1] && combinedSortedArray[i] === combinedSortedArray[i+2]) {
        trippleItems.push(combinedSortedArray[i]);
      }
    }
    return trippleItems;
  }

  findItemsInBothBagsOfRucksack(rucksack: Rucksack): number[] {
    const combinedSortedArray: number[] = [...rucksack.firstBag_unique, ...rucksack.secondBag_unique].sort(this.compareByNumber);
    const doubleItems = [];

    for (let i = 0; i < combinedSortedArray.length - 1; i++) {
      if (combinedSortedArray[i] === combinedSortedArray[i+1]) {
        doubleItems.push(combinedSortedArray[i]);
      }
    }
    return doubleItems
  }

  getPriorityOfItem(item: string) {
    const charCode = item.charCodeAt(0);
    return charCode > 90 ? charCode - 96 : charCode - 64 + 26;
  }

  parser(data: string): Rucksack[] {
    const rucksackStrings = data.split("\n");
    return rucksackStrings.map(str => {
      const firstBag = str.substring(0, str.length / 2).split("").sort().map(str => this.getPriorityOfItem(str));
      const secondBag = str.substring(str.length / 2).split("").sort().map(str => this.getPriorityOfItem(str));
      return {
        firstBag: firstBag,
        firstBag_unique: new Set<number>(firstBag),
        secondBag: secondBag,
        secondBag_unique: new Set<number>(secondBag),
        itemsInBothBags: []
      }
    });
  }

  private compareByNumber(a: number, b: number) {
    return  a - b;
  }
}
