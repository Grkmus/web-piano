import { interpolateMagma } from 'd3-scale-chromatic';
import { scaleSequential } from 'd3-scale';
import { color } from 'd3-color';
import { Sprite, SCALE_MODES, MSAA_QUALITY, Rectangle, Color, Graphics} from 'pixi.js';
import Engine from './Engine';
const LOWEST_KEY = 24;
const colorScale = scaleSequential().domain([24, 107]).interpolator(interpolateMagma);
export default class Note extends Sprite {
  constructor(note, i) {
    super();
    this.note = note;
    const { midi, durationTicks, ticks } = note;
    this.engine = Engine.instance;
    this.pixi = Engine.instance.pixi;
    this.w = this.pixi.screen.width / 7 / 12;
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
  }

  colorize() {
    this.defaultTexture = this.generateTexture(color(colorScale(this.note.midi)).formatHex());
  }

  update(hitPosition) {
    this.hitPosition = hitPosition;
    if (this.noteOffCheck()) {
      if (this.isNoteOn) {
        this.noteOff();
      } else return;
    }
    if (this.noteOnCheck()) {
      this.noteOn();
    }
    this.handEnableCheck();
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
      this.hitPosition >= this.position.y - this.height
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
    const { octave, pitch, midi } = this.note;
    const event = new CustomEvent('note-off', {
      detail: { octave, pitch, midi },
    });
    window.dispatchEvent(event);
    this.isNoteOn = false;
  }

  handEnableCheck() {
    if (
      (this.engine.leftHand && this.hand === 'left') ||
      (this.engine.rightHand && this.hand === 'right')
    ) {
      this.texture = this.defaultTexture;
    } else {
      this.texture = this.disabledTexture;
    }
  }

  pickMode() {
    if (this.settings.WAIT_FOR_INPUT_MODE.checked && this.isEnabled) {
      console.log('wait for input mode'); //eslint-disable-line
      // note.isOpen = true;
      // this.keysToBePressed.add(note.number);
      // console.log(this.keysToBePressed);
      // this.pressKeyComponent(note.octave, note.name);
      // this.$emit('pause');
    }
    if (this.settings.PLAY_ALONG_MODE.checked) {
      console.log('playalong mode'); //eslint-disable-line
      // note.isOpen = true;
      // this.$set(this.notes, i, note);
      // this.noteOn(note, i);
      // console.log('note started', note, i);
    }
  }
}

export {colorScale}