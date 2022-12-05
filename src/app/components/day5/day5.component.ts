import {Component, OnInit} from '@angular/core';
import {realData_5, testData_5} from "./data";

class Instruction {
  constructor(public amount: number, public from: number, public to: number) {
  }
}

@Component({
  selector: 'app-day5',
  templateUrl: './day5.component.html',
  styleUrls: ['./day5.component.scss']
})
export class Day5Component implements OnInit {
  loesung_1 = "";

  constructor() {
  }

  ngOnInit(): void {
    // UNTEN IM STACK = ERSTES ELEMENT DES ARRAYS
    const parsedData = this.parseData(realData_5);
    const stacks = parsedData.stacks;
    const instructions = parsedData.instructions;
    for (let instruction of instructions!) {
      this.doInstruction_2(instruction, stacks!);
    }
    for (let stack of stacks) {
      this.loesung_1 += stack.slice(-1);
    }

  }

  doInstruction_2(instruction: Instruction, stacks: string[][]): void {
    if (instruction.amount === 1) {
      this.doInstruction_1(instruction, stacks);
      return;
    }

    const stuffThatIsMoved = stacks[instruction.from].splice(-instruction.amount, instruction.amount);
    stacks[instruction.to].push(...stuffThatIsMoved)
  }

  doInstruction_1(instruction: Instruction, stacks: string[][]) {
    for (let i = instruction.amount; i > 0; i--) {
      stacks[instruction.to].push(stacks[instruction.from].pop()!)
    }
  }


  parseData(data: string) {
    const stacksAndInstructions = data.split("\n\n");
    return {
      stacks: this.parseStacks(stacksAndInstructions[0]),
      instructions: this.parseInstructions(stacksAndInstructions[1])
    }
  }

  private parseInstructions(instructionStrings: string) {
    const instructions: Instruction[] = [];
    const dividedInstructionsStrings = instructionStrings.split("\n")
    for (let instructionString of dividedInstructionsStrings) {
      const allMatches = instructionString.match(/\d+/g)
      const matchesAsNumbers = allMatches!.map(str => Number.parseInt(str));
      const instruction = new Instruction(matchesAsNumbers[0], matchesAsNumbers[1]-1, matchesAsNumbers[2]-1)
      instructions.push(instruction);
    }
    return instructions
  }

  private parseStacks(stacks: string) {
    const rowStrings: string[] = stacks.split("\n");
    const numbersAtBottom = rowStrings.pop();
    const parsedData: string[][] = [];
    numbersAtBottom!.replace(/\s/g, "").split("").forEach(() => parsedData.push([]));

    for (let rowString of rowStrings) {
      // es geht von oben nach unten = vom ende des Arrays zum Anfang = vorne einfügen
      const filledRow = this.addMissingFields(rowString);
      const rowContentAsString = filledRow.replace(/\[/g, "").replace(/]/g, "")
      const rowContentAsArray = rowContentAsString.split("");
      for (let i = 0; i < rowContentAsArray.length; i++) {
        if (rowContentAsArray[i] !== "*") {
          parsedData[i].unshift(rowContentAsArray[i]);
        }
      }
    }
    return parsedData;
  }

  addMissingFields(str: string) {
    //    [D]     => [*][D][*]
    let result = str;
    if (result.startsWith("    ")) {
      result = "[*]" + result.substring(4);
    }
    if (result.endsWith("    ")) {
      result = result.substring(0, result.length - 4) + "[*]";
    }
    result = result.replace(/\s{5}/g, "[*]");
    result = result.replace(/\s{4}/g, "[*]");
    result = result.replace(/\s{3}/g, "[*]");
    result = result.replace(/\s/g, "");
    return result;
  }


}
