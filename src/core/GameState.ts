export interface GameOptions {
  timeLimit: number;
}

export enum GamePhase {
  Intro = 0,
  Playing = 1,
  Victory = 2,
  Defeat = 3,
}

export class GameState {
  public phase: GamePhase;
  public score: number;
  public time: number;
  public timeLimit: number;

  constructor(options: GameOptions) {
    this.phase = GamePhase.Intro;
    this.score = 0;
    this.time = 0;
    this.timeLimit = options.timeLimit;
  }

  public get isIntro() {
    return this.phase === GamePhase.Intro;
  }

  public get isPlaying() {
    return this.phase === GamePhase.Playing;
  }

  public get isVictory() {
    return this.phase === GamePhase.Victory;
  }

  public get isDefeat() {
    return this.phase === GamePhase.Defeat;
  }

  public startGame() {
    this.phase = GamePhase.Playing;
    this.score = 0;
    this.time = 0;
  }

  public updateTime(timeStep: number) {
    this.time += timeStep;

    if (this.time >= this.timeLimit) {
      this.phase = GamePhase.Defeat;
    }
  }

  public tryMerge() {
    this.phase = GamePhase.Victory;
  }
}
