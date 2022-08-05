import { GameComponent } from '../core';
import * as PIXI from 'pixi.js';

export class TimingBar extends GameComponent {
  private width = 640;
  private height = 8;
  private margin = 16;
  private background: PIXI.Graphics;
  private indicator: PIXI.Graphics;

  public start() {
    this.background = new PIXI.Graphics();
    this.indicator = new PIXI.Graphics();

    this.root.x = (this.viewport.width - this.width) / 2;
    this.root.y = this.viewport.height - this.height - this.margin;

    this.background.beginFill(0xffffff);
    this.background.drawRect(0, 0, this.width, this.height);
    this.background.endFill();

    this.background.addChild(this.indicator);
    this.root.addChild(this.background);
  }

  public update(delta: number) {
    if (this.state.isPlaying) {
      this.state.updateTime(delta);
    }

    const step = this.width / this.state.timeLimit;

    this.indicator.clear();
    this.indicator.beginFill(0x00ff00);
    this.indicator.drawRect(0, 0, Math.min(this.state.time * step, this.width), this.height);
    this.indicator.endFill();
  }
}
