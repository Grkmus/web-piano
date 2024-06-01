import { Piano } from '@tonejs/piano';
console.log(Piano)
const piano = new Piano({ velocities: 2 });
console.log(piano)
piano.toDestination();
piano.output.gain.value = 0.1;

export default piano;