import { Container, Graphics, Point, Sprite, Texture } from 'pixi.js';

// Variables to track dragging state
let dragging = false;
let dragData = null;
let dragOffset = null;

export default function drag(tracker) {
    const firstCursor = new Sprite(Texture.WHITE)
    firstCursor.width = 2
    firstCursor.height = tracker.trackerHeight + tracker.framePadding
    firstCursor.tint = 'red'
    firstCursor.y = 0
    firstCursor.x = 0

    const secondCursor = new Sprite(Texture.WHITE)
    secondCursor.width = 2
    secondCursor.height = tracker.trackerHeight + tracker.framePadding
    secondCursor.tint = 'red'
    secondCursor.y = 0
    secondCursor.x = 0

    const selectedArea = new Graphics()
      .rect(0, 0, 1, tracker.trackerHeight + tracker.framePadding)
      .fill({alpha: 0.5})
    // tracker.container.addChild(selectedArea)
    // tracker.container.mask = mask1
    // tracker.container.addChild(firstCursor)
    // Function to start dragging
    function onDragStart(event) {
      console.log('drag started')
      dragging = true;
      dragData = event.data;
      dragOffset = new Point();
      dragData.getLocalPosition(tracker.container, dragOffset);
      firstCursor.x = dragData.x
      selectedArea.x = dragData.x
      // tracker.container.addChild(firstCursor)
      // Optional: make the tracker.container semi-transparent while dragging
      // tracker.pixi.ticker.update()
      tracker.container.addChild(firstCursor)
      tracker.container.addChild(selectedArea)
      tracker.isDragging = false;
    }
    
    // Function to perform dragging
    function onDragMove() {
      tracker.isDragging = true;
      if (dragging) {
        // tracker.engine.disableLooping()
        tracker.container.alpha = 0.5; 
        console.log('dragging')
        console.log(tracker.pixi.stage.children)
        tracker.container.addChild(secondCursor)
        const newPosition = dragData.getLocalPosition(tracker.container.parent);
        secondCursor.x = newPosition.x
        selectedArea.width = newPosition.x - firstCursor.x
        tracker.pixi.render()
        // tracker.container.x = newPosition.x - dragOffset.x;
        // tracker.container.y = newPosition.y - dragOffset.y;
      }
    }
    
    // Function to stop dragging
    function onDragEnd() {
      console.log('dragStopped!')
      dragging = false;
      dragData = null;
      tracker.container.alpha = 1; // Restore the tracker.container's opacity
      const startCursorX = Math.min(firstCursor.x, secondCursor.x)
      const endCursorX = Math.max(firstCursor.x, secondCursor.x)
      tracker.cursor.x = startCursorX
      const start = startCursorX / tracker.horizontalRatio + tracker.pixi.screen.height
      const end =  endCursorX / tracker.horizontalRatio + tracker.pixi.screen.height
      // tracker.song.container.y = start
      console.log(tracker.isDragging)
      if (!tracker.isDragging) {
        tracker.engine.disableLooping()
        tracker.container.removeChild(firstCursor)
        tracker.container.removeChild(secondCursor)
        tracker.container.removeChild(selectedArea)
        tracker.container.alpha = 1;
        return
      }
      const returnFnc = () => {
        tracker.cursor.x = startCursorX
      }
      // tracker.loopLimits = [1000, 3000]
      tracker.container.alpha = 0.5; 
      tracker.engine.enableLooping({min: start, max: end}, returnFnc)
    }
    
    // Add the event listeners for dragging
    tracker.container.on('pointerdown', onDragStart);
    tracker.container.on('pointermove', onDragMove);
    tracker.container.on('pointerup', onDragEnd);
    tracker.container.on('pointerupoutside', onDragEnd);
}