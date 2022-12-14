import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";

export enum ContentTypes {
  AIR = ".", ROCK = "#", SAND = "o"
}

export class Point_14 {

  constructor(public x: number, public y: number, public content: ContentTypes) {
  }
}

@Component({
  selector: 'app-day14',
  templateUrl: './day14.component.html',
  styleUrls: ['./day14.component.scss']
})
export class Day14Component implements OnInit {
  area: Point_14[][] = [];

  loesung_1 = 0;
  loesung_2 = 0;
  private sandCounter: number = 0;

  constructor(private dataService: DataService) {
  }

  highestRockY = 0;


  ngOnInit() {
    this.dataService.getDataOfDay("14").subscribe((data) => {
      // part1
      this.initArea(200, 200);
      this.drawRocks(data, 400);

      //part2
      const abweichung = 300;
      let sandStartingpointX: number = 500 - abweichung;
      const sandStartingpointY: number = 0;

      const maxX = sandStartingpointX * 2;
      this.initArea(maxX, this.highestRockY + 1);
      this.drawRocks(data, abweichung);
      this.addFloor(maxX);


      while (this.area[sandStartingpointX][sandStartingpointY].content != ContentTypes.SAND) {
        let startPoint = this.findFirstPointThatHitsResistance(sandStartingpointX, sandStartingpointY);
        this.tryPlacingSand(startPoint);
        this.loesung_2++;
      }

      this.loesung_1 = this.sandCounter;
    })
  }

  private addFloor(maxX: number) {
    for (let x = 0; x < maxX; x++) {
      this.area[x][this.highestRockY].content = ContentTypes.ROCK;
    }
  }

  private findFirstPointThatHitsResistance(startX: number, startY: number) {

    let currentPoint = this.area[startX][startY];
    while (this.area[currentPoint.x][currentPoint.y + 1].content === ContentTypes.AIR) {
      currentPoint = this.area[currentPoint.x][currentPoint.y + 1];
    }
    return currentPoint;
  }

  tryPlacingSand(currentPoint: Point_14): boolean {
    if (currentPoint.y === 199) {
      return false;
    }

    const linksUnten = this.area[currentPoint.x - 1][currentPoint.y + 1]
    const linksUntenIstBelegt = linksUnten.content === ContentTypes.SAND || linksUnten.content === ContentTypes.ROCK;
    const mitteUnten = this.area[currentPoint.x][currentPoint.y + 1]
    const mitteUntenIstBelegt = mitteUnten.content === ContentTypes.SAND || mitteUnten.content === ContentTypes.ROCK;
    const rechtsUnten = this.area[currentPoint.x + 1][currentPoint.y + 1]
    const rechtsUntenIstBelegt = rechtsUnten.content === ContentTypes.SAND || rechtsUnten.content === ContentTypes.ROCK;

    if (linksUntenIstBelegt && mitteUntenIstBelegt && rechtsUntenIstBelegt) {
      this.sandCounter++;
      // console.log("inc sand ocunter")
      currentPoint.content = ContentTypes.SAND;
      return true;
    }

    // try going down
    if (!mitteUntenIstBelegt) {
      return this.tryPlacingSand(mitteUnten);
    }

    // try left
    if (!linksUntenIstBelegt) {
      return this.tryPlacingSand(linksUnten);
    }

    // try right
    return this.tryPlacingSand(rechtsUnten);
  }

  private drawRocks(data: string, abweichung: number) {
    const lineStrings: string[] = data.split("\r\n").slice(0, -1);
    const lines = lineStrings.map((lineString) => lineString.split(" -> ").map((pointStr) => {
      const coords: number[] = pointStr.split(",").map(str => Number.parseInt(str));
      return [coords[0] - abweichung, coords[1]];
    }))

    for (let line of lines) {
      for (let i = 0; i < line.length - 1; i++) {
        const xIsEqual = line[i][0] === line[i + 1][0];

        this.highestRockY = Math.max(line[i][1] + 2, this.highestRockY);

        if (xIsEqual) {
          // draw vertical line
          const yStart = Math.min(line[i][1], line[i + 1][1]);
          const yEnd = Math.max(line[i][1], line[i + 1][1]);
          for (let y = yStart; y <= yEnd; y++) {
            this.area[line[i][0]][y].content = ContentTypes.ROCK;
          }
        } else {
          // draw horizontal Line
          const xStart = Math.min(line[i][0], line[i + 1][0]);
          const xEnd = Math.max(line[i][0], line[i + 1][0]);
          for (let x = xStart; x <= xEnd; x++) {
            this.area[x][line[i][1]].content = ContentTypes.ROCK;
          }
        }
      }
    }
  }

  private initArea(maxX: number, maxY: number) {
    for (let x = 0; x < maxX; x++) {
      this.area[x] = [];
      for (let y = 0; y < maxY; y++) {
        this.area[x][y] = new Point_14(x, y, ContentTypes.AIR)
      }
    }
  }
}
