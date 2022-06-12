import { Sprite, Graphics } from 'pixi.js';
import Engine from './Engine';
const LOWEST_KEY = 24;

export default class Note extends Sprite {
  constructor(note) {
    super();
    this.note = note
    const { midi, durationTicks, ticks } = note;
    this.pixi = Engine.instance.pixi
    this.w = (this.pixi.screen.width / 7) / 12;
    this.h = durationTicks;
    this.defaultColor = 0xf51616
    const thing = new Graphics();
    thing.beginFill(this.defaultColor, 0.5);
    thing.drawRoundedRect(0, 0, this.w, this.h, 10);
    
    this.x = (midi - LOWEST_KEY + 1) * this.w;
    this.y = -ticks;
    this.isNoteOn = false;
    this.isPlayed = false;
    this.hitPosition = 0;
    this.anchor.set(1, 1);
    const texture = this.pixi.renderer.generateTexture(
      thing,
      { resolution: window.devicePixelRatio }
    );
    this.texture = texture;
  }

  update(hitPosition) {
    this.hitPosition = hitPosition;
    if (this.noteOnCheck()) { this.noteOn(); }
    if (this.noteOffCheck()) { this.noteOff(); }
  }

  changeColor(color = 0x2F329F) {
    const thing = new Graphics();
    thing.beginFill(color, 0.5);
    thing.drawRoundedRect(0, 0, this.w, this.h, 10);
    return this.pixi.renderer.generateTexture(thing, {
      resolution: 1,
    });
  }

  // eslint-disable-next-line
  noteOnCheck() { return this.hitPosition <= this.position.y  && !this.isNoteOn; }

  // eslint-disable-next-line
  noteOffCheck() { return this.hitPosition <= this.position.y - this.height; }

  noteOn() {
    this.isNoteOn = true;
    this.texture = this.changeColor();
    const { octave, pitch, midi } = this.note
    const event = new CustomEvent('note-on', { detail: { octave, pitch, midi} })
    window.dispatchEvent(event)
    
  }
  
  noteOff() {
    this.isPlayed = true;
    const { octave, pitch, midi } = this.note
    const event = new CustomEvent('note-off', { detail: { octave, pitch, midi } })
    window.dispatchEvent(event)
  }

  // handEnableCheck() {
  //   if (this.settings.LEFT_HAND_ENABLED.checked && this.hand === 'left') {
  //     this.color = WHITE_COLOR;
  //     this.isEnabled = true;
  //   } else if (this.settings.RIGHT_HAND_ENABLED.checked && this.hand === 'right') {
  //     this.color = WHITE_COLOR;
  //     this.isEnabled = true;
  //   } else {
  //     this.color = GRAY_COLOR;
  //     this.isEnabled = false;
  //   }
  // }

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
