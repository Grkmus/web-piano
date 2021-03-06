import { Application, Text, TextStyle, Container } from 'pixi.js';
import { bpm2px } from '../utils/helpers';
import _ from 'lodash';
import EventFactory from '@/game/EventFactory';
const style = new TextStyle({
  fontFamily: 'monospace',
  fontSize: 36,
  fontWeight: 'bold',
  fill: ['#ffffff'], // gradient
  stroke: '#4a1850',
  strokeThickness: 5,
  dropShadow: true,
  dropShadowColor: '#000000',
  dropShadowBlur: 4,
  // dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
  wordWrap: true,
  wordWrapWidth: 440,
  lineJoin: 'round',
});

export default class Engine extends EventFactory {
  constructor(view) {
    if (Engine.instance == null) {
      super()
      // this.piano = piano
      this.pixi = new Application({
        view,
        resizeTo: view,
      });
      this.currentSong = null;
      this.notesContainer = new Container();
      this.tempo = null;
      this.leftHand = true;
      this.rightHand = true;
      Engine.instance = this;
      this.basicText = new Text('0', style);
      this.basicText.x = 50;
      this.basicText.y = 10;
      this.loopFunc = null;
      this.pixi.stage.addChild(this.basicText);
      this.pixi.ticker.add(() => this.gameLoop());
    }
    return Engine.instance;
  }
  async placeSong(song) {
    console.log('placing the song')
    this.stop()
    const notes = await song.init();
    this.currentSong = song;
    this.tempo = this.currentSong.data.header.tempos[0].bpm;
    this.emit('tempoChange', Math.round(this.tempo))
    this.pixi.stage.removeChild(this.notesContainer);
    this.notesContainer.removeChildren();
    this.notesContainer.addChild(...notes);
    this.pixi.stage.addChild(this.notesContainer);
    this.pixi.ticker.stop();
  }
  start() { this.pixi.ticker.start(); }
  pause() {
    this.pixi.ticker.stop();
  }
  stop() {
    this.pause();
    this.notesContainer.y = 0;
    this.pixi.ticker.update();
    window.dispatchEvent(new CustomEvent('reset'));
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
  }
  stepBackward() {
    window.dispatchEvent(new CustomEvent('reset'));
    this.notesContainer.y -= 240;
  }
  tempoChange(tempo) {
    this.tempo = Number(tempo);
  }
  gameLoop() {
    this.notesContainer.y += bpm2px(this.tempo, this.pixi.ticker.deltaMS);
    this.basicText.text = Math.round(this.notesContainer.y);
    const hitPosition = -this.notesContainer.y + this.pixi.screen.height;
    for (let i = this.notesContainer.children.length - 1; i >= 0; i -= 1) {
      const note = this.notesContainer.getChildAt(i);
      note.update(hitPosition);
    }
  }
}
