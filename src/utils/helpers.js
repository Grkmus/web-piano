import { Midi } from '@tonejs/midi';

const reader = new FileReader();

function readFile(fileName) {
  return new Promise((resolve, reject) => {
    fetch(`${import.meta.env.BASE_URL}${fileName}`).then((res) => res.blob()).then((res) => {
      reader.readAsArrayBuffer(res);
    });

    reader.addEventListener('onerror', () => {
      reject(new Error('Some error happened while reading the file'));
    });

    reader.addEventListener('loadend', (e) => {
      const file = new Midi(e.target.result);
      resolve(file);
    });
  });
}

function* makeRangeIterator(start = 0, array) {
  for (let i = start; i < array.length; i += 1) {
    yield array[i];
  }
  return null;
}

function bpm2px(bpm, deltaTime) { return (bpm * 4) / (1000 / deltaTime); }

export {readFile, makeRangeIterator, bpm2px}
