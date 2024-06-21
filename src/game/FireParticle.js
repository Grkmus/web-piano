import { Assets, Texture } from 'pixi.js';
import * as particles from '@barvynkoa/particle-emitter'

export default class FireParticle {
  constructor(container, definitions, color) {
    return this.fetchAssets().then(() => {
      return this.initialize(container, definitions, color)
    })
  }
  async fetchAssets() {
    this.fire = await Assets.load('/web-piano/Fire.png');
    this.particle = await Assets.load('/web-piano/particle.png');
  }
  initialize(container, definitions, color) {
    const defaultDefinitions = {
      lifetime: {
        min: 0.1,
        max: 1
      },
      frequency: 0.001,
      emitterLifetime: -1,
      maxParticles: 1000,
      addAtBack: false,
      pos: { x: 876.5714285714287, y: 500 },
      autoUpdate: true,
      behaviors: [
        { type: 'textureSingle', config: { texture: Texture.WHITE } },
        {
          type: 'moveSpeed',
          config: {
            speed: {
              list: [
                {value: 200, time: 0},
                {value: 50, time: 0.25},
                {value: 5, time: 1}
              ]
            },
            minMult: 0.5,
          }
        },
        {
          type: 'moveSpeedStatic',
          config: {
            min: 500,
            max: 500
          }
        },
        {
          type: 'rotationStatic',
          config: {
            min: 0,
            max: 360
          }
        },
        {
          type: 'spawnShape',
          config: {
            type: 'rect',
            data: { x: 0, y: 0, w: 15, h: -10 }
          }
        },
        {
          type: 'rotation',
          config: {
            accel: 0,
            minSpeed: 50,
            maxSpeed: 50,
            minStart: 265,
            maxStart: 275
          }
        },
        {
          type: 'color',
          config: {
            color: {
              list: [
                {
                  time: 0,
                  value: color
                },
                {
                  time: 1,
                  value: 'ff622c'
                }
              ]
            }
          }
        },
        {
          type: 'scale',
          config: {
            scale: {
              list: [
                {
                  time: 0,
                  value: 5
                },
                {
                  time: 0.5,
                  value: 0
                },
                {
                  time: 1,
                  value: 0
                },
              ]
            },
            minMult: 1
          }
        },
      ],
    }
    const finalDefinition = { ...defaultDefinitions, ...definitions}
    return new particles.Emitter(container, finalDefinition);
  }

  replaceBehaviors(newBehavior) {
    
  }
}

