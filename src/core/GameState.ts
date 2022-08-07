export interface GameOptions {
  timeLimit: number;
  cols: number;
  rows: number;
  itemCodes: number[];
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
  public cols: number;
  public rows: number;
  public itemCodes: number[];
  public items: (number | null)[][];

  constructor(options: GameOptions) {
    this.phase = GamePhase.Intro;
    this.score = 0;
    this.time = 0;
    this.timeLimit = options.timeLimit;
    this.cols = options.cols;
    this.rows = options.rows;
    this.itemCodes = options.itemCodes;
    this.items = new Array(this.cols).fill(null).map(() => new Array(this.rows).fill(null));
    this.generate();
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
    this.generate();
  }

  public updateTime(timeStep: number) {
    this.time += timeStep;

    if (this.time >= this.timeLimit) {
      this.phase = GamePhase.Defeat;
    }
  }

  public tryMerge(sourceX: number, sourceY: number, targetX: number, targetY: number): boolean {
    const source = this.items[sourceX][sourceY];
    const target = this.items[targetX][targetY];

    if (source === target) {
      this.items[sourceX][sourceY] = null;
      this.items[targetX][targetY] = null;
      this.score++;

      const hasItems = this.items.flat().some(item => item !== null);

      if (!hasItems) {
        this.phase = GamePhase.Victory;
      }

      return true;
    }

    return false;
  }

  private generate() {
    const pool: number[] = [];
    let pairCount = (this.cols * this.rows) / 2;
    let codeIndex = 0;

    while (pairCount > 0) {
      pool.push(this.itemCodes[codeIndex]);
      pool.push(this.itemCodes[codeIndex]);

      codeIndex++;
      pairCount--;

      if (codeIndex >= this.itemCodes.length) {
        codeIndex = 0;
      }
    }

    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.items[i][j] = pool[j + i * this.cols];
      }
    }
  }
}
