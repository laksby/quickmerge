import * as PIXI from 'pixi.js';
import { UIElement, UIElementOptions } from './UIElement';

export interface LabelOptions extends UIElementOptions {
  text: string;
  style?: Partial<PIXI.ITextStyle>;
}

export class Label extends UIElement<LabelOptions> {
  private text: PIXI.Text;

  public start() {
    super.start();

    this.text = new PIXI.Text(this.options.text, this.options.style);

    this.text.x = 0;
    this.text.y = this.height / 2;
    this.text.anchor.set(0, 0.5);

    this.root.addChild(this.text);
  }
}
