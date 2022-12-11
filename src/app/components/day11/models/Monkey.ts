export class Monkey {
  inspectionCounter = 0;
  allMonkeys: Monkey[] = [];

  constructor(private id: number, public items: number[], private operationString: string, private readonly numberForTest: number, private readonly nextMonkeyTestTrue: number, private readonly nextMonkeyTestFalse: number) {
    this.id = id;
    this.items = items;
    this.numberForTest = numberForTest;
    this.nextMonkeyTestTrue = nextMonkeyTestTrue;
    this.nextMonkeyTestFalse = nextMonkeyTestFalse;
    this.operationString = operationString;
  }

  playRound() {
    while(this.items.length > 0) {
      const item: number = this.items.shift()!;
      const itemAfterInspection: number = this.applyInspectionOperation(item);
      this.inspectionCounter++;
      const itemAfterBoredom: number = this.applyBoredom(itemAfterInspection);
      const testResult = itemAfterBoredom % this.numberForTest === 0;
      this.throwItemToMonkey(itemAfterBoredom, testResult ? this.nextMonkeyTestTrue : this.nextMonkeyTestFalse);
    }
  }

  playRound_WithoutBoredom() {
    while(this.items.length > 0) {
      const item: number = this.items.shift()!;
      const itemAfterInspection: number = this.applyInspectionOperation(item);
      this.inspectionCounter++;
      const testResult = itemAfterInspection % this.numberForTest === 0;
      this.throwItemToMonkey(itemAfterInspection, testResult ? this.nextMonkeyTestTrue : this.nextMonkeyTestFalse);
    }
  }

  applyInspectionOperation(old: number):number {
    let result: number = -1;
    eval(this.operationString);
    return result;
  }

  applyBoredom(num: number) {
    return Math.floor(num / 3);
  }

  throwItemToMonkey(item: number, monkeyId: number): void {
    this.allMonkeys[monkeyId].receiveItem(item);
  }

  receiveItem(item: number) {
    this.items.push(item);
  }
}
