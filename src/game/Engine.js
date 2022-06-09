import { Application, Container } from 'pixi.js';
import { bpm2px, makeRangeIterator } from '../utils/helpers';
import _ from 'lodash';

export default class Engine {
  constructor(view, parentDiv) {
    if (Engine.instance == null) {
      this.pixi = new Application({view});
      view.width = parentDiv.clientWidth;
      view.height = parentDiv.clientHeight;
      this.observableView = null;
      this.currentSong = null;
      Engine.instance = this
    }
    return Engine.instance
  }
  async placeSong(song) {
    this.currentSong = song
    const noteContainers = await song.init()
    this.observableView = new Container();
    this.observableView.addChild(...noteContainers);
    this.notesIterator = makeRangeIterator(3, noteContainers);
    this.pixi.stage.addChild(this.observableView);
    this.pixi.ticker.add(() => this.gameLoop());
    this.pixi.ticker.stop();
  }

  start() { this.pixi.ticker.start(); }
  pause() { this.pixi.ticker.stop(); }
  stop() { 
    this.pixi.stage.y = -this.pixi.screen.height;
    this.pixi.stage.removeChildren()
    this.observableView = new Container();
    this.observableView.removeChildren()
    this.observableView.addChild(...this.currentSong.noteContainers);
    // this.notesIterator = makeRangeIterator(3, this.currentSong.noteContainers);
    this.pixi.stage.addChild(this.observableView);
    setTimeout(() => this.pause(), 100)
  }

  gameLoop() {
    this.pixi.stage.y += bpm2px(this.pixi.ticker.deltaMS);
    const hitPosition = -this.pixi.stage.y + this.pixi.screen.height;
    this.currentSong.noteContainers.forEach(group => {
      for (let i = group.children.length - 1; i >= 0; i -= 1) {
          const note = group.children[i];
          note.update(hitPosition);
        }
    });
    // this.observableView.children.forEach((group) => {
    //   for (let i = group.children.length - 1; i >= 0; i -= 1) {
    //     const note = group.children[i];
    //     note.update(hitPosition);
    //     if (note.isPlayed) group.removeChild(note);
    //     if (group.children.length === 0) {
    //       // this.observableView.removeChild(group);
    //       const nextContainer = this.notesIterator.next().value;
    //       if (!nextContainer) return;
    //       this.observableView.addChild(nextContainer);
    //     }
    //   }
    // });
  }
}

