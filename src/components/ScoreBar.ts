import { Image, Label, LayoutH, LayoutHAlign, Message, UIElement } from './common';

export class ScoreBar extends UIElement {
  private counter: Message;

  public start() {
    this.addChildren(
      new LayoutH({
        width: this.width,
        height: this.height,
        align: LayoutHAlign.MiddleLeft,
        gap: 8,
        elements: [
          new Image({
            width: 14,
            height: 10,
            image: 'bullet',
          }),
          new Label({
            width: 96,
            height: 24,
            text: 'TOTAL',
            style: {
              fill: 0xffffff,
              fontFamily: 'Chango',
              fontSize: 20,
              dropShadow: true,
              dropShadowColor: 0x1ea7e1,
              dropShadowDistance: 2,
            },
          }),
          new Message({
            name: 'counter',
            width: 28,
            height: 28,
            fill: 'panel_micro',
            text: '0',
            style: {
              fill: 0x1ea7e1,
              fontFamily: 'Chango',
              fontSize: 18,
            },
          }),
        ],
      }),
    );

    this.counter = this.findByName('counter');
  }

  public update(delta: number) {
    super.update(delta);

    this.counter.setText(this.state.score.toString());
  }
}
