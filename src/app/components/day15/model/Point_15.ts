import {Day15Component} from "../day15.component";

export class Point_15 {
  public closestBeacon?: Point_15;

  constructor(public x: number, public y: number) {
  }

  calcDistanceToClosestBeacon(): number {
    if (!this.closestBeacon) {
      console.error("calcDistanceToClosestBeacon");
      return -1;
    }
    return Day15Component.calcDistance(this, this.closestBeacon);
  }

  isSamePoint(otherPoint: Point_15) {
    return this.x === otherPoint.x && this.y === otherPoint.y;
  }

  isASensorOrBeaconFromList(sensorWithBeaconList: Point_15[]) {
    for (let sensorWithBeacon of sensorWithBeaconList) {
      if (this.isSamePoint(sensorWithBeacon) || this.isSamePoint(sensorWithBeacon.closestBeacon!)) {
        return true;
      }
    }
    return false;
  }

  blockedAreaInRow(rowIndex: number) {
    const totalBlockedDistance = this.calcDistanceToClosestBeacon();

    const verticalDistanceToRow = Math.abs(this.y - rowIndex);
    const remainingDistanceAfterGoingToRow = totalBlockedDistance - verticalDistanceToRow;
    if (remainingDistanceAfterGoingToRow < 0) {
      return {start: -1, end: -1};
    }

    if (remainingDistanceAfterGoingToRow === 0) {
      return {start: this.x, end: this.x};
    }
    const startOfBlockedAreaInRow = this.x - remainingDistanceAfterGoingToRow;
    const endOfBlockedAreaInRow = this.x + remainingDistanceAfterGoingToRow;
    return {start: startOfBlockedAreaInRow, end: endOfBlockedAreaInRow};
  }

}
