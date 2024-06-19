import { Container, Graphics, Sprite, Texture } from 'pixi.js';
import Engine from './Engine';
import drag from './drag';

export default class Tracker {
  constructor(song) {
    this.trackerHeight = Engine.instance.pixi.screen.height / 8
    this.framePadding = 10
    this.song = song
    this.cursor = new Sprite(Texture.WHITE)
    this.horizontalRatio = window.innerWidth / song.durationTicks 
    this.verticalRatio = this.getVerticalRatio()
    this.pixi = Engine.instance.pixi
    this.engine = Engine.instance
    this.container = new Container()
    this.container.addChild(
      ...song.notes.map(note => this.generateTrackerSprite(note)),
      this.generateCursor(),
      this.generateFrame()
    )
    this.dragObjects = null
    this.enableListener()
    this.isDragging = false;
    return this
  }

  getVerticalRatio() {
    const availableMidiNotes = this.song.notes.map(note => note.x)
    const min = Math.min(...availableMidiNotes)
    this.minX = min
    const max = Math.max(...availableMidiNotes)
    return this.trackerHeight / (max - min) 
  }

  scaleX(x) {
    return (x - this.minX) * this.verticalRatio
  }

  generateTrackerSprite(note) {
    const rect = Sprite.from(Texture.WHITE);
    rect.width = note.h * this.horizontalRatio
    rect.height = note.w * this.verticalRatio
    rect.tint = 'gray'
    rect.x = -note.y * this.horizontalRatio
    rect.y = this.scaleX(note.x)
    return rect
  }

  generateCursor() {
    this.cursor.width = 2
    this.cursor.height = this.trackerHeight + this.framePadding
    this.tint = 0xfffff
    this.cursor.x = -this.pixi.screen.height * this.horizontalRatio
    return this.cursor
  }

  generateFrame() {
    const frame = this.pixi.renderer.generateTexture(
      new Graphics()
      .lineTo(0, this.trackerHeight + this.framePadding)
      .stroke('black')
      .lineTo(this.pixi.screen.width, this.trackerHeight + this.framePadding)
      .stroke('gray'),
      { resolution: window.devicePixelRatio });
    const sprite = new Sprite(frame)
    return sprite
  }

  enableListener() {
    this.container.interactive = true
    this.container.cursor = 'pointer';
    this.dragObjects = drag(this)
    this.container.on('pointertap', e => {
      if (this.isDragging) return
      const cursorPosition = e.getLocalPosition(this.container).x
      const songPosition = cursorPosition / this.horizontalRatio + this.pixi.screen.height
      this.song.container.y = songPosition
      this.cursor.x = cursorPosition
      this.pixi.render()
    })
  }
  reset() {
    this.container.removeChild(...this.dragObjects)
    this.container.alpha = 1
  }
}
  