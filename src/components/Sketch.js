// /*eslint-disable*/
import { Application, Container } from 'pixi.js';
import _ from 'lodash';
import Note from '@/models/Note';
import readFile from '@/helpers/ReadFile';

function* makeRangeIterator(start = 0, array) {
  for (let i = start; i < array.length; i += 1) {
    yield array[i];
  }
  return null;
}

export default {
  app: null,
  observableView: null,
  notesIterator: null,
  fpsText: null,
  async initApp(view, parentDiv) {
    this.app = new Application({view});
    console.log('check')
    console.log(view, parentDiv)
    view.width = parentDiv.clientWidth;
    view.height = parentDiv.clientHeight;
    // this.app.resizeTo = view;
    
    // this.app.renderer.plugins.interaction.on('pointerup', (e) => {
    //   console.log(e.data.global);
    // });

    this.noteContainers = await this.createNoteContainers();
    this.observableView = new Container();
    this.observableView.addChild(...this.noteContainers.slice(0, 3));

    this.notesIterator = makeRangeIterator(3, this.noteContainers);

    this.app.stage.addChild(this.observableView);
    this.app.ticker.add(() => this.gameLoop());
    this.app.ticker.stop();
  },
  async createNoteContainers() {
    const noteContainers = await readFile().then((data) => {
      const notes = data.tracks.reduce((prev, current) => [...prev, ...current.notes.map((note) => new Note(note, this.app))], []);
      return _.chain(notes)
        .groupBy((note) => Math.floor(-note.y / this.app.screen.height))
        .map((group) => {
          const container = new Container();
          container.addChild(...group);
          return container;
        })
        .value();
    });
    return noteContainers;
  },
  start() { this.app.ticker.start(); },
  pause() { this.app.ticker.stop(); },
  stop() {
    this.pause();
    this.resetNotes();
  },
  tempoChange(tempo) { console.log('tempo change', tempo); },
  loop(limits) { console.log(limits, 'looping'); },
  mode(newVal) { console.log('Mode changed to:', newVal); },
  leftHand(newVal) { console.log('left hands change', newVal); },
  rightHand(newVal) { console.log('right hands change', newVal); },
  bpm2px(deltaTime) { return (120 * 4) / (1000 / deltaTime); },

  gameLoop() {//eslint-disable-line
    this.app.stage.y += this.bpm2px(this.app.ticker.deltaMS);
    const hitPosition = -this.app.stage.y + this.app.screen.height;
    this.observableView.children.forEach((group) => {
      for (let i = group.children.length - 1; i >= 0; i -= 1) {
        const note = group.children[i];
        note.update(hitPosition);
        if (note.isPlayed) group.removeChild(note);
        if (group.children.length === 0) {
          this.observableView.removeChild(group);
          const nextContainer = this.notesIterator.next().value;
          if (!nextContainer) return;
          this.observableView.addChild(nextContainer);
        }
      }
    });
  },
};
