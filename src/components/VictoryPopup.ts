import { GameComponent } from '../core';
import { Button, Image, LayoutV, Message } from './common';

export class VictoryPopup extends GameComponent {
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
            text: 'PLAY AGAIN',
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
    this.root.visible = this.state.isVictory;
  }

  private onTryAgainClick() {
    this.state.startGame();
  }
}
