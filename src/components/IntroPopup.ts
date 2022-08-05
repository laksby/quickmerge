import { GameComponent } from '../core';
import { Button, Message, LayoutV } from './common';

export class IntroPopup extends GameComponent {
  public start() {
    this.child(
      new LayoutV({
        width: this.viewport.width,
        height: this.viewport.height,
        gap: 32,
        elements: [
          new Message({
            width: 640,
            height: 128,
            fill: 0xffffff,
            text: 'Merge all items',
            style: { fill: 0x000000, fontSize: 24 },
          }),
          new Button({
            width: 256,
            height: 64,
            fill: 0xffffff,
            text: 'Start',
            style: { fill: 0x000000, fontSize: 24 },
            onClick: () => this.onStartClick(),
          }),
        ],
      }),
    );

    this.root.visible = false;
  }

  public update() {
    this.root.visible = this.state.isIntro;
  }

  private onStartClick() {
    this.state.startGame();
  }
}
