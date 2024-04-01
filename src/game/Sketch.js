import { readFile } from '../utils/helpers'
import { Application } from 'pixi.js';
import Engine from './Engine'
import Song from './Song'

export default async function initialize(view) {
  const app = new Application();
  await app.init({
    // application options
    antialias: true,
    canvas: view,
    resizeTo: view
  });
  const engine = new Engine(app)
  const midiFile = await readFile('MozartWolfgangAmadeus_AllaTurcaRondo.midi')
  const song = new Song(midiFile)
  engine.placeSong(song)
  return engine
}
