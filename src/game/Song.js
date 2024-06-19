import Note from '@/game/Note';
import _ from 'lodash';
import Engine from './Engine';
import { Container } from 'pixi.js';

export default class Song {

  constructor(data) {
    const {durationTicks, tracks, header} = data
    this.durationTicks = durationTicks
    this.header = header
    this.tempo = header.tempos[0].bpm;
    this.tracks = tracks
    this.container = new Container();
    this.pixi = Engine.instance.pixi
    tracks.forEach((track, i) => {
      track.notes.forEach(note => {
        this.container.addChild(new Note(note, i))
      })
    });
    this.notes = this.container.children
    return this
  }

  set position(val) {
    this.container.y = val
  }
  get position() {
    return this.container.y
  }
  reset() {
    this.container.y = 0
  }

}
  