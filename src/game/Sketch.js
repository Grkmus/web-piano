import Engine from './Engine'
import Song from './Song'

export default function initialize(view) {
  return new Promise(resolve => {
    const engine = new Engine(view)
    const song = new Song('MozartWolfgangAmadeus_AllaTurcaRondo.midi')
    engine.placeSong(song)
    resolve(engine)
  })
}
