import { readFile } from '../utils/helpers'
import { Application } from 'pixi.js';
import Engine from './Engine'

export default async function initialize(view) {
  const app = new Application();
  await app.init({
    // application options
    antialias: true,
    canvas: view,
    resizeTo: view
  });
  const engine = new Engine(app)
  const fileName = 'MozartWolfgangAmadeus_AllaTurcaRondo.midi'
  const midiFile = await readFile(fileName)
  engine.placeSong(midiFile, fileName)
  return engine
}
