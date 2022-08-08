import { GameComponent } from '../core';
import { Board } from './Board';
import { Image, LayoutV } from './common';
import { LevelBar } from './LevelBar';
import { ScoreBar } from './ScoreBar';
import { TimingBar } from './TimingBar';

export class MainScreen extends GameComponent {
  public start() {
    this.addChildren(
      new Image({
        x: this.viewport.width / 2,
        y: this.viewport.height / 2,
        anchorX: 0.5,
        anchorY: 0.5,
        image: 'background',
      }),
      new LayoutV({
        width: this.viewport.width,
        height: this.viewport.height,
        gap: 8,
        elements: [
          new LevelBar({
            width: 400,
            height: 32,
          }),
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
          }),
        ],
      }),
    );
  }
}
