import {Component, OnInit} from '@angular/core';
import {realData_2} from "./data";
import {MetaPlayableSign} from "./models/MetaPlayableSign";

export enum Outcomes {
  LOSE = 0, DRAW = 3, WIN = 6
}

export enum SignNames {
  ROCK = 1, PAPER = 2, SCISSOR = 3
}

class PlayedGame {
  constructor(sign_me: MetaPlayableSign, sign_enemy: MetaPlayableSign, expectedOutcome: Outcomes) {
    this.sign_me = sign_me;
    this.sign_Enemy = sign_enemy;
    this.expectedOutcome = expectedOutcome;
  }

  sign_Enemy: MetaPlayableSign;
  sign_me: MetaPlayableSign;
  expectedOutcome: Outcomes;

  getOutcome(): Outcomes {
    return this.sign_me.playVsSign(this.sign_Enemy.name);
  }

  getPoints(): number {
    let result = 0;
    result += this.getOutcome();
    result += this.sign_me.name;
    return result;
  }
}

@Component({
  selector: 'app-day2',
  templateUrl: './day2.component.html',
  styleUrls: ['./day2.component.scss']
})
export class Day2Component implements OnInit {
  totalPointsOfAllGames = 0;
  allGames: PlayedGame[] = [];

  testMethodOutcome(outcome: Outcomes): string {
    return Outcomes[outcome]
  }

  testMethodSignname(signName: SignNames): string {
    return SignNames[signName]
  }

  ngOnInit(): void {
    // const otherParsedDatastring = fs.readFileSync('./data2', "utf8");
    const playedGames = this.parseDataToGame_part2(realData_2);
    this.allGames = playedGames;
    const gamesMappedToPoints = playedGames.map(game => game.getPoints());
    this.totalPointsOfAllGames = gamesMappedToPoints.reduce((prev, cur) => prev + cur)
  }

  private parseDataToGame_part1(data: string): PlayedGame[] {
    return data.split("\n").map(str => {
      const inputs = str.split(" ");
      const mySign = this.toMetaPlayableSign(inputs[1]);
      const signEnemy = this.toMetaPlayableSign(inputs[0]);
      const expectedOutcome = this.toOutcome(inputs[1]);
      return new PlayedGame(mySign, signEnemy, expectedOutcome)
    });
  }

  private parseDataToGame_part2(data: string): PlayedGame[] {
    return data.split("\n").map(str => {
      const inputs = str.split(" ");
      const signEnemy = this.toMetaPlayableSign(inputs[0]);
      const expectedOutcome = this.toOutcome(inputs[1]);
      const mySign = new MetaPlayableSign(signEnemy.getSignToReachOutcomeAgainstThisSign(expectedOutcome));
      return new PlayedGame(mySign, signEnemy, expectedOutcome)
    });
  }

  toMetaPlayableSign(str: string): MetaPlayableSign {
    if (str === 'A' || str === 'X') {
      return new MetaPlayableSign(SignNames.ROCK);
    }
    if (str === 'B' || str === 'Y') {
      return new MetaPlayableSign(SignNames.PAPER);
    }
    return new MetaPlayableSign(SignNames.SCISSOR);
  }

  toOutcome(str: string): Outcomes {
    if (str === 'X') {
      return Outcomes.LOSE;
    }
    if (str === 'Y') {
      return Outcomes.DRAW;
    }
    return Outcomes.WIN;
  }
}
