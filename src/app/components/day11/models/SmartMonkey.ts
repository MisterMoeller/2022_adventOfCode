export interface Item {
  additionenAufaddiert: number;
  multiplikationen: number[];
}

export class SmartMonkey {
  inspectionCounter = 0;
  allMonkeys: SmartMonkey[] = [];

  constructor(private id: number, public items: Item[], public operationString: string, private readonly testPrimeNumber: number, private readonly nextMonkeyTestTrue: number, private readonly nextMonkeyTestFalse: number) {
    this.id = id;
    this.items = items;
    this.testPrimeNumber = testPrimeNumber;
    this.nextMonkeyTestTrue = nextMonkeyTestTrue;
    this.nextMonkeyTestFalse = nextMonkeyTestFalse;
    this.operationString = operationString;
  }

  playRound() {
    while (this.items.length > 0) {
      const item: Item = this.items.shift()!;
      this.applyInspectionOperation(item);
      this.inspectionCounter++;
      const testResult = item.multiplikationen.includes(this.testPrimeNumber) || item.additionenAufaddiert % this.testPrimeNumber === 0;

      this.throwItemToMonkey(item, testResult ? this.nextMonkeyTestTrue : this.nextMonkeyTestFalse);
    }
  }

  applyInspectionOperation(item: Item): void {
    const isAddition = this.operationString.includes("+");
    if (isAddition) {
      const num = Number.parseInt(this.operationString.split("+")[1]);
      item.additionenAufaddiert += num;
    } else {
      const multiplikator = this.operationString.split("*")[1];
      let mulToAdd: number;
      if (multiplikator.includes("old")) {
        mulToAdd = item.additionenAufaddiert
      } else {
        mulToAdd = Number.parseInt(this.operationString.split("*")[1]);
      }
      item.multiplikationen.push(mulToAdd);
      item.additionenAufaddiert *= mulToAdd;
    }
  }

  throwItemToMonkey(item: Item, monkeyId: number): void {
    this.allMonkeys[monkeyId].receiveItem(item);
  }

  receiveItem(item: Item) {
    this.items.push(item);
  }
}
