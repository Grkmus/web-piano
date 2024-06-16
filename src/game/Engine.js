import { Text, Container, Graphics, FillGradient, GraphicsContext, Texture, Sprite } from 'pixi.js';
import { bpm2px } from '../utils/helpers';
import _ from 'lodash';
import EventFactory from '@/game/EventFactory';
import Tracker from './Tracker';
import Song from './Song';
export default class Engine extends EventFactory {
  constructor(app) {
    if (Engine.instance == null) {
      super()
      this.pixi = app
      this.song = null;
      this.tracker = null
      this.tempo = null;
      this.leftHand = true;
      this.rightHand = true;
      this.mode = 'playAlong'
      this.keysBeingPressed = new Set()
      Engine.instance = this;
      this.loopFunc = null;
      this.pixi.ticker.add(() => this.gameLoop());
    }
    return Engine.instance;
  }
  placeSong(midi) {
    console.log('placing the song')
    this.stop()
    this.pixi.stage.removeChildren();
    this.song = new Song(midi);
    this.tracker = new Tracker(this.song)
    this.pixi.stage.addChild(this.tracker.container);
    this.pixi.stage.addChild(this.song.container);
    this.tempo = this.song.tempo;
    this.emit('tempoChange', Math.round(this.tempo))
    this.pixi.render()
  }
  start() { 
    this.pixi.ticker.start();
  }
  pause() {
    this.pixi.ticker.stop();
  }
  stop() {
    this.pause();
    window.dispatchEvent(new CustomEvent('reset'));
    this.pixi.render()
  }
  enableLooping(limits, callback) {
    console.log('enabling looping', limits)
    window.dispatchEvent(new CustomEvent('reset'));
    this.song.container.y = limits.min;
    if (this.loopFunc) this.pixi.ticker.remove(this.loopFunc);
    this.loopFunc = () => this.loopInArea(limits, callback);
    this.pixi.ticker.add(this.loopFunc);
  }
  disableLooping() {
    console.log('disabling looping')
    this.pixi.ticker.remove(this.loopFunc);
  }
  loopInArea(limits, callback) {
    if (this.song.container.y >= limits.max) {
      this.song.container.y = limits.min;
      callback()
      window.dispatchEvent(new CustomEvent('reset'));
    }
  }
  stepForward() {
    window.dispatchEvent(new CustomEvent('reset'));
    this.song.container.y += 240;
    this.pixi.render()
  }
  stepBackward() {
    window.dispatchEvent(new CustomEvent('reset'));
    this.song.container.y -= 240;
    this.pixi.render()
  }
  tempoChange(tempo) {
    this.tempo = Number(tempo);
  }
  updateMode(mode) {
    if (mode === 'playAlong') this.start()
    this.mode = mode
  }
  gameLoop() {
    this.song.container.y += bpm2px(this.tempo, this.pixi.ticker.deltaMS);
    this.tracker.cursor.x += bpm2px(this.tempo, this.pixi.ticker.deltaMS) * this.tracker.horizontalRatio
    const hitPosition = -this.song.container.y + this.pixi.screen.height;
    for (let i = this.song.notes.length - 1; i >= 0; i -= 1) {
      const note = this.song.notes[i];
      note.update(hitPosition);
    }
  }
}
