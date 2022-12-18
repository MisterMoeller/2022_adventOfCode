import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Point_15} from "./model/point_15";

@Component({
  selector: 'app-day15',
  templateUrl: './day15.component.html',
  styleUrls: ['./day15.component.scss']
})
export class Day15Component implements OnInit {
  loesung_1 = 0;
  loesung_2 = 0;

  constructor(private dataService: DataService) {
  }

  checkThereCanBeNoBeaconAtPoint(point: Point_15, allSensorsWithBeacons: Point_15[]): boolean {
    for (let sensorWithBeacon of allSensorsWithBeacons) {
      const distancePointToSensor = Day15Component.calcDistance(point, sensorWithBeacon);
      if (distancePointToSensor <= sensorWithBeacon.calcDistanceToClosestBeacon()) {
        return true;
      }
    }
    return false;
  }

  ngOnInit() {
    this.dataService.getDataOfDay("15").subscribe((data) => {
      const parsedData: { sensorsWithBeacons: Point_15[], minX: number, maxX: number } = this.parseToPoint15(data);
      const max = 4000000;

      this.loesung_1 = this.solvePart_1(parsedData);
      this.loesung_2 = this.solvePart_2(max, parsedData);
    });
  }

  private solvePart_2(max: number, parsedData: { sensorsWithBeacons: Point_15[]; minX: number; maxX: number }) {
    for (let y = 0; y < max; y++) {
      const blockedAreasInRow = [];
      for (let sensor of parsedData.sensorsWithBeacons) {
        const blockedArea = sensor.blockedAreaInRow(y);
        blockedAreasInRow.push(blockedArea);
      }

      const filteredBlockedAreasInRow = blockedAreasInRow.filter(x => {
        return x.start <= max && x.end >= 0;
      }).sort((a, b) => a.start - b.start);

      let done = false;
      while (!done) {
        const currentArea = filteredBlockedAreasInRow.shift()!;
        if (currentArea.end >= filteredBlockedAreasInRow[0].start) {
          filteredBlockedAreasInRow[0].start = currentArea.start;
          filteredBlockedAreasInRow[0].end = Math.max(currentArea.end, filteredBlockedAreasInRow[0].end);
        } else {
          return this.calcTuningFrequency(currentArea.end + 1, y);
        }
        done = filteredBlockedAreasInRow.length === 1;
      }
      const rowResult = filteredBlockedAreasInRow[0];
      if (rowResult.start > 0) {
        return this.calcTuningFrequency(0, y);
      }
      if (rowResult.end < max) {
        return this.calcTuningFrequency(max, y);
      }
    }
    return -1;
  }

  private calcTuningFrequency(x: number, y: number): number {
    return (4000000 * x) + y
  }

  private solvePart_1(parsedData: { sensorsWithBeacons: Point_15[]; minX: number; maxX: number }) {
    const lineToLookAt = 2000000;
    const makeFieldBigger = 10000000;
    let pointsWhereNoBeaconCanBe = 0;

    for (let x = parsedData.minX - makeFieldBigger; x <= parsedData.maxX + makeFieldBigger; x++) {
      const thisPoint = new Point_15(x, lineToLookAt);
      if (thisPoint.isASensorOrBeaconFromList(parsedData.sensorsWithBeacons)) {
        // special case don't add
      } else {
        if (this.checkThereCanBeNoBeaconAtPoint(thisPoint, parsedData.sensorsWithBeacons)) {
          pointsWhereNoBeaconCanBe++;
        }
      }

    }
    return pointsWhereNoBeaconCanBe;
  }

  private parseToPoint15(data: string): { sensorsWithBeacons: Point_15[], minX: number, maxX: number } {
    const lineStrings = data.split("\r\n").slice(0, -1);
    const sensorsWithBeacons: Point_15[] = []
    let minX = 9999999999999;
    let maxX = 0;
    lineStrings.forEach(lineString => {
      const sensorAndbeaconString = lineString.split(":");
      const sensorX = Number.parseInt(sensorAndbeaconString[0].split("x=")[1].split(", y")[0]);
      const sensorY = Number.parseInt(sensorAndbeaconString[0].split("y=")[1]);
      const beaconX = Number.parseInt(sensorAndbeaconString[1].split("x=")[1].split(", y")[0]);
      const beaconY = Number.parseInt(sensorAndbeaconString[1].split("y=")[1]);

      minX = Math.min(minX, sensorX, beaconX);
      maxX = Math.max(maxX, sensorX, beaconX);

      const thingToPush = new Point_15(sensorX, sensorY);
      thingToPush.closestBeacon = new Point_15(beaconX, beaconY);
      sensorsWithBeacons.push(thingToPush);
    })
    return {sensorsWithBeacons, minX, maxX};
  }

  public static calcDistance(a: Point_15, b: Point_15): number {
    const deltaX = Math.abs(a.x - b.x);
    const deltaY = Math.abs(a.y - b.y);
    return deltaX + deltaY
  }
}

