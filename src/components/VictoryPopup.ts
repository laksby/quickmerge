import { GameComponent } from '../core';
import { Button, LayoutV, Message } from './common';

export class VictoryPopup extends GameComponent {
  public start() {
    this.child(
      new LayoutV({
        width: this.viewport.width,
        height: this.viewport.height,
        gap: 128,
        elements: [
          new Message({
            width: 640,
            height: 128,
            fill: 0x00ff00,
            text: 'Nice Work!',
            style: { fill: 0x000000, fontSize: 48 },
          }),
          new Button({
            width: 256,
            height: 64,
            fill: 0xffffff,
            text: 'Play Again',
            style: { fill: 0x000000, fontSize: 24 },
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
