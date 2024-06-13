import { Text, Container, Graphics } from 'pixi.js';
import { bpm2px } from '../utils/helpers';
import _ from 'lodash';
import EventFactory from '@/game/EventFactory';

export default class Engine extends EventFactory {
  constructor(app) {
    if (Engine.instance == null) {
      super()
      this.pixi = app
      this.currentSong = null;
      this.notesContainer = new Container();
      this.songTrackContainer = new Container()
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
  placeSong(song) {
    console.log('placing the song')
    this.stop()
    const notes = song.init();
    this.currentSong = song;
    this.tempo = this.currentSong.data.header.tempos[0].bpm;
    this.emit('tempoChange', Math.round(this.tempo))
    this.pixi.stage.removeChild(this.notesContainer);
    this.notesContainer.removeChildren();
    this.notesContainer.addChild(...notes);
    this.songTrackContainer.addChild(...notes.map(note => note.noteOnTracker))
    this.pixi.stage.addChild(this.notesContainer);
    this.pixi.stage.addChild(this.songTrackContainer);
    this.pixi.ticker.stop();
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
    this.notesContainer.y = 0;
    window.dispatchEvent(new CustomEvent('reset'));
    this.pixi.render()
  }
  enableLooping(limits) {
    window.dispatchEvent(new CustomEvent('reset'));
    this.notesContainer.removeChildren();
    const newNotes = this.currentSong.notes.filter((note) => {
      return Math.abs(note.y) > limits.min && Math.abs(note.y) < limits.max;
    });
    if (!_.isEmpty(newNotes)) this.notesContainer.addChild(...newNotes);
    this.notesContainer.y = limits.min - this.pixi.screen.height;
    this.loopFunc = () => this.loopInArea(limits);
    this.pixi.ticker.add(this.loopFunc);
  }
  disableLooping() {
    this.notesContainer.removeChildren();
    this.notesContainer.addChild(...this.currentSong.notes);
    this.pixi.ticker.remove(this.loopFunc);
  }
  loopInArea(limits) {
    if (this.notesContainer.y >= limits.max + this.pixi.screen.height) {
      this.notesContainer.y = limits.min;
      window.dispatchEvent(new CustomEvent('reset'));
    }
  }
  stepForward() {
    window.dispatchEvent(new CustomEvent('reset'));
    this.notesContainer.y += 240;
    this.pixi.render()
  }
  stepBackward() {
    window.dispatchEvent(new CustomEvent('reset'));
    this.notesContainer.y -= 240;
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
    this.notesContainer.y += bpm2px(this.tempo, this.pixi.ticker.deltaMS);
    const hitPosition = -this.notesContainer.y + this.pixi.screen.height;
    for (let i = this.notesContainer.children.length - 1; i >= 0; i -= 1) {
      const note = this.notesContainer.getChildAt(i);
      note.update(hitPosition);
    }
  }
}
