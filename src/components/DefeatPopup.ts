import { sound } from '@pixi/sound';
import { GameComponent } from '../core';
import { Button, Image, Label, LayoutV, Message } from './common';

export class DefeatPopup extends GameComponent {
  private isGreet = false;
  private score: Message;

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
        gap: 32,
        elements: [
          new Message({
            width: 360,
            height: 360,
            fill: 'fail',
          }),
          new LayoutV({
            width: 420,
            height: 360,
            gap: -32,
            elements: [
              new Message({
                name: 'score',
                width: 420,
                height: 128,
                fill: 'panel',
                text: '',
                textOffset: -8,
                style: {
                  fill: 0x687164,
                  fontFamily: 'Chango',
                  fontSize: 26,
                  align: 'center',
                  wordWrap: true,
                  wordWrapWidth: 380,
                },
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
        ],
      }),
    );

    this.score = this.findByName('score');

    this.root.visible = false;
  }

  public update() {
    this.root.visible = this.state.isDefeat;

    if (this.root.visible) {
      if (this.isGreet) {
        sound.play('defeat');
        this.score.setText(`Congratulations!\nYou reached level ${this.state.lastLevel}`);
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
