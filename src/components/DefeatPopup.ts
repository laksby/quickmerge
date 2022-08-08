import { sound } from '@pixi/sound';
import { GameComponent } from '../core';
import { Button, Image, LayoutV, Message } from './common';

export class DefeatPopup extends GameComponent {
  private isGreet = false;

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
        gap: 128,
        elements: [
          new Message({
            width: 360,
            height: 360,
            fill: 'fail',
          }),
          new Button({
            width: 300,
            height: 64,
            text: 'TRY AGAIN',
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
    );

    this.root.visible = false;
  }

  public update() {
    this.root.visible = this.state.isDefeat;

    if (this.root.visible) {
      if (this.isGreet) {
        sound.play('defeat');
        this.isGreet = false;
      }
    } else {
      this.isGreet = true;
    }
  }

  private onTryAgainClick() {
    this.state.startGame();
  }
}
