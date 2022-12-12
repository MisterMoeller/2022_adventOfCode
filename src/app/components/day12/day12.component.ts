import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Point} from "./models/Point";

@Component({
  selector: 'app-day12',
  templateUrl: './day12.component.html',
  styleUrls: ['./day12.component.scss']
})
export class Day12Component implements OnInit {
  loesung_1 = 0;
  loesung_2 = 0;

  startingPointX = 0
  startingPointY = 0;

  endPointX = 0
  endPointY = 0;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getDataOfDay("12").subscribe((data) => {
      const stringRows: string[] = data.split("\r\n").slice(0, -1);

      const area_1 = this.setupArea(stringRows);
      const startPoint = area_1[this.startingPointX][this.startingPointY];
      this.loesung_1 = this.calcShortestPathToEnd(startPoint)

      const area_2 = this.setupArea(stringRows);
      const endPoint = area_2[this.endPointX][this.endPointY]
      this.loesung_2 = this.calcShortestPathToA(endPoint);
    })
  }

  calcShortestPathToEnd(startPoint: Point) {
    startPoint.routeFromStart = [];
    const visitedPoints: Point[] = [startPoint];
    let winner: Point;

    const queue = startPoint.getAvailableNeighbours_upwards();

    while (queue.length > 0) {
      const point = queue.shift()!;
      if (point.isEndpoint) {
        winner = point;
        break;
      }
      const neighboursOfPoint = point.getAvailableNeighbours_upwards();
      const unvisitedNeighboursOfPoint = neighboursOfPoint.filter(n => !this.pointIsInArray(n, visitedPoints));
      for (let neighbour of unvisitedNeighboursOfPoint) {
        visitedPoints.push(neighbour);
        neighbour.parent = point;
        neighbour.routeFromStart = [...point.routeFromStart, point];
        queue.push(neighbour)
      }
    }
    // @ts-ignore
    return winner.routeFromStart.length + 1;
  }

  calcShortestPathToA(startPoint: Point) {
    startPoint.routeFromStart = [];
    const visitedPoints: Point[] = [startPoint];
    let winner: Point;

    const queue = startPoint.getAvailableNeighbours_downwards();

    while (queue.length > 0) {
      const point = queue.shift()!;
      if (point.height === 0) {
        winner = point;
        break;
      }
      const neighboursOfPoint = point.getAvailableNeighbours_downwards();
      const unvisitedNeighboursOfPoint = neighboursOfPoint.filter(n => !this.pointIsInArray(n, visitedPoints));
      for (let neighbour of unvisitedNeighboursOfPoint) {
        visitedPoints.push(neighbour);
        neighbour.parent = point;
        neighbour.routeFromStart = [...point.routeFromStart, point];
        queue.push(neighbour)
      }
    }
    // @ts-ignore
    return winner.routeFromStart.length + 1;
  }

  private pointIsInArray(point: Point, pointArray: Point[]) {
    return pointArray.find((pointInRoute) => pointInRoute.isSamePoint(point));
  }

  private addReferences(area: Point[][]) {
    for (let rowIndex = 0; rowIndex < area.length; rowIndex++) {
      for (let pointIndex = 0; pointIndex < area[rowIndex].length; pointIndex++) {
        if (area[rowIndex - 1] && area[rowIndex - 1][pointIndex]) {
          area[rowIndex][pointIndex].neighbour_N = area[rowIndex - 1][pointIndex];
        }

        if (area[rowIndex][pointIndex + 1]) {
          area[rowIndex][pointIndex].neighbour_O = area[rowIndex][pointIndex + 1];
        }

        if (area[rowIndex + 1] && area[rowIndex + 1][pointIndex]) {
          area[rowIndex][pointIndex].neighbour_S = area[rowIndex + 1][pointIndex];
        }

        if (area[rowIndex][pointIndex - 1]) {
          area[rowIndex][pointIndex].neighbour_W = area[rowIndex][pointIndex - 1];
        }
      }
    }
  }

  private setupArea(stringRows: string[]): Point[][] {
    const area: Point[][] = [];
    stringRows.forEach((_row) => {
      area.push([]);
    })

    for (let rowIndex = 0; rowIndex < stringRows.length; rowIndex++) {
      const rowAsNumbers: number[] = stringRows[rowIndex].split("").map(this.parseCharToNumber)
      for (let pointIndex = 0; pointIndex < stringRows[rowIndex].length; pointIndex++) {
        const isEndPoint = stringRows[rowIndex][pointIndex] === "E";
        if (isEndPoint) {
          this.endPointX = rowIndex;
          this.endPointY = pointIndex;
        }
        if (stringRows[rowIndex][pointIndex] === "S") {
          this.startingPointX = rowIndex;
          this.startingPointY = pointIndex;
        }
        area[rowIndex][pointIndex] = new Point(pointIndex, rowIndex, rowAsNumbers[pointIndex], isEndPoint);
      }
    }
    this.addReferences(area);
    return area;
  }

  private parseCharToNumber(char: string): number {
    let charCode = char;
    if (char === "S") {
      charCode = "a";
    }
    if (char === "E") {
      charCode = "z";
    }

    // a = 0
    return charCode.charCodeAt(0) - 97;
  }
}

