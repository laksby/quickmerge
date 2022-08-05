import * as PIXI from 'pixi.js';
import { UIElement, UIElementOptions } from './UIElement';

export interface ButtonOptions extends UIElementOptions {
  fill: number;
  text?: string;
  style?: Partial<PIXI.ITextStyle>;
  onClick(): void;
}

export class Button extends UIElement<ButtonOptions> {
  private background: PIXI.Graphics;
  private label: PIXI.Text;

  public start() {
    super.start();

    this.background = new PIXI.Graphics();
    this.label = new PIXI.Text(this.options.text, { align: 'center', ...this.options.style });

    this.background.beginFill(this.options.fill);
    this.background.drawRect(0, 0, this.options.width, this.options.height);
    this.background.endFill();
    this.background.interactive = true;
    this.background.buttonMode = true;
    this.background.on('pointerdown', this.options.onClick);

    this.label.x = this.options.width / 2;
    this.label.y = this.options.height / 2;
    this.label.anchor.set(0.5, 0.5);

    this.background.addChild(this.label);
    this.root.addChild(this.background);
  }
}
