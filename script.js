class Corona {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  rotate(radians) {
    let ca = Math.cos(radians);
    let sa = Math.sin(radians);

    // Randomise movement
    return new Corona(ca * this.x - sa * this.y, sa * this.x + ca * this.y);
  }
}

// Create PIXI canvas
var app = new PIXI.Application(525, 525, {transparent: true, antialias: true});
// Position to put canvas in
var position = document.getElementById('sun');
// Add canvas to dom
position.appendChild(app.view);
// Create a PIXI container
var container = new PIXI.Container();
// Add container to canvas
app.stage.addChild(container);
// Define texture for use with displacement
var texture = new PIXI.Texture.fromImage('img/corona.png');
// Create sprite (bottom layer)
var bottom = new PIXI.Sprite(texture);
// Instantiate graphics class to draw shapes
var graphics = new PIXI.Graphics();
// Draw sun
var radians = app.renderer.screen.width / 2;
// Sun graphic
var sunGraphic = new PIXI.Sprite.fromImage('img/sun.png');
// Set the fill color
graphics.beginFill(); // Red
// Draw a circle
graphics.drawCircle(radians, radians, radians - 10); // drawCircle(x, y, radius)
// Applies fill to lines and shapes since the last call to beginFill.
graphics.endFill();
// Mask for graphics
sunGraphic.mask = graphics;
// Add graphics to canvas
app.stage.addChild(sunGraphic);
app.stage.addChild(graphics);

// Create displacement sprite
var displacementSprite = PIXI.Sprite.fromImage('img/displacement.png');
// Create displacement filter
var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite, 10);
// Glow filter
// var glowFilter = new PIXI.filters.GlowFilter(15, 2, 1, 0xff9999, 0.5);
// Displacement filter settings
displacementFilter.autoFit = true;
displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
displacementSprite.scale.y = 0.075;
displacementSprite.scale.x = 0.075;
// Add displacement sprite to container
container.addChild(displacementSprite);
// Add sprite to container
container.addChild(bottom);
// Turn off interaction
container.interactive = false;
// Apply filters
container.filters = [
  displacementFilter
  // glowFilter
];

// Create corona effect (instantiate Corona Class)
let wind = new Corona(0, 0.2);

// Interval rather than requestAnimationFrame to control with callback
setInterval(() => {
  let direction = Math.random() / 5.0;
  wind = wind.rotate(direction);
}, 1000);

// A Ticker class that runs an update loop that other objects listen to
app.ticker.add(() => {
  displacementSprite.x += wind.x;
  displacementSprite.y += wind.y;
});










////////////////////////////////
////// ---- OLD CODE ---- //////
////////////////////////////////

// function animate() {
//   // requestAnimationFrame(animate);

//   count += 0.05;

//   if(mesh && mesh.vertices) {
//     for(let i = 0; i < mesh.vertices.length; i++) {
//       mesh.vertices[i] = originalVertices[i] + (5 * Math.cos(count + i * 0.55));
//     }
//   }

//   renderer.render(stage);
// }


// var sun = new Image();
// sun.onload = ripple;
// sun.src = '/img/corona.png';

// var reflection = new Image();
// reflection.onload = reflection;
// reflection.src = '/img/sun.png';

// function ripple() {
//   var sunCanvas = document.getElementById('sun');
//   sunCtx = sunCanvas.getContext('2d'),
//   w = sunCanvas.width;
//   h = sunCanvas.height;

//   sunCtx.drawImage(this, 0, 0);

//   var o1 = new Osc(0.05), o2 = new Osc(0.03), o3 = new Osc(0.06),
//       x0 = 0, x1 = w * 0.25, x2 = w * 0.5, x3 = w * 0.75, x4 = w;

//     (function loop() {
//       sunCtx.clearRect(0, 0, w, h);

//       for( var y = 0; y< h; y++) {
//         var lx1 = x1 + o1.current(y * 0.2) * 3;
//         var lx2 = x2 + o2.current(y * 0.2) * 3;
//         var lx3 = x3 + o3.current(y * 0.2) * 3;

//         var w0 = lx1;
//         var w1 = lx2 - lx1;
//         var w2 = lx3 - lx2;
//         var w3 = x4 - lx3;

//         /**
//          * drawImage()
//          * img - An element to draw into the context
//          * x - The X coordinate in the destination canvas
//          * y - The Y coordinate in the destination canvas
//          * draw image lines ---- source ----   --- destination ---
//          */
//         sunCtx.drawImage(sun, x0, y, x1     , 1, 0        , y, w0, 1);
//         sunCtx.drawImage(sun, x1, y, x2 - x1, 1, lx1 - 0.5, y, w1, 1);
//         sunCtx.drawImage(sun, x2, y, x3 - x2, 1, lx2 - 1  , y, w2, 1);
//         sunCtx.drawImage(sun, x3, y, x4 - x3, 1, lx3 - 1.5, y, w3, 1);
//       }

//       requestAnimationFrame(loop);
//     })();
// }

// function reflection() {
//   var reflectionCanvas = document.getElementById('reflection');
//   reflectionCtx = reflectionCanvas.getContext('2d'),
//   w = reflectionCtx.width;
//   h = reflectionCtx.height;

//   reflectionCtx.drawImage(this, 0, 0);
// }

// function Osc(speed) {
//   var frame = 0;

//   this.current = function(x) {
//     frame+= 0.002 * speed;
//     return Math.sin(frame + x *speed * 10);
//   }
// }