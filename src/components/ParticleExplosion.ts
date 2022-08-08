import * as PIXI from 'pixi.js';
import * as particles from '@pixi/particle-emitter';
import { GameComponent } from '../core';

export class ParticleExplosion extends GameComponent {
  private mergeEmitter: particles.Emitter;
  private queue: PIXI.Point[];
  private queueElapsed = 0;
  private queueDelay = 0;

  public emit(x: number, y: number) {
    this.mergeEmitter.emit = true;
    this.mergeEmitter.resetPositionTracking();
    this.mergeEmitter.updateOwnerPos(x, y);
  }

  public enqueue(points: PIXI.Point[], delay: number) {
    this.queue = points;
    this.queueDelay = delay;
  }

  public start() {
    this.queue = [];

    this.mergeEmitter = new particles.Emitter(this.root, {
      emit: false,
      lifetime: { min: 0.6, max: 0.6 },
      frequency: 0.2,
      particlesPerWave: 40,
      emitterLifetime: 0.3,
      maxParticles: 1000,
      pos: { x: 0, y: 0 },
      addAtBack: false,
      behaviors: [
        {
          type: 'alpha',
          config: {
            alpha: {
              list: [
                { time: 0, value: 0.8 },
                { time: 1, value: 1.0 },
              ],
            },
          },
        },
        {
          type: 'moveSpeedStatic',
          config: { min: 400, max: 400 },
        },
        {
          type: 'scale',
          config: {
            scale: {
              list: [
                { time: 0, value: 1 },
                { time: 1, value: 0.3 },
              ],
            },
            minMult: 1,
          },
        },
        {
          type: 'colorStatic',
          config: {
            color: '#67c2e9',
          },
        },
        {
          type: 'textureRandom',
          config: { textures: ['img/particle.png'] },
        },
        {
          type: 'spawnBurst',
          config: { start: 0, spacing: 15, distance: 0 },
        },
      ],
    });

    this.root.zIndex = 1000;
  }

  public update(delta: number) {
    super.update(delta);

    this.mergeEmitter.update(delta * 0.001);

    if (this.queue.length > 0) {
      this.queueElapsed += delta;

      if (this.queueElapsed >= this.queueDelay) {
        const point = this.queue.pop();

        if (point) {
          this.mergeEmitter.emitNow();
          this.mergeEmitter.resetPositionTracking();
          this.mergeEmitter.updateOwnerPos(point.x, point.y);
        }

        this.queueElapsed = 0;
      }
    }
  }
}
