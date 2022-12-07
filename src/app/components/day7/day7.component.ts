import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Directory} from "./models/Directory";
import {File} from "./models/File";
import {ExecutedCommand} from "./models/ExecutedCommand";


@Component({
  selector: 'app-day7',
  templateUrl: './day7.component.html',
  styleUrls: ['./day7.component.scss']
})
export class Day7Component implements OnInit {
  currentDirectory: Directory = new Directory(
    "/",
    [],
    "god" as unknown as Directory,
    []
  );

  directories_loesung_part_1: number[] = [];
  directories_loesung_part_2: number[] = [];
  loesung_part_1: number = 0;
  loesung_part_2: number = 0;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getDataOfDay("7").subscribe((data) => {
      this.executeCommands(this.parseDataToCommands(data));

      this.navigateToRoot();
      this.solvePart1();

      this.navigateToRoot();
      this.solvePart2();
    })
  }

  private solvePart1() {
    this.recursive_algo_part1(this.currentDirectory);
    this.loesung_part_1 = this.directories_loesung_part_1.reduce((prev, cur) => prev + cur)
  }

  private solvePart2() {
    const unusedSpace = 70000000 - this.currentDirectory.getSizeIncludingSubDiretories()
    const spaceThatneedsToBeFreed = 30000000 - unusedSpace;
    this.recursive_algo_part2(this.currentDirectory, spaceThatneedsToBeFreed);
    this.loesung_part_2 = Math.min(...this.directories_loesung_part_2)
  }

  private recursive_algo_part1(dir: Directory) {
    const sizeIncludingSubDirectories = dir.getSizeIncludingSubDiretories();

    if (sizeIncludingSubDirectories <= 100000) {
      this.directories_loesung_part_1.push(sizeIncludingSubDirectories);
    }
    if (dir.subdirectories.length === 0) {
      return
    }

    for (let subDirectory of dir.subdirectories) {
      this.recursive_algo_part1(subDirectory);
    }
  }

  private recursive_algo_part2(dir: Directory, minSize: number) {
    const sizeIncludingSubDirectories = dir.getSizeIncludingSubDiretories();

    if (sizeIncludingSubDirectories >= minSize) {
      this.directories_loesung_part_2.push(sizeIncludingSubDirectories);
    }
    if (dir.subdirectories.length === 0) {
      return
    }

    for (let subDirectory of dir.subdirectories) {
      this.recursive_algo_part2(subDirectory, minSize);
    }
  }

  private navigateToRoot() {
    this.executeCommands([new ExecutedCommand("cd", "/", [])]);
  }

  private executeCommands(commands: ExecutedCommand[]) {
    for (let command of commands) {
      if (command.type === "cd") {
        this.executeCommand_cd(command);
      }
      if (command.type === "ls") {
        this.executeCommand_ls(command);
      }
    }
  }

  private executeCommand_ls(command: ExecutedCommand) {
    for (let returnValue of command.returnValues) {
      const itsADirectory = returnValue.startsWith("dir");

      if (itsADirectory) {
        const fileName = returnValue.split(" ")[1];
        if (this.currentDirectory.hasSubfolderWithName(fileName)) {
          // gibts schon do nothing
        } else {
          this.currentDirectory.addSubdirectory(fileName);
        }
      } else {
        const fileAsArray = returnValue.split(" ");
        const file = new File(fileAsArray[1], Number.parseInt(fileAsArray[0]));
        if (this.currentDirectory.hasFile(file.fileName)) {
          // gibts schon do nothing
        } else {
          this.currentDirectory.addFile(file);
        }
      }
    }
  }

  private executeCommand_cd(command: ExecutedCommand) {
    if (command.parameter === "..") {
      this.currentDirectory = this.currentDirectory.parentDirectory;
      return;
    }

    if (command.parameter === "/") {
      while (this.currentDirectory.name != "/") {
        this.currentDirectory = this.currentDirectory.parentDirectory;
      }
      return;
    }

    const subFolder = this.currentDirectory.subdirectories.find((dir) => dir.name === command.parameter);
    if (subFolder) {
      this.currentDirectory = subFolder;
    } else {
      this.currentDirectory = this.currentDirectory.addSubdirectory(command.parameter);
    }
  }

  parseDataToCommands(data: string) {
    const instructionStrings: string[] = data.split("$");
    instructionStrings.shift();
    const commands: ExecutedCommand[] = []

    for (let instructionString of instructionStrings) {
      const commandsAndArguments = this.removeTrailingLineBreak(instructionString).trim().split("\r\n");
      commands.push({
        type: commandsAndArguments[0].includes("cd") ? "cd" : "ls",
        parameter: commandsAndArguments[0].includes("cd") ? commandsAndArguments[0].split(" ")[1] : "",
        returnValues: commandsAndArguments.slice(1)
      })
    }

    return commands;
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
