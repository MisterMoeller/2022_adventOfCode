import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Monkey} from "./models/Monkey";
import {Item, SmartMonkey} from "./models/SmartMonkey";

@Component({
  selector: 'app-day11',
  templateUrl: './day11.component.html',
  styleUrls: ['./day11.component.scss']
})
export class Day11Component implements OnInit {
  loesung_1 = 0;
  loesung_2 = 0;

  monkeys_1: Monkey[] = [];
  monkeys_2: SmartMonkey[] = [];

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getTestDataOfDay("11").subscribe(data => {
      this.monkeys_1 = this.parseToMonkeys(data);
      this.connectMonkeys(this.monkeys_1);
      this.loesung_1 = this.solvePart1(this.monkeys_1, 20);

      this.monkeys_2 = this.parseToSmartMonkeys(data);
      this.connectMonkeys2(this.monkeys_2);
      this.loesung_2 = this.solvePart2(this.monkeys_2, 20);
    })
  }

  private connectMonkeys(monkeys: Monkey[]) {
    for (let monkey of monkeys) {
      monkey.allMonkeys = monkeys
    }
  }

  private connectMonkeys2(monkeys: SmartMonkey[]) {
    for (let monkey of monkeys) {
      monkey.allMonkeys = monkeys
    }
  }

  private solvePart1(monkeys: Monkey[], rounds: number): number {
    this.playRounds(monkeys, rounds);

    return monkeys
      .map(monkey => monkey.inspectionCounter)
      .sort(((a, b) => b - a))
      .slice(0, 2)
      .reduce((prev, cur) => prev * cur);
  }

  private solvePart2(monkeys: SmartMonkey[], rounds: number): number {
    this.playRounds(monkeys, rounds);

    return monkeys
      .map(monkey => monkey.inspectionCounter)
      .sort(((a, b) => b - a))
      .slice(0, 2)
      .reduce((prev, cur) => prev * cur);
  }

  private playRounds(monkeys: Monkey[] | SmartMonkey[], rounds: number) {
    for (let i = 0; i < rounds; i++) {
      for (let monkey of monkeys) {
        monkey.playRound();
      }
    }
  }

  private parseToMonkeys(data: string) {
    const monkeysStrings = data.split("Monkey").splice(1);
    const parsedMonkeys: Monkey[] = [];
    for (let monkey of monkeysStrings) {
      const splitMonkey = monkey.split("\r\n");
      const items: number[] = splitMonkey[1].split(":")[1].split(",").map(str => Number.parseInt(str));
      const id = Number.parseInt(splitMonkey[0]);
      const operation = splitMonkey[2].split(":")[1].replace("new", "result");
      const numberForTest = Number.parseInt(splitMonkey[3].split("by ")[1]);
      const nextMonkeyTestTrue = Number.parseInt(splitMonkey[4].split("monkey ")[1]);
      const nextMonkeyTestFalse = Number.parseInt(splitMonkey[5].split("monkey ")[1]);
      parsedMonkeys.push(new Monkey(
        id,
        items,
        operation,
        numberForTest,
        nextMonkeyTestTrue,
        nextMonkeyTestFalse
      ));
    }
    return parsedMonkeys;
  }

  private parseToSmartMonkeys(data: string): SmartMonkey[] {
    const monkeysStrings = data.split("Monkey").splice(1);
    const parsedMonkeys: SmartMonkey[] = [];
    for (let monkey of monkeysStrings) {
      const splitMonkey = monkey.split("\r\n");
      const items: Item[] =  splitMonkey[1].split(":")[1].split(",").map(str => {
        return {additionenAufaddiert: Number.parseInt(str), multiplikationen: []}
      });
      const id = Number.parseInt(splitMonkey[0]);
      const operation = splitMonkey[2].split(":")[1].replace("new", "result");
      const numberForTest = Number.parseInt(splitMonkey[3].split("by ")[1]);
      const nextMonkeyTestTrue = Number.parseInt(splitMonkey[4].split("monkey ")[1]);
      const nextMonkeyTestFalse = Number.parseInt(splitMonkey[5].split("monkey ")[1]);
      parsedMonkeys.push(new SmartMonkey(
        id,
        items,
        operation,
        numberForTest,
        nextMonkeyTestTrue,
        nextMonkeyTestFalse
      ));
    }
    return parsedMonkeys;
  }
}
