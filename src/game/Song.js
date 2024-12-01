import Note from '@/game/Note';
import _ from 'lodash';
import Engine from './Engine';
import { Container } from 'pixi.js';
import Tracker from './Tracker';

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
    this.tracker = new Tracker(this)
    return this
  }

  set position(val) {
    this.container.y = val
    this.tracker.cursor.x = (this.container.y -this.pixi.screen.height) * this.tracker.horizontalRatio
  }
  get position() {
    return this.container.y
  }
  reset() {
    this.position = 0
    this.tracker.reset()
    this.notes.forEach(note => {
      note.particle.then(particle => {particle.emit = false})
    })
  }

}
  