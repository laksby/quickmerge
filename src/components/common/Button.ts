import * as PIXI from 'pixi.js';
import { sound } from '@pixi/sound';
import { UIElement, UIElementOptions } from './UIElement';

export interface ButtonOptions extends UIElementOptions {
  fill?: number | string;
  text?: string;
  textOffset?: number;
  clickSound?: string;
  style?: Partial<PIXI.ITextStyle>;
  onClick(): void;
}

export class Button extends UIElement<ButtonOptions> {
  private background: PIXI.Graphics | PIXI.Sprite;
  private label: PIXI.Text;

  public get textOffset() {
    return this.options.textOffset ?? 0;
  }

  public get clickSound() {
    return this.options.clickSound ?? 'click';
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

    this.label = new PIXI.Text(this.options.text, this.options.style);

    this.background.interactive = true;
    this.background.buttonMode = true;
    this.background.on('pointerdown', this.onPointerDown, this);
    this.background.on('pointerover', this.onPointerOver, this);
    this.background.on('pointerout', this.onPointerOut, this);

    this.label.x = this.width / 2;
    this.label.y = this.height / 2 + this.textOffset;
    this.label.anchor.set(0.5, 0.5);

    this.root.addChild(this.background);
    this.root.addChild(this.label);
  }

  private onPointerDown() {
    sound.play(this.clickSound);
    this.options.onClick();
  }

  private onPointerOver() {
    this.background.tint = 0xeeeeee;
  }

  private onPointerOut() {
    this.background.tint = 0xffffff;
  }
}
