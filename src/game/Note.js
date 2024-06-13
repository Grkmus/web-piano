import { interpolateMagma } from 'd3-scale-chromatic';
import { scaleSequential } from 'd3-scale';
import { color } from 'd3-color';
import { Sprite, Graphics} from 'pixi.js';
import Engine from './Engine';
const LOWEST_KEY = 24;
const OCTAVE_AMOUNT = 7
const colorScale = scaleSequential().domain([24, OCTAVE_AMOUNT * 12]).interpolator(interpolateMagma);
const keysToBePressed = new Set()
export default class Note extends Sprite {
  constructor(note, i, ratio) {
    super();
    this.note = note;
    const { midi, durationTicks, ticks } = note;
    this.engine = Engine.instance;
    this.pixi = Engine.instance.pixi;
    this.w = this.pixi.screen.width / OCTAVE_AMOUNT / 12;
    this.h = durationTicks;
    this.hand = i === 1 ? 'left' : 'right';
    this.x = (midi - LOWEST_KEY + 1) * this.w;
    this.y = -ticks;
    this.isNoteOn = false;
    this.isPlayed = false;
    this.hitPosition = 0;
    this.anchor.set(1, 1);
    this.colorize()
    this.disabledTexture = this.generateTexture(0x8b95a6);
    this.noteOnTexture = this.generateTexture(0x2f329f);
    this.texture = this.defaultTexture;
    this.noteOnTracker = new Graphics()
      .roundRect(-this.y / ratio, midi *2 - 100, this.h/8, this.w/8, 10)
      .fill(0x8b95a6)
  }

  colorize() {
    this.defaultTexture = this.generateTexture(color(colorScale(this.note.midi)).formatHex());
  }

  update(hitPosition) {
    this.hitPosition = hitPosition;
    if (this.noteOffCheck()) this.noteOff();
    if (this.noteOnCheck()) {
      this.noteOn()
      this.pickMode()
    }
    this.handEnableCheck() ? this.texture = this.defaultTexture : this.texture = this.disabledTexture;
  }

  generateTexture(color) {
    const thing = new Graphics()
      .roundRect(0, 0, this.w, this.h, 10)
      .fill(color);
    return this.pixi.renderer.generateTexture(thing, {
      resolution: window.devicePixelRatio,
    });
  }

  noteOnCheck() {
    return (
      this.hitPosition <= this.position.y &&
      this.hitPosition >= this.position.y - this.height &&
      this.handEnableCheck()
    );
  }

  noteOffCheck() {
    return this.position.y - this.height >= this.hitPosition;
  }

  noteOn() {
    if (!this.isNoteOn) {
      this.texture = this.noteOnTexture;
      const { octave, pitch, midi } = this.note;
      const event = new CustomEvent('note-on', {
        detail: { octave, pitch, midi },
      });
      window.dispatchEvent(event);
      this.isNoteOn = true;
    }
  }

  noteOff() {
    if (!this.isNoteOn) return
    const { octave, pitch, midi } = this.note;
    const event = new CustomEvent('note-off', {
      detail: { octave, pitch, midi },
    });
    window.dispatchEvent(event);
    this.isNoteOn = false;
  }

  handEnableCheck() {
    return (
      (this.engine.leftHand && this.hand === 'left') ||
      (this.engine.rightHand && this.hand === 'right')
    )
  }

  pickMode() {
    if (this.engine.mode === 'waitInput' && !this.engine.keysBeingPressed.has(this.note.midi)) {
      keysToBePressed.add(this.note.midi);
      console.log(this.engine.keysBeingPressed)
      this.engine.pause()
    }
  }
}

export {colorScale, keysToBePressed}