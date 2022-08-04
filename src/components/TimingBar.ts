import { Component, Style } from '../core';
import * as PIXI from 'pixi.js';

export class TimingBar extends Component {
  private background: PIXI.Graphics;
  private progressIndicator: PIXI.Graphics;

  public getStyle(): Style {
    const padding = 16;
    const height = 16;

    return {
      x: padding,
      y: this.app.view.height - padding - height,
      width: this.app.view.width - padding * 2,
      height,
    };
  }

  public createRootObject() {
    this.background = new PIXI.Graphics();
    this.progressIndicator = new PIXI.Graphics();

    this.background.beginFill(0xffffff);
    this.background.drawRect(this.style.x, this.style.y, this.style.width, this.style.height);
    this.background.endFill();

    const rootObject = new PIXI.Container();
    rootObject.addChild(this.background);
    rootObject.addChild(this.progressIndicator);

    return rootObject;
  }

  public start() {
    setInterval(() => {
      if (this.state.isPlaying) {
        this.state.updateTime();
      }
    }, this.state.timeStep);
  }

  public update() {
    const step = this.style.width / this.state.timeLimit;

    this.progressIndicator.beginFill(0x00ff00);
    this.progressIndicator.drawRect(this.style.x, this.style.y, this.state.time * step, this.style.height);
    this.progressIndicator.endFill();

    if (this.state.isVictory) {
      console.log('Victory');
    }

    if (this.state.isDefeat) {
      console.log('Defeat');
    }
  }
}
