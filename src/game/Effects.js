import { Emitter, upgradeConfig } from '@pixi/particle-emitter';
import { Texture } from 'pixi.js';
// import 
// Create a new emitter
// note: if importing library like "import * as particles from 'pixi-particles'"
// or "const particles = require('pixi-particles')", the PIXI namespace will
// not be modified, and may not exist - use "new particles.Emitter()", or whatever
// your imported namespace is
// console.log(Texture.from('Pixel25px.png'))
export default function generateParticle(container, position) {
    return new Emitter(
    
        // The PIXI.Container to put the emitter in
        // if using blend modes, it's important to put this
        // on top of a bitmap, and not use the root stage Container
        container,
        // Emitter configuration, edit this to change the look
        // of the emitter
        upgradeConfig(
            {
                'alpha': {
                    'start': 1,
                    'end': 0
                },
                'scale': {
                    'start': 0.21,
                    'end': 0.29,
                    'minimumScaleMultiplier': 1
                },
                'color': {
                    'start': '#e4f9ff',
                    'end': '#3fcbff'
                },
                'speed': {
                    'start': 204,
                    'end': 50,
                    'minimumSpeedMultiplier': 1
                },
                'acceleration': {
                    'x': 0,
                    'y': 0
                },
                'maxSpeed': 0,
                'startRotation': {
                    'min': 0,
                    'max': 360
                },
                'noRotation': false,
                'rotationSpeed': {
                    'min': 0,
                    'max': 0
                },
                'lifetime': {
                    'min': 0.2,
                    'max': 0.8
                },
                'blendMode': 'normal',
                'frequency': 0.001,
                'emitterLifetime': -1,
                'maxParticles': 100,
                'pos': {
                    'x': position.x,
                    'y': position.y
                },
                'addAtBack': false,
                'spawnType': 'rect',
                'spawnRect': {
                    'x': 0,
                    'y': 0,
                    'w': 50,
                    'h': 2
                }
            },
            Texture.from('Pixel25px.png')
        )
    );
}


// // Calculate the current time
// var elapsed = Date.now();

// // Update function every frame
// var update = function(){

// 	// Update the next frame
// 	requestAnimationFrame(update);

// 	var now = Date.now();

// 	// The emitter requires the elapsed
// 	// number of seconds since the last update
// 	emitter.update((now - elapsed) * 0.001);
// 	elapsed = now;

// 	// Should re-render the PIXI Stage
// 	// renderer.render(stage);
// };

// // Start emitting
// emitter.emit = true;

// // Start the update
// update();