import * as PIXI from 'pixi.js';
import { UIElement, UIElementOptions } from './UIElement';

export interface ProgressOptions extends UIElementOptions {
  fill: number;
  indicator: number;
  max: number;
  value?: number;
}

export class Progress extends UIElement<ProgressOptions> {
  private background: PIXI.Graphics;
  private indicator: PIXI.Graphics;

  public get value() {
    return this.options.value ?? 0;
  }

  public get max() {
    return this.options.max;
  }

  public set(value: number) {
    this.options.value = value;
  }

  public start() {
    super.start();

    this.background = new PIXI.Graphics();
    this.indicator = new PIXI.Graphics();

    this.background.beginFill(this.options.fill);
    this.background.drawRect(0, 0, this.options.width, this.options.height);
    this.background.endFill();

    this.background.addChild(this.indicator);
    this.root.addChild(this.background);
  }

  public update(delta: number) {
    super.update(delta);

    const step = this.width / this.max;

    this.indicator.clear();
    this.indicator.beginFill(this.options.indicator);
    this.indicator.drawRect(0, 0, Math.min(this.value * step, this.width), this.height);
    this.indicator.endFill();
  }
}
