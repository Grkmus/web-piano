import { Application, Graphics } from 'pixi.js';
import { bpm2px } from '../utils/helpers';
import _ from 'lodash';

export default class Engine {
  constructor(view) {
    if (Engine.instance == null) {
      this.pixi = new Application({
        view,
        resizeTo: view
      });
      this.currentSong = null;
      Engine.instance = this
    }
    return Engine.instance
  }
  async placeSong(song) {
    this.currentSong = song
    const notes = await song.init()
    this.pixi.stage.addChild(...notes);
    this.pixi.ticker.add(() => this.gameLoop());
    this.pixi.ticker.stop();
  }

  start() { 
    // this.pixi.ticker.speed = 0.2
    this.pixi.ticker.start();

  }
  pause() { this.pixi.ticker.stop(); }
  stop() {
    this.pixi.ticker.start();
    this.pixi.stage.y = -this.pixi.screen.height;
    this.pixi.stage.removeChildren()
    this.currentSong.reset()
    this.pixi.stage.addChild(...this.currentSong.notes);
    setTimeout(() => this.pause(), 100)
    window.dispatchEvent(new CustomEvent('reset'))
  }
  stepForward() {
    this.pixi.stage.y += 240
  }
  stepBackward() {
    this.pixi.stage.y -= 240
  }
  gameLoop() {
    this.pixi.stage.y += bpm2px(this.currentSong.data.header.tempos[0].bpm, this.pixi.ticker.deltaMS);
    const hitPosition = - this.pixi.stage.y + this.pixi.screen.height;
    for (let i = this.currentSong.notes.length - 1; i >= 0; i -= 1) {
      const note = this.currentSong.notes[i];
      if (note.isPlayed) continue
      note.update(hitPosition)
    }
  }
}

