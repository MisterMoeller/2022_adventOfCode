import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";

interface Command {
  duration: number;
  changeToX: number;
}

export function* cpuGeneratorFunction(commands: Command[]): Generator<number> {
  let xLastCommandEndedWith = 1;

  for (let command of commands) {
    for (let i = 0; i < command.duration; i++) {
      yield xLastCommandEndedWith;
    }
    xLastCommandEndedWith = xLastCommandEndedWith + command.changeToX;
  }
}

@Component({
  selector: 'app-day10',
  templateUrl: './day10.component.html',
  styleUrls: ['./day10.component.scss']
})
export class Day10Component implements OnInit {
  loesung_1: number = 0;
  loesung_2: string[][] = [];

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getDataOfDay("10").subscribe(data => {
      const commands = data.split("\r\n").slice(0, -1).map(this.parseToCommand);
      this.loesung_1 = this.solvePart1(commands);
      this.loesung_2 = this.solvePart2(commands);
    })
  }

  private solvePart1(commands: Command[]): number {
    const signalStrengthList = [];
    let cycleLastCommandEnded = 0;
    let xLastCommandEndedWith = 1;

    for (let command of commands) {
      const firstCycleOfThisCommand = cycleLastCommandEnded + 1;
      const lastCycleOfThisCommand = firstCycleOfThisCommand + (command.duration - 1);

      const xBeforeAndDuringCommand = xLastCommandEndedWith;
      const xAfterCommand = xBeforeAndDuringCommand + command.changeToX;

      const nextSpecialCycle = this.getNextSpecialCycle(firstCycleOfThisCommand);
      const specialCycleHappensThisCommand = nextSpecialCycle >= firstCycleOfThisCommand && nextSpecialCycle <= lastCycleOfThisCommand;

      if (specialCycleHappensThisCommand) {
        signalStrengthList.push(xBeforeAndDuringCommand * nextSpecialCycle);
      }

      cycleLastCommandEnded = lastCycleOfThisCommand;
      xLastCommandEndedWith = xAfterCommand;
    }
    return signalStrengthList.reduce((prev, cur) => prev + cur);
  }

  private solvePart2(commands: Command[]): string[][] {
    const allRows: string[][] = [[], [], [], [], [], []];
    const runningCPU = cpuGeneratorFunction(commands)

    for (let currentCycle = 0; currentCycle < 240; currentCycle++) {
      const rowIndex = Math.floor(currentCycle / 40)
      const row = allRows[rowIndex];

      const locationOfCRT = currentCycle - (rowIndex * 40);
      const xBeforeEndOfCycle: number = runningCPU.next().value;
      const spriteArea = [xBeforeEndOfCycle - 1, xBeforeEndOfCycle, xBeforeEndOfCycle + 1]

      row.push(spriteArea.includes(locationOfCRT) ? "#" : ".");
    }
    return allRows;
  }

  getNextSpecialCycle(cycle: number): number {
    if (cycle <= 20) {
      return 20;
    }
    const overTheLastForty = (cycle - 20) % 40;
    return overTheLastForty === 0 ? cycle : cycle - overTheLastForty + 40;
  }

  private parseToCommand(str: string): Command {
    const split = str.split(" ");
    let duration = 1;
    let changeToX = 0;
    if (split[0].includes("addx")) {
      duration = 2;
      changeToX = Number.parseInt(split[1]);
    }
    return {
      duration: duration,
      changeToX: changeToX
    }
  }
}
