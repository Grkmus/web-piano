import { readFile } from '../utils/helpers'
import Engine from './Engine'
import Song from './Song'

export default async function initialize(view) {
  const engine = new Engine(view)
  const midiFile = await readFile('MozartWolfgangAmadeus_AllaTurcaRondo.midi')
  const song = new Song(midiFile)
  engine.placeSong(song)
  return engine
}
