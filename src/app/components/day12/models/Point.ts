export class Point {
  neighbour_N: Point | undefined;
  neighbour_O: Point | undefined;
  neighbour_S: Point | undefined;
  neighbour_W: Point | undefined;
  public parent: Point | undefined;
  public routeFromStart: Point[] = [];


  constructor(public x: number, public y: number, public height: number, public isEndpoint: boolean) {
    this.x = x;
    this.y = y;
  }

  getAvailableNeighbours_upwards(): Point[] {
    const neighbours: Point [] = [];
    if (!!this.neighbour_N && this.height >= this.neighbour_N.height - 1) {
      neighbours.push(this.neighbour_N);
    }
    if (!!this.neighbour_O && this.height >= this.neighbour_O.height - 1) {
      neighbours.push(this.neighbour_O);
    }
    if (!!this.neighbour_S && this.height >= this.neighbour_S.height - 1) {
      neighbours.push(this.neighbour_S);
    }
    if (!!this.neighbour_W && this.height >= this.neighbour_W.height - 1) {
      neighbours.push(this.neighbour_W);
    }
    return neighbours;
  }

  getAvailableNeighbours_downwards(): Point[] {
    const neighbours: Point [] = [];
    if (!!this.neighbour_N && this.height <= this.neighbour_N.height + 1) {
      neighbours.push(this.neighbour_N);
    }
    if (!!this.neighbour_O && this.height <= this.neighbour_O.height + 1) {
      neighbours.push(this.neighbour_O);
    }
    if (!!this.neighbour_S && this.height <= this.neighbour_S.height + 1) {
      neighbours.push(this.neighbour_S);
    }
    if (!!this.neighbour_W && this.height <= this.neighbour_W.height + 1) {
      neighbours.push(this.neighbour_W);
    }
    return neighbours;
  }

  isSamePoint(point: Point) {
    return point.x === this.x && point.y === this.y
  }
}
