import * as PIXI from 'pixi.js';
import { UIElement, UIElementOptions } from './UIElement';

export interface MessageOptions extends UIElementOptions {
  fill: number | string;
  text?: string;
  textOffset?: number;
  style?: Partial<PIXI.ITextStyle>;
}

export class Message extends UIElement<MessageOptions> {
  private background: PIXI.Graphics | PIXI.Sprite;
  private message: PIXI.Text;

  public get textOffset() {
    return this.options.textOffset ?? 0;
  }

  public setText(text: string) {
    this.message.text = text;
  }

  public start() {
    super.start();

    if (typeof this.options.fill === 'string') {
      const texture = this.resource(this.options.fill).texture as PIXI.Texture;

      this.background = new PIXI.Sprite(texture);

      this.background.width = this.width;
      this.background.height = this.height;
      this.background.x = this.width / 2;
      this.background.y = this.height / 2;
      this.background.anchor.set(0.5, 0.5);
    } else {
      this.background = new PIXI.Graphics();

      this.background.beginFill(this.options.fill);
      this.background.drawRect(0, 0, this.width, this.height);
      this.background.endFill();
    }

    this.message = new PIXI.Text(this.options.text, this.options.style);

    this.message.x = this.width / 2;
    this.message.y = this.height / 2 + this.textOffset;
    this.message.anchor.set(0.5, 0.5);

    this.root.addChild(this.background);
    this.root.addChild(this.message);
  }
}
