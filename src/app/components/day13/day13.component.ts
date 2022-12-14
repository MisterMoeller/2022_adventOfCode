import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-day13',
  templateUrl: './day13.component.html',
  styleUrls: ['./day13.component.scss']
})
export class Day13Component implements OnInit {

  loesung_1 = 0;
  loesung_2 = 0;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getDataOfDay("13").subscribe((data) => {
      const pairStrings: string[] = data.split("\r\n\r\n").map(this.removeTrailingLineBreak);
      const pairs: { left: number[], right: number[] }[] = this.parseToPairs(pairStrings);
      this.loesung_1 = this.solvePart1(pairs);
      this.loesung_2 = this.SolvePart2(data);
    })
  }


  private SolvePart2(data: string) {
    const allPackages = data.split("\r\n").filter(str => str !== "").map(str => this.parseToPacket(str));
    allPackages.push([2])
    allPackages.push([6])
    const allPackagesSorted: (number | number[])[] = allPackages.sort((a, b) => {
      if (this.twoItemsAreInOrder(JSON.parse(JSON.stringify(a)), JSON.parse(JSON.stringify(b))) === ResultType.TRUE) {
        return -1
      }
      if (this.twoItemsAreInOrder(JSON.parse(JSON.stringify(a)), JSON.parse(JSON.stringify(b))) === ResultType.FALSE) {
        return 1
      }
      return 0
    })


    const indexOfDecoder1 = allPackagesSorted.findIndex((val: number | number[]) => {
      if (Array.isArray(val)) {
        return val.length === 1 && val[0] === 2;
      }
      // wont happen
      return true;
    })

    const indexOfDecoder2 = allPackagesSorted.findIndex((val: number | number[]) => {
      if (Array.isArray(val)) {
        return val.length === 1 && val[0] === 6;
      }
      // wont happen
      return true;
    })

    return (indexOfDecoder1 + 1) * (indexOfDecoder2 + 1)
  }

  private solvePart1(pairs: { left: number[]; right: number[] }[]): number {
    const indexesOfPairsInRightOrder: number[] = [];
    for (let [index, pair] of pairs.entries()) {
      switch (this.twoItemsAreInOrder(pair.left, pair.right)) {
        case ResultType.TRUE: {
          indexesOfPairsInRightOrder.push(index + 1);
          break;
        }
        case ResultType.FALSE: {
          break;
        }
        case ResultType.CANTSAYYET: {
          // should not happen
          console.warn("CANTSAYYET auf oberster Ebene returned");
        }
      }
    }
    return indexesOfPairsInRightOrder.reduce((prev, cur) => prev + cur);
  }

  private twoItemsAreInOrder(leftItem: number | number[], rightItem: number | number[]): ResultType {
    const leftIsArray = Array.isArray(leftItem);
    const rightIsArray = Array.isArray(rightItem);

    const twoIntegers = !leftIsArray && !rightIsArray;
    const twoArrays = leftIsArray && rightIsArray;

    if (twoIntegers) {
      if (leftItem < rightItem) {
        return ResultType.TRUE;
      }
      if (leftItem > rightItem) {
        return ResultType.FALSE;
      }
      if (leftItem === rightItem) {
        return ResultType.CANTSAYYET
      }
    }

    if (twoArrays) {
      while (true) {
        if (leftItem.length === 0 && rightItem.length > 0) {
          return ResultType.TRUE
        }
        if (leftItem.length > 0 && rightItem.length === 0) {
          return ResultType.FALSE
        }
        if (leftItem.length === 0 && rightItem.length === 0) {
          return ResultType.CANTSAYYET
        }
        const itemFromLeftArray = leftItem.shift()!;
        const itemFromRightArray = rightItem.shift()!;

        switch (this.twoItemsAreInOrder(itemFromLeftArray, itemFromRightArray)) {
          case ResultType.TRUE: {
            return ResultType.TRUE;
          }
          case ResultType.FALSE: {
            return ResultType.FALSE
          }
          case ResultType.CANTSAYYET: {
            // go to next loop
          }
        }
      }
    }

    if (!twoIntegers && !twoArrays) {
      // mixed
      if (!Array.isArray(rightItem)) {
        return this.twoItemsAreInOrder(leftItem, [rightItem])
      } else if (!Array.isArray(leftItem)) {
        return this.twoItemsAreInOrder([leftItem], rightItem);
      }
    }

    return ResultType.CANTSAYYET
  }


  private parseToPairs(pairStrings: string[]) {
    return pairStrings.map(pairString => {
      const splitPair = pairString.split("\r\n");
      const left = eval(splitPair[0]);
      const right = eval(splitPair[1]);
      return {left: left, right: right}
    })
  }

  private parseToPacket(packetString: string): number | number[] {
    return eval(this.removeTrailingLineBreak(packetString));
  }

  removeTrailingLineBreak(str: string) {
    let result = str;
    const stuffToRemove = "\r\n";
    if (str.endsWith(stuffToRemove)) {
      result = str.substring(0, str.length - 2)
    }
    return result;
  }
}

export enum ResultType {
  TRUE, FALSE, CANTSAYYET
}
