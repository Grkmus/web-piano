import Note from '@/game/Note';
import _ from 'lodash';
import Engine from './Engine';

export default class Song {

  constructor(data) {
    this.data = data
    this.notes = null
    this.pixi = Engine.instance.pixi
    this.ratio = 1
  }
  init() {
    const notes = this.data.tracks.reduce(
      (prev, current, i) => [...prev, ...current.notes.map((note) => new Note(note, i))], []
    );
    this.notes = notes
    this.ratio = notes[notes.length - 1].note.ticks / window.innerWidth
    return this.notes
  }

  reset() {
    this.notes = this.data.tracks.reduce(
      (prev, current) => [...prev, ...current.notes.map((note) => new Note(note, this.pixi))], []
    );
  }

}
  