import { Progress, UIElement } from './common';

export class TimingBar extends UIElement {
  private progress: Progress;

  public start() {
    super.start();

    this.progress = this.child(
      new Progress({
        width: this.width,
        height: this.height,
        fill: 0xffffff,
        indicator: 0x00ff00,
        max: this.state.timeLimit,
      }),
    );
  }

  public update(delta: number) {
    super.update(delta);

    if (this.state.isPlaying) {
      this.state.updateTime(delta);
    }

    this.progress.set(this.state.time);
  }
}
