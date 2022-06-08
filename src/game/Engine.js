// /*eslint-disable*/
import { Application, Container } from 'pixi.js';
import { makeRangeIterator } from '../utils/helpers';
import _ from 'lodash';

export default class Engine {
  constructor(view, parentDiv) {
    if (Engine.instance == null) {
      console.log('okaoka')
      this.pixi = new Application({view});
      view.width = parentDiv.clientWidth;
      view.height = parentDiv.clientHeight;
      this.observableView = null;
      this.currentSong = null;
      Engine.instance = this
    }
    return Engine.instance
    // this.noteContainers = await this.createNoteContainers();
    // this.cachedNotes = _.cloneDeep(this.noteContainers)
    // this.observableView = new Container();
    // this.observableView.addChild(...this.noteContainers.slice(0, 3));
    // this.notesIterator = makeRangeIterator(3, this.noteContainers);
    // this.app.stage.addChild(this.observableView);
    // this.app.ticker.add(() => this.gameLoop());
    // this.app.ticker.stop();
  }
  async placeSong(song) {
    this.currentSong = song
    const noteContainers = await song.init()
    this.observableView = new Container();
    this.observableView.addChild(...noteContainers.slice(0, 3));
    this.notesIterator = makeRangeIterator(3, noteContainers);
    this.pixi.stage.addChild(this.observableView);
    this.pixi.ticker.add(() => this.gameLoop());
    this.pixi.ticker.stop();
  }


}

