import Note from '@/game/Note';
import _ from 'lodash';
import Engine from './Engine';

export default class Song {

  constructor(data) {
    this.data = data
    this.notes = null
    this.pixi = Engine.instance.pixi
  }
  init() {
    const notes = this.data.tracks.reduce(
      (prev, current, i) => [...prev, ...current.notes.slice(0, 100).map((note) => new Note(note, i))], []
    );
    this.notes = notes
    return this.notes
  }

  reset() {
    this.notes = this.data.tracks.reduce(
      (prev, current) => [...prev, ...current.notes.slice(0, 100).map((note) => new Note(note, this.pixi))], []
    );
  }

}
  