import { GameComponent } from '../core';
import { Button, Message, LayoutV, Image } from './common';

export class IntroPopup extends GameComponent {
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
        gap: -32,
        elements: [
          new Message({
            width: 500,
            height: 128,
            fill: 'panel',
            text: 'MERGE ALL SIMILAR ITEMS BEFORE TIME RUNS OUT',
            textOffset: -12,
            style: {
              fill: 0x687164,
              fontFamily: 'Chango',
              fontSize: 24,
              align: 'center',
              wordWrap: true,
              wordWrapWidth: 480,
            },
          }),
          new Button({
            width: 200,
            height: 64,
            text: 'START',
            textOffset: -4,
            fill: 'button',
            style: {
              fill: 0xffffff,
              fontFamily: 'Chango',
              fontSize: 32,
            },
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
