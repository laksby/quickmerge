import * as PIXI from 'pixi.js';
import { UIElement, UIElementOptions } from './UIElement';

export interface MessageOptions extends UIElementOptions {
  fill: number;
  text?: string;
  style?: Partial<PIXI.ITextStyle>;
}

export class Message extends UIElement<MessageOptions> {
  private background: PIXI.Graphics;
  private message: PIXI.Text;

  public start() {
    super.start();

    this.background = new PIXI.Graphics();
    this.message = new PIXI.Text(this.options.text, this.options.style);

    this.background.beginFill(this.options.fill);
    this.background.drawRect(0, 0, this.options.width, this.options.height);
    this.background.endFill();

    this.message.x = this.options.width / 2;
    this.message.y = this.options.height / 2;
    this.message.anchor.set(0.5, 0.5);

    this.background.addChild(this.message);
    this.root.addChild(this.background);
  }
}
