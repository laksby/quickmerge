import { Progress, UIElement } from './common';

export class TimingBar extends UIElement {
  private progress: Progress;

  public start() {
    super.start();

    this.addChildren(
      new Progress({
        name: 'progress',
        width: this.width,
        height: 12,
        cornerRadius: 4,
        fill: 0xffffff,
        indicator: 0x80be1f,
        max: this.state.timeLimit,
      }),
    );

    this.progress = this.findByName('progress');
  }

  public update(delta: number) {
    super.update(delta);

    if (this.state.isPlaying) {
      this.state.updateTime(delta);
    }

    this.progress.set(this.state.time);
    this.progress.setMax(this.state.timeLimit);
  }
}
