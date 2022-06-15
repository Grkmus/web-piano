import { readFile} from '@/utils/helpers'
import Note from '@/game/Note';
import _ from 'lodash';
import Engine from './Engine';

export default class Song {

  constructor(fileName) {
    this.fileName = fileName
    this.notes = null
    this.pixi = Engine.instance.pixi
    this.data = null
  }
  init() {
    return new Promise(resolve => {
      readFile(this.fileName).then((data) => {
        this.data = data
        console.log(data)
        const notes = data.tracks.reduce(
          (prev, current, i) => [...prev, ...current.notes.map((note) => new Note(note, i))], []
        );
        this.notes = notes
        resolve(notes)
      })
    })
  }

  reset() {
    this.notes = this.data.tracks.reduce(
      (prev, current) => [...prev, ...current.notes.map((note) => new Note(note, this.pixi))], []
    );
  }

}
  