import { GameComponent } from '../core';
import { Board } from './Board';
import { LayoutV } from './common';
import { ScoreBar } from './ScoreBar';
import { TimingBar } from './TimingBar';

export class MainScreen extends GameComponent {
  public start() {
    this.child(
      new LayoutV({
        width: this.viewport.width,
        height: this.viewport.height,
        gap: 8,
        elements: [
          new ScoreBar({
            width: 400,
            height: 32,
          }),
          new Board({
            width: 400,
            height: 400,
            gap: 8,
          }),
          new TimingBar({
            width: 400,
            height: 8,
          }),
        ],
      }),
    );
  }
}
