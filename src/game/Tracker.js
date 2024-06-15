import { Container, Graphics, Sprite, Texture } from 'pixi.js';
import Engine from './Engine';

export default class Tracker {

  constructor(song) {
    this.song = song
    this.pixi = Engine.instance.pixi
    this.container = new Container()
    this.container.addChild(...song.notes.map(note => {
      return this.generateTrackerSprite(note, this.song.ratio)
    }), this.generateCursor())
    return this
  }

  generateTrackerSprite(note, ratio) {
    const rect = Sprite.from(Texture.WHITE);
    rect.width = note.h/8
    rect.height = note.w/8
    rect.tint = 'gray'
    rect.x = -note.y / ratio
    rect.y = note.note.midi *2 - 100
    rect.x = -note.y / ratio
    rect.y = note.note.midi *2 - 100
    return rect
  }

  generateCursor() {
    this.cursor = new Sprite(Texture.WHITE)
    this.cursor.width = 2
    this.cursor.height = 120
    this.tint = 0xfffff
    this.cursor.x = -this.pixi.screen.height / this.song.ratio
    return this.cursor
  }
}
  