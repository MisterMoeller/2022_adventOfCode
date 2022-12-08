import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Tree} from "./models/Tree";


@Component({
  selector: 'app-day8',
  templateUrl: './day8.component.html',
  styleUrls: ['./day8.component.scss']
})
export class Day8Component implements OnInit {
  loesung_1 = 0;
  loesung_2 = 0;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getDataOfDay("8").subscribe(data => {
      const forrest = this.parseData(data);

      const visibleTrees = this.calcVisibleTrees(forrest);
      this.loesung_1 = visibleTrees.length;

      const scenicScores = this.calcScenicScores(forrest);
      this.loesung_2 = Math.max(...scenicScores)
    })
  }

  private calcScenicScores(forrest: Tree[][]) {
    const scenicScores: number[] = [];
    for (let row of forrest) {
      for (const tree of row) {
        scenicScores.push(tree.calcScenicScore());
      }
    }
    return scenicScores;
  }

  private calcVisibleTrees(forrest: Tree[][]) {
    const visibleTrees: Tree[] = [];
    for (let row of forrest) {
      for (const tree of row) {
        if (tree.isVisible()) {
          visibleTrees.push(tree);
        }
      }
    }
    return visibleTrees;
  }

  private parseData(data: string): Tree[][] {
    const rows = data.split("\r\n").slice(0, -1);
    const forrest = this.buildForrestWithoutReferences(rows);
    this.addReferencesToForrest(forrest);

    return forrest;
  }

  private addReferencesToForrest(forrest: Tree[][]) {
    for (let rowIndex = 0; rowIndex < forrest.length; rowIndex++) {
      for (let columnIndex = 0; columnIndex < forrest.length; columnIndex++) {
        const currentTree = forrest[rowIndex][columnIndex];

        let neighbourS: Tree | undefined;
        if (forrest[rowIndex + 1]) {
          neighbourS = forrest[rowIndex + 1][columnIndex];
        }

        const neighbourO = forrest[rowIndex][columnIndex + 1];

        let neighbourN: Tree | undefined;
        if (forrest[rowIndex - 1]) {
          neighbourN = forrest[rowIndex - 1][columnIndex];
        }

        const neighbourW = forrest[rowIndex][columnIndex - 1];

        if (neighbourN) {
          currentTree.neighbourN = neighbourN
        }
        if (neighbourO) {
          currentTree.neighbourO = neighbourO
        }
        if (neighbourS) {
          currentTree.neighbourS = neighbourS
        }
        if (neighbourW) {
          currentTree.neighbourW = neighbourW
        }
      }
    }
  }

  private buildForrestWithoutReferences(rows: string[]) {
    const forrest: Tree[][] = [];
    for (const [y, row] of rows.entries()) {
      forrest[y] = [];
      const treeHeights = row.split("").map(str => Number.parseInt(str))
      for (const [x, treeHeight] of treeHeights.entries()) {
        forrest[y][x] = new Tree(treeHeight, undefined, undefined, undefined, undefined)
      }
    }
    return forrest;
  }
}
