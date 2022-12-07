export class ExecutedCommand {
  constructor(public type: "cd" | "ls", public parameter: string,
              public returnValues: string[]) {
  }
}
