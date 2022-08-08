import * as PIXI from 'pixi.js';
import { sound } from '@pixi/sound';
import { GameComponent } from '../core';
import { Button, Image, LayoutV, Message } from './common';
import { ParticleExplosion } from './ParticleExplosion';

export class VictoryPopup extends GameComponent {
  private isGreet = false;
  private victoryExplosion: ParticleExplosion;

  public start() {
    this.addChildren(
      new Image({
        image: 'overlay_tile',
        width: this.viewport.width,
        height: this.viewport.height,
      }),
      new LayoutV({
        width: this.viewport.width,
        height: this.viewport.height,
        gap: 100,
        elements: [
          new Message({
            width: 360,
            height: 360,
            fill: 'success',
          }),
          new Button({
            width: 300,
            height: 64,
            text: 'NEXT LEVEL',
            textOffset: -4,
            fill: 'button_wide',
            style: {
              fill: 0xffffff,
              fontFamily: 'Chango',
              fontSize: 32,
            },
            onClick: () => this.onTryAgainClick(),
          }),
        ],
      }),
      new ParticleExplosion({
        name: 'victoryExplosion',
      }),
    );

    this.victoryExplosion = this.findByName('victoryExplosion');

    this.root.visible = false;
  }

  public update() {
    this.root.visible = this.state.isVictory;

    if (this.root.visible) {
      if (this.isGreet) {
        sound.play('victory');
        this.fireworks();
        this.isGreet = false;
      }
    } else {
      this.isGreet = true;
    }
  }

  private onTryAgainClick() {
    this.state.startGame();
  }

  private fireworks() {
    const count = 5;

    const points = new Array(count).fill(null).map(() => {
      const x = Math.random() * this.viewport.width;
      const y = Math.random() * this.viewport.height;
      return new PIXI.Point(x, y);
    });

    this.victoryExplosion.enqueue(points, 500);
  }
}
