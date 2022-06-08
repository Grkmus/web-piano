<template lang='pug'>
#sheet(ref="scene")
  canvas(ref="myCanvas")
</template>

<script>
// /*eslint-disable*/
import initialize from '@/game/Sketch.js';

export default {
  name: 'TheSheet',
  data() {
    return {
      noteContainers: null,
    };
  },
  async mounted() {
    initialize(this.$refs.myCanvas, this.$refs.scene)
    // const mong = await
    // console.log(song) 
    // Sketch.initApp(this.$refs.myCanvas, this.$refs.scene).then(() => {
    //   this.$emit('app-ready', Sketch);
    // });

    // this.initializeTheScene();
    // const thing = new Graphics();
    // thing.lineStyle(1, 0xff0000, 1);
    // thing.beginFill(0xffFF00, 0.5);
    // thing.drawRoundedRect(10, 10, 10, 10, 10);
    // this.$p.stage.addChild(thing);
    // this.noteContainers = this.createNoteContainers()
  },
  // methods: {

  //   async initializeTheScene() {
  //     this.$p = new Application({ view: this.$refs.scene });
  //     this.$p.resizeTo = this.$refs.scene;
  //     this.$p.renderer.plugins.interaction.on('pointerup', (e) => {
  //       console.log(e.data.global);
  //     });
  //     this.createNoteContainers();
  //   },

  //   async createNoteContainers() {
  //     const noteContainers = await readFile()
  //       .then((data) => {
  //         console.log(data);
  //         const notes = [];
  //         data.tracks.forEach((track) => {
  //           for (let i = 0; i < 100; i += 1) {
  //             const note = track.notes[i];
  //             notes.push(new Note(note, this.$p));
  //           }
  //         });
  //         return _.chain(notes)
  //           .groupBy((note) => Math.floor(-note.y / this.$p.screen.height))
  //           .map((group) => {
  //             const container = new Container();
  //             container.addChild(...group);
  //             return container;
  //           })
  //           .value();
  //       });
  //     return noteContainers;
  //   },

  //   gameLoop() {
  //     app.stage.y += bpm2px(app.ticker.deltaMS);
  //     drawScene();
  //     barTick.x += 5;
  //     const hitPosition = -app.stage.y + app.screen.height;

  //     STAGE.children.forEach((group) => {
  //       for (let i = group.children.length - 1; i >= 0; i -= 1) {
  //         const note = group.children[i];
  //         note.update(hitPosition);
  //         if (note.isPlayed) group.removeChild(note);
  //         if (group.children.length === 0) {
  //           STAGE.removeChild(group);
  //           const nextContainer = notesIterator.next().value;
  //           if (!nextContainer) return;
  //           STAGE.addChild(nextContainer);
  //         }
  //       }
  //     });
  //   }

  // },
};
</script>
