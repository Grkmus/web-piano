import { readFile} from '@/utils/helpers'
import Note from '@/game/Note';
import _ from 'lodash';
import { Container } from 'pixi.js';
import Engine from './Engine';

export default class Song {

  constructor(fileName) {
    this.fileName = fileName
    this.noteContainers = null
    this.pixi = Engine.instance
  }
  init() {
    console.log('initting')
    return new Promise(resolve => {
      readFile(this.fileName).then((data) => {
        const notes = data.tracks.reduce(
          (prev, current) => [...prev, ...current.notes.map((note) => new Note(note, this.pixi))], []);
        this.noteContainers = _.chain(notes)
          .groupBy((note) => Math.floor(-note.y / this.pixi.screen.height))
          .map((group) => {
            const container = new Container();
            container.addChild(...group);
            return container;
          })
          .value();
        resolve(this.noteContainers)
      })

    })
  }

}
  