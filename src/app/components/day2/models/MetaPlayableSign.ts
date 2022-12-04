import {Outcomes, SignNames} from "../day2.component";

export class MetaPlayableSign {
  constructor(sign: SignNames) {
    switch (sign) {
      case SignNames.ROCK: {
        this.name = sign;
        this.winsAgainst = SignNames.SCISSOR;
        this.loseAgainst = SignNames.PAPER;
        break;
      }
      case SignNames.PAPER: {
        this.name = sign;
        this.winsAgainst = SignNames.ROCK;
        this.loseAgainst = SignNames.SCISSOR;
        break;
      }
      default: {
        this.name = sign;
        this.winsAgainst = SignNames.PAPER;
        this.loseAgainst = SignNames.ROCK;
        break;
      }
    }
  }

  name = SignNames.PAPER;
  winsAgainst = SignNames.ROCK
  loseAgainst = SignNames.SCISSOR

  getSignToReachOutcomeAgainstThisSign(outCome: Outcomes): SignNames {
    switch (outCome) {
      case Outcomes.DRAW: {
        return this.name;
      }
      case Outcomes.WIN: {
        return this.loseAgainst
      }
      default: {
        return this.winsAgainst
      }
    }
  }

  playVsSign(signName: SignNames): Outcomes {
    switch (signName) {
      case this.loseAgainst: {
        return Outcomes.LOSE;
      }
      case this.winsAgainst: {
        return Outcomes.WIN;
      }
      default: {
        return Outcomes.DRAW;
      }
    }
  }
}
