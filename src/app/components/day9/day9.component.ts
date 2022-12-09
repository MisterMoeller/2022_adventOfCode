import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";

export class Point {
  constructor(public x: number, public y: number) {
  }
}

@Component({
  selector: 'app-day9',
  templateUrl: './day9.component.html',
  styleUrls: ['./day9.component.scss']
})
export class Day9Component implements OnInit {
  loesung_1 = 0;
  loesung_2 = 0;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getDataOfDay("9").subscribe(data => {
      const movementOrders = data.split("\r\n").slice(0, -1);
      this.loesung_1 = this.doPart1(movementOrders);
      this.loesung_2 = this.doPart2(movementOrders);
    })
  }

  private doPart1(movementOrders: string[]) {
    const visitedPlacesByTail: Set<string> = new Set(["1000,1000"]);

    const positionHead = new Point(1000, 1000)
    const positionTail = new Point(1000, 1000);

    movementOrders.forEach(order => {
      const splitOrder = order.split(" ");
      const direction = splitOrder[0];
      const amount = Number.parseInt(splitOrder[1]);

      for (let i = 0; i < amount; i++) {
        this.moveHeadInDirektion(direction, positionHead);

        if (this.isHeadTooFar(positionHead, positionTail)) {
          this.handleHeadTooFar(positionHead, positionTail);
          visitedPlacesByTail.add(`${positionTail.x},${positionTail.y}`);
        }
      }
    })
    return visitedPlacesByTail.size;
  }

  private doPart2(movementOrders: string[]) {
    const visitedPlacesByTail: Set<string> = new Set(["1000,1000"]);

    const positionHead = new Point(1000, 1000)
    const position_1 = new Point(1000, 1000)
    const position_2 = new Point(1000, 1000)
    const position_3 = new Point(1000, 1000)
    const position_4 = new Point(1000, 1000)
    const position_5 = new Point(1000, 1000)
    const position_6 = new Point(1000, 1000)
    const position_7 = new Point(1000, 1000)
    const position_8 = new Point(1000, 1000)
    const positionTail = new Point(1000, 1000);

    movementOrders.forEach(order => {
      const splitOrder = order.split(" ");
      const direction = splitOrder[0];
      const amount = Number.parseInt(splitOrder[1]);

      for (let i = 0; i < amount; i++) {
        this.moveHeadInDirektion(direction, positionHead);

        if (this.isHeadTooFar(positionHead, position_1)) {
          this.handleHeadTooFar(positionHead, position_1);
        }
        if (this.isHeadTooFar(position_1, position_2)) {
          this.handleHeadTooFar(position_1, position_2);
        }
        if (this.isHeadTooFar(position_2, position_3)) {
          this.handleHeadTooFar(position_2, position_3);
        }
        if (this.isHeadTooFar(position_3, position_4)) {
          this.handleHeadTooFar(position_3, position_4);
        }
        if (this.isHeadTooFar(position_4, position_5)) {
          this.handleHeadTooFar(position_4, position_5);
        }
        if (this.isHeadTooFar(position_5, position_6)) {
          this.handleHeadTooFar(position_5, position_6);
        }
        if (this.isHeadTooFar(position_6, position_7)) {
          this.handleHeadTooFar(position_6, position_7);
        }
        if (this.isHeadTooFar(position_7, position_8)) {
          this.handleHeadTooFar(position_7, position_8);
        }
        if (this.isHeadTooFar(position_8, positionTail)) {
          this.handleHeadTooFar(position_8, positionTail);
          visitedPlacesByTail.add(`${positionTail.x},${positionTail.y}`);
        }
      }
    })
    return visitedPlacesByTail.size;
  }

  private moveHeadInDirektion(direction: string, positionHead: Point) {
    if (direction.includes("U")) {
      positionHead.y++;
    }
    if (direction.includes("R")) {
      positionHead.x++;
    }
    if (direction.includes("D")) {
      positionHead.y--;
    }
    if (direction.includes("L")) {
      positionHead.x--;
    }
  }

  private isHeadTooFar(head: Point, tail: Point): boolean {
    if (Math.abs(head.x - tail.x) > 1) {
      return true
    }
    if (Math.abs(head.y - tail.y) > 1) {
      return true
    }
    return false
  }

  private handleHeadTooFar(head: Point, tail: Point): Point {
    if (head.x === tail.x) {
      tail.y > head.y ? tail.y-- : tail.y++
    } else if (head.y === tail.y) {
      tail.x > head.x ? tail.x-- : tail.x++;
    } else

      /*
       #-1
      #---2
      --T--
      #---3
       #-4
      */
    if (head.x > tail.x) {
      // 1-4
      if (head.y > tail.y) {
        // 1+2
        tail.x++
        tail.y++
      } else {
        // 3+4
        tail.x++
        tail.y--
      }
    } else if (head.x < tail.x) {
      if (head.y > tail.y) {
        tail.x--
        tail.y++
      } else {
        tail.x--
        tail.y--
      }
    }
    return tail;
  }

}
