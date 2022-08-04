import { GameComponent } from '../core';
import * as PIXI from 'pixi.js';

export class IntroPopup extends GameComponent {
  private buttonWidth = 256;
  private buttonHeight = 64;
  private gap = 32;
  private message: PIXI.Text;
  private button: PIXI.Graphics;
  private buttonText: PIXI.Text;

  public start() {
    this.message = new PIXI.Text('Merge all items', { fill: 0xffffff, fontSize: 24 });
    this.button = new PIXI.Graphics();
    this.buttonText = new PIXI.Text('Start', { fill: 0x000000, fontSize: 24 });

    this.root.x = (this.view.width - this.buttonWidth) / 2;
    this.root.y = (this.view.height - this.message.height - this.buttonHeight - this.gap) / 2;

    this.message.x = (this.buttonWidth - this.message.width) / 2;

    this.button.beginFill(0xffffff);
    this.button.drawRect(0, this.message.height + this.gap, this.buttonWidth, this.buttonHeight);
    this.button.endFill();
    this.button.interactive = true;
    this.button.buttonMode = true;
    this.button.on('pointerdown', () => this.onStartClick());

    this.buttonText.x = (this.buttonWidth - this.buttonText.width) / 2;
    this.buttonText.y = this.message.height + this.gap + (this.buttonHeight - this.buttonText.height) / 2;

    this.button.addChild(this.buttonText);
    this.root.addChild(this.message);
    this.root.addChild(this.button);

    this.root.visible = false;
  }

  public update() {
    this.root.visible = this.state.isIntro;
  }

  private onStartClick() {
    this.state.startGame();
  }
}
