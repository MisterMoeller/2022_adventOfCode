import {Component, OnInit} from '@angular/core';
import {realData_4, testData_4} from "./data_4";

class ElfWithRange {
  constructor(public startIndex: number, public endIndex: number) {
  }
}

class ElfPair {
  constructor(public firstElf: ElfWithRange, public secondElf: ElfWithRange) {
  }
}

@Component({
  selector: 'app-day4',
  templateUrl: './day4.component.html',
  styleUrls: ['./day4.component.scss']
})
export class Day4Component implements OnInit {
  loesung_1 = 0;
  losesung_2 = 0;

  ngOnInit(): void {
    const parsedData = this.parser(realData_4);
    console.log(parsedData)
    this.loesung_1 = parsedData.map(pair => this.doesOneElfAreaIncludeTheOther(pair)).reduce((a: number, b) => {
      return a + (b ? 1 : 0);
    }, 0);

    this.losesung_2 = parsedData.map(pair => this.isThereOverlap(pair)).reduce((a: number, b) => {
      return a + (b ? 1 : 0);
    }, 0);

  }

  doesOneElfAreaIncludeTheOther(pair: ElfPair) {
    const oneIncludesTwo = pair.firstElf.startIndex <= pair.secondElf.startIndex && pair.firstElf.endIndex >= pair.secondElf.endIndex
    const twoIncludesOne = pair.secondElf.startIndex <= pair.firstElf.startIndex && pair.secondElf.endIndex >= pair.firstElf.endIndex
    return oneIncludesTwo || twoIncludesOne;
  }

  isThereOverlap(pair: ElfPair): boolean {
    const oneIncludesTheOther = this.doesOneElfAreaIncludeTheOther(pair);
    if (oneIncludesTheOther) {
      return true;
    }

    let thereIsOverlap = false;
    if (pair.firstElf.startIndex === pair.secondElf.startIndex || pair.firstElf.endIndex === pair.secondElf.endIndex) {
      // starten oder enden gemeinsam
      thereIsOverlap = true;
    }

    if (pair.firstElf.startIndex < pair.secondElf.startIndex) {
      // 1 startet vor 2
      thereIsOverlap = pair.firstElf.endIndex >= pair.secondElf.startIndex;
    }

    if (pair.firstElf.startIndex > pair.secondElf.startIndex) {
      // 1 startet nach 2
      thereIsOverlap = pair.firstElf.startIndex <= pair.secondElf.endIndex;
    }
    return thereIsOverlap;
  }

  parser(data: string): ElfPair[] {
    const pairStrings: string[] = data.split("\n");
    return pairStrings
      .map(pairstr => pairstr.split(",").map((elfString: string): ElfWithRange => {
        const elfRanges: string[] = elfString.split("-");
        return new ElfWithRange(Number.parseInt(elfRanges[0]), Number.parseInt(elfRanges[1]));
      })).map((elfsWithRanges: ElfWithRange[]) => new ElfPair(elfsWithRanges[0], elfsWithRanges[1]))

  }


}
