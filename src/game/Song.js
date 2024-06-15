import Note from '@/game/Note';
import _ from 'lodash';
import Engine from './Engine';
import { Container } from 'pixi.js';

export default class Song {

  constructor(data) {
    const {durationTicks, tracks, header} = data
    this.header = header
    this.tempo = header.tempos[0].bpm;
    this.tracks = tracks
    this.container = new Container();
    this.pixi = Engine.instance.pixi
    this.ratio = durationTicks / window.innerWidth
    tracks.forEach((track, i) => {
      track.notes.forEach(note => {
        this.container.addChild(new Note(note, i, this.ratio))
      })
    });
    this.notes = this.container.children
    return this
  }

  reset() {
    this.notes = this.tracks.reduce(
      (prev, current, i) => [...prev, ...current.notes.map((note) => new Note(note, i, this.ratio))], []
    );
  }

}
  