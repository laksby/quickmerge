import { makeAutoObservable } from 'mobx';

export interface GameOptions {
  timeStep: number;
  timeLimit: number;
}

export enum GamePhase {
  Initial = 0,
  Playing = 1,
  Victory = 2,
  Defeat = 3,
}

export class GameState {
  public phase: GamePhase;
  public score: number;
  public time: number;
  public timeStep: number;
  public timeLimit: number;

  constructor(options: GameOptions) {
    this.phase = GamePhase.Initial;
    this.score = 0;
    this.time = 0;
    this.timeStep = options.timeStep;
    this.timeLimit = options.timeLimit;

    makeAutoObservable(this);
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

  public updateTime() {
    this.time += this.timeStep;

    if (this.time >= this.timeLimit) {
      this.phase = GamePhase.Defeat;
    }
  }
}
