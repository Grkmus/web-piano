import Engine from "./Engine"
import Song from "./Song"

export default function initialize(view, parentDiv) {
  const engine = new Engine(view, parentDiv)
  const song = new Song('MozartWolfgangAmadeus_AllaTurcaRondo.midi', engine.pixi)
  engine.placeSong(song)
  console.log(engine)
}

// export default {
//   app: null,
//   observableView: null,
//   notesIterator: null,
//   fpsText: null,
//   cachedNotes: null,
//   async initApp(view, parentDiv) {
//     this.engine = new Application({view});
//     view.width = parentDiv.clientWidth;
//     view.height = parentDiv.clientHeight;

//     this.noteContainers = await this.createNoteContainers();
//     this.cachedNotes = _.cloneDeep(this.noteContainers)
//     this.observableView = new Container();
//     this.observableView.addChild(...this.noteContainers.slice(0, 3));
//     this.notesIterator = makeRangeIterator(3, this.noteContainers);
//     this.app.stage.addChild(this.observableView);
//     this.app.ticker.add(() => this.gameLoop());
//     this.app.ticker.stop();
//   },

//   start() { this.app.ticker.start(); },
//   pause() { this.app.ticker.stop(); },
//   // stop() { this.pause(); },
//   stop() { 
//     // this.pause();
//     this.app.stage.y = -this.app.screen.height;
//     this.app.stage.removeChildren()
//     this.observableView = new Container();
//     this.observableView.addChild(...this.cachedNotes.slice(0, 3));
//     this.notesIterator = makeRangeIterator(3, this.cachedNotes);
//     this.app.stage.addChild(this.observableView);
//   },
//   tempoChange(tempo) { console.log('tempo change', tempo); },
//   loop(limits) { console.log(limits, 'looping'); },
//   mode(newVal) { console.log('Mode changed to:', newVal); },
//   leftHand(newVal) { console.log('left hands change', newVal); },
//   rightHand(newVal) { console.log('right hands change', newVal); },
//   bpm2px(deltaTime) { return (120 * 4) / (1000 / deltaTime); },

//   gameLoop() {//eslint-disable-line
//     this.app.stage.y += this.bpm2px(this.app.ticker.deltaMS);
//     const hitPosition = -this.app.stage.y + this.app.screen.height;
//     this.observableView.children.forEach((group) => {
//       for (let i = group.children.length - 1; i >= 0; i -= 1) {
//         const note = group.children[i];
//         note.update(hitPosition);
//         if (note.isPlayed) group.removeChild(note);
//         if (group.children.length === 0) {
//           this.observableView.removeChild(group);
//           const nextContainer = this.notesIterator.next().value;
//           if (!nextContainer) return;
//           this.observableView.addChild(nextContainer);
//         }
//       }
//     });
//   },
// };
