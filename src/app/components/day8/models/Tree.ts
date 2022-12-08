import {Direction} from "./Direction";

export class Tree {
  constructor(
    public height: number,
    public neighbourN: Tree | undefined,
    public neighbourO: Tree | undefined,
    public neighbourS: Tree | undefined,
    public neighbourW: Tree | undefined,
  ) {
  }

  isVisible(): boolean {
    const isSideTree = !this.neighbourN || !this.neighbourO || !this.neighbourS || !this.neighbourW;
    if (isSideTree) {
      return true;
    }
    if (this.height > this.neighbourN!.getHighestNeighbourInDirection(0, "N")) {
      return true;
    }
    if (this.height > this.neighbourO!.getHighestNeighbourInDirection(0, "O")) {
      return true;
    }
    if (this.height > this.neighbourS!.getHighestNeighbourInDirection(0, "S")) {
      return true;
    }
    return this.height > this.neighbourW!.getHighestNeighbourInDirection(0, "W");
  }

  calcScenicScore() {
    const visibleTreesN = this.getVisibleTreesInDirection(this.height, "N", 0);
    const visibleTreesO = this.getVisibleTreesInDirection(this.height, "O", 0);
    const visibleTreesS = this.getVisibleTreesInDirection(this.height, "S", 0);
    const visibleTreesW = this.getVisibleTreesInDirection(this.height, "W", 0);
    return visibleTreesN * visibleTreesO * visibleTreesS * visibleTreesW;
  }

  getHighestNeighbourInDirection(previousMax: number, direction: Direction): number {
    let neighbour = this.getNeighbourByDirection(direction);

    let currentMax = Math.max(previousMax, this.height);
    if (neighbour === undefined) {
      return currentMax;
    }
    return neighbour.getHighestNeighbourInDirection(currentMax, direction);
  }

  getVisibleTreesInDirection(referenceSize: number, direction: Direction, visibleTrees: number): number {
    let neighbour = this.getNeighbourByDirection(direction);

    if (neighbour === undefined) {
      return visibleTrees;
    }
    if (neighbour.height >= referenceSize) {
      return visibleTrees + 1;
    }

    return neighbour.getVisibleTreesInDirection(referenceSize, direction, visibleTrees + 1);
  }

  private getNeighbourByDirection(direction: Direction) {
    let neighbour: Tree | undefined;
    switch (direction) {
      case "N": {
        neighbour = this.neighbourN;
        break;
      }
      case "O": {
        neighbour = this.neighbourO;
        break;
      }
      case "S": {
        neighbour = this.neighbourS;
        break;
      }
      case "W": {
        neighbour = this.neighbourW;
        break;
      }
    }
    return neighbour;
  }
}
