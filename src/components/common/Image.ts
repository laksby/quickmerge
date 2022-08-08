import * as PIXI from 'pixi.js';
import { UIElement, UIElementOptions } from './UIElement';

export interface ImageOptions extends UIElementOptions {
  anchorX?: number;
  anchorY?: number;
  image: string;
  tiling?: boolean;
}

export class Image extends UIElement<ImageOptions> {
  private sprite: PIXI.Sprite;

  public start() {
    super.start();

    const texture = this.resource(this.options.image).texture as PIXI.Texture;

    this.sprite = this.options.tiling
      ? new PIXI.TilingSprite(texture, texture?.width, texture?.height)
      : new PIXI.Sprite(texture);

    this.sprite.width = this.width || this.sprite.width;
    this.sprite.height = this.height || this.sprite.height;
    this.sprite.anchor.set(this.options.anchorX, this.options.anchorY);
    this.sprite.interactive = true;

    this.root.addChild(this.sprite);
  }
}
