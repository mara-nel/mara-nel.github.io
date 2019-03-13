var canvas = document.getElementById('board');
var ctx = canvas.getContext("2d");
var clear = window.getComputedStyle(canvas).getPropertyValue('background-color');
var width         = 4;
var height        = 20;
var extraWidth    = 4;
var extraHeight   = 0;//2.5;
var tilesz        = 28;
var wHeight       = window.innerHeight;
var wWidth        = window.innerWidth;
tilesz            = wHeight*.8 / 20;
canvas.width      = ( width + extraWidth)  * tilesz;
canvas.height     = ( height+ extraHeight) * tilesz;
var WALL = 1;
var BLOCK = 2;
var pieces = [
	[I, "cyan"],
	[J, "blue"],
	[L, "PaleVioletRed"],
	[O, "gray"],
	[S, "green"],
	[T, "yellow"],
	[Z, "red"]
];
var done;
var gdone;

var piece = null;

var dropStart;
var downI;

var board = [];
var bag = [];
var lastReset;
var bagText    = document.getElementById('bagsize');
//--------------------------------------------------
// For Piece Statistics
var pieceStatistics = [0,0,0,0,0,0,0];
var pieceLetters = ['I','J','L','O','S','T','Z'];
//--------------------------------------------------
// For Piece Hold
var heldPiece;
var heldPieceNumber = -1; //is initialized as -1 to mean nothing held, MIGHT NOT BE USING
var currentPieceNumber;
var isPieceHeld;
var isHoldLocked;
//--------------------------------------------------
// For New Games
document.getElementById('newGame').onclick = reset;
//--------------------------------------------------
// For Scoring
var combo         = 0;
var bcombo        = 0;
var combocount    = document.getElementById('combo');
var bestcombo     = document.getElementById('best-combo');
var gameStatus    = document.getElementById('status');
//--------------------------------------------------
// For Piece Preview
function updatePreview() {
   if (bag.length < 3) {
      makeAndShuffleBag();
   }
   drawPreview();
}

function drawPreview() {
	var fs = ctx.fillStyle;
   ctx.fillStyle = "Black";
   ctx.fillRect(width*tilesz,0,4*tilesz,(height-5.1)*tilesz);
   ctx.fillRect(0,height*tilesz,(width+extraWidth)*tilesz,extraHeight*tilesz);
   for (previewX = 0; previewX < 3; previewX++) {
      
      var nextToComeNumber = bag[bag.length-(1+previewX)];
      var nextToComePiece = pieces[nextToComeNumber];
      ctx.fillStyle = nextToComePiece[1];
      var size = nextToComePiece[0][0].length;

      var wAdjustment = 1;
      var hAdjustment = 0;
      if (nextToComeNumber ==0) {
        wAdjustment = 0;
      } else if (nextToComeNumber === 3) {
        wAdjustment = 0;
        hAdjustment = -1;
      }
      var scale = .5;
	   for (var y = 0; y < size; y++) {
	   	for (var x = 0; x < size; x++) {
            if (nextToComePiece[0][0][x][y] != 0) {
               //draw preview to the right
               drawSquare(x+width+wAdjustment, y+hAdjustment+.5+5*previewX);
               //draw preview on the bottom
	   		   //drawMiniSquare((x+wAdjustment+.5+5*previewX)*scale,
               //               (y+hAdjustment+.5)*scale + height,
               //               scale);
           }
	   	}
	   }
   }
   ctx.fillstyle = fs;
}

//--------------------------------------------------
// For Randomizer
var bagSize; //this should change based on what randomizer is chosen
function getRandomInt(max) {
   return Math.floor(Math.random() * Math.floor(max));
}
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
function makeAndShuffleBag(){
   var tempBag = [];
   if (bagSize > 0) {
      for (var i=0; i<7; i++) {
         for (var j=0; j<bagSize; j++) {
            tempBag.push(i);
         }
      }
      tempBag = shuffle(tempBag);
   } else {
      for (var i=0; i<7; i++) {
         tempBag.push(getRandomInt(pieces.length));
      }
   }
   //next piece is bag.pop(), meaning order of pieces is read from end of bag
   //to start. This means we need to add future pieces to the beginning of the bag
   //rather than end.
   bag = tempBag.concat(bag);
}
function newPieceDet( blockNumber ) {
	var p = pieces[blockNumber];
   currentPieceNumber = blockNumber;
   updateStats(blockNumber);
   updatePreview();
	return new Piece(p[0], p[1],blockNumber);
}
function nextPiece() {
   if (bag.length == 0) { //with preview, I don't think this is ever called
      makeAndShuffleBag();
      return newPieceDet(bag.pop());
   } else {
      return newPieceDet(bag.pop());
   }
}
var possibleRandomizer = document.getElementsByName("randomizer");
bagSize = 0
function initRandomizer() {
   bag = [];
   for ( var i =0; i < possibleRandomizer.length; i++) {
      if (possibleRandomizer[i].checked) {
         bagSize = possibleRandomizer[i].value;
      }
   }
   bagText.textContent = "Current Bag Size: "+bagSize;
}




function initBoard() {
   for (var r = 0; r < height; r++) {
	   board[r] = [];
	   for (var c = 0; c < width; c++) {
	   	board[r][c] = ["",-1];
	   }
   }
}

function initStats() {
   pieceStatistics = [0,0,0,0,0,0,0];
}



function updateStats( blockNumber ) {
   pieceStatistics[blockNumber] += 1;
}

function holdPiece() {
   if (!piece.recentlyHeld) {
      if (isPieceHeld == 0) { //ie no piece held
         isPieceHeld = 1;
         heldPieceNumber = currentPieceNumber;
         heldPiece = pieces[heldPieceNumber];
         piece.undraw();
         piece.undrawGhost();
         piece = nextPiece();
         piece.heldRecently();
      } else { //assuming hold isnt locked
         var oldHeldPieceNumber = heldPieceNumber;
         heldPieceNumber = currentPieceNumber;
         heldPiece = pieces[heldPieceNumber];
         currentPieceNumber = oldHeldPieceNumber;
         piece.undraw();
         piece.undrawGhost();
         piece = newPieceDet(currentPieceNumber);
         piece.heldRecently();
      }
      drawHold();
   }
}

function drawHold() {
   // on one hand I should check to make sure there is a piece held to draw
   // but I can also try to assume that this function will never be called 
   // if no piece is held
	var fs = ctx.fillStyle;
   ctx.fillStyle = "black";
   ctx.fillRect(width*tilesz,(height-4.5)*tilesz,4*tilesz,4.5*tilesz);
   ctx.fillStyle = heldPiece[1];
   var size = heldPiece[0][0].length;
   var adjustment = 1;
   if (heldPieceNumber ==0 || heldPieceNumber == 3) {
      adjustment = 0;
   }
	for (var y = 0; y < size; y++) {
		for (var x = 0; x < size; x++) {
         if (heldPiece[0][0][x][y] != 0) {
			   drawSquare(x+width+adjustment, height-4.5+y);
         }
		}
	}
}







function drawSquare(x, y) {
	ctx.fillRect(x * tilesz, y * tilesz, tilesz, tilesz);
	var ss = ctx.strokeStyle;
	ctx.strokeStyle = "#555";
	ctx.strokeRect(x * tilesz, y * tilesz, tilesz, tilesz);
	ctx.strokeStyle = ss;
}
function drawMiniSquare(x, y, scale) {
   var scaledSize = tilesz*scale
	ctx.fillRect(x * tilesz, y * tilesz, scaledSize, scaledSize);
	var ss = ctx.strokeStyle;
	ctx.strokeStyle = "#555";
	ctx.strokeRect(x * tilesz, y * tilesz, scaledSize, scaledSize);
	ctx.strokeStyle = ss;
}


//--------------------------------------------------
// Defining the Piece object
function Piece(patterns, color, shapeNumber) {
	this.pattern = patterns[0];
	this.patterns = patterns;
	this.patterni = 0;
   this.recentlyHeld = 0;
   this.id = ""+pieceStatistics[shapeNumber]+shapeNumber;

	this.color = color;

	this.x = width/2-parseInt(Math.ceil(this.pattern.length/2), 10);
	this.y = -4;
   this.ghosty;
}

Piece.prototype.heldRecently = function() { 
   this.recentlyHeld = 1;
};
Piece.prototype.notHeldRecently = function() { // might not need this 
   this.recentlyHeld = 0;
};
Piece.prototype.wasHeldRecenty = function() { // this does not seem to work properly
   return this.recentlyHeld;
};

Piece.prototype.rotate = function(amount) {
	var nudge = 0;
	var nextpat = this.patterns[(this.patterni + amount) % this.patterns.length];

	if (this._collides(0, 0, nextpat)) {
		// Check kickback
		nudge = this.x > width / 2 ? -1 : 1;
	}

	if (!this._collides(nudge, 0, nextpat)) {
		this.undraw();
		this.undrawGhost();
		this.x += nudge;
		this.patterni = (this.patterni + amount) % this.patterns.length;
		this.pattern = this.patterns[this.patterni];
      this.updateGhost();
		this.draw();
	}
};

Piece.prototype._collides = function(dx, dy, pat) {
	for (var ix = 0; ix < pat.length; ix++) {
		for (var iy = 0; iy < pat.length; iy++) {
			if (!pat[ix][iy]) {
				continue;
			}

			var x = this.x + ix + dx;
			var y = this.y + iy + dy;
			if (y >= height || x < 0 || x >= width) {
				return WALL;
			}
			if (y < 0) {
				// Ignore negative space rows
				continue;
			}
			if (board[y][x][0] !== "") {
				return BLOCK;
			}
		}
	}

	return 0;
};

Piece.prototype.down = function() {
   if (this.y == -4 ) { 
      //this should be the first call to updateGhost
      //ie no ghost to undraw
      this.updateGhost();
   }

	if (this._collides(0, 1, this.pattern)) {
		this.lock();
      piece = nextPiece();
      return 1;
	} else {
		this.undraw();
		this.y++;
		this.draw();
      return 0;
	}
};

Piece.prototype.moveRight = function() {
	if (!this._collides(1, 0, this.pattern)) {
		this.undraw();
      this.undrawGhost();
		this.x++;
      this.updateGhost();
		this.draw();
	}
};

Piece.prototype.moveLeft = function() {
	if (!this._collides(-1, 0, this.pattern)) {
		this.undraw();
		this.undrawGhost();
		this.x--;
      this.updateGhost();
		this.draw();
	}
};

Piece.prototype.lock = function() {
	for (var ix = 0; ix < this.pattern.length; ix++) {
		for (var iy = 0; iy < this.pattern.length; iy++) {
			if (!this.pattern[ix][iy]) {
				continue;
			}

			if (this.y + iy < 0) {
				// Game ends!
            gameOver();
			}
			board[this.y + iy][this.x + ix] = [this.color,this.id];
		}
	}

	var nlines = 0;
	for (var y = 0; y < height; y++) {
		var line = true;
		for (var x = 0; x < width; x++) {
			line = line && board[y][x][0] !== "";
		}
		if (line) {
			for (var y2 = y; y2 > 1; y2--) {
				for (var x = 0; x < width; x++) {
					board[y2][x] = board[y2-1][x];
				}
			}
			for (var x = 0; x < width; x++) {
				board[0][x] = ["",-1];
			}
			nlines++;
		}
} 

	if (nlines > 0) {
      combo += 1;
      if (combo > bcombo) {
         bcombo = combo;
         bestcombo.textContent = "Best: " + bcombo;
      }
      combocount.textContent = "Combo: " + combo;
		drawBoard();
	}
   else {
      if (combo >0) {
         gameOver();
      }
      combo = 0;
      combocount.textContent = "Combo: " + combo;
   }
};

Piece.prototype.updateGhost = function() {
   var oldy = this.y;
   // this should not be a permanent solution
   // also theres another while somewhere else, be vewy careful
   var emergencyescape = 0;
   while (!this._collides(0, 1, this.pattern) && emergencyescape < height+3) {
      emergencyescape++;
      this.y++;
   }

   this.ghosty = this.y;
   this.y = oldy;
   this.drawGhost();
};

Piece.prototype.drawGhost = function() {
   var fs = ctx.fillStyle;
   ctx.fillStyle = "black";
   var x = this.x;
   var y = this.ghosty;
   for (var ix = 0; ix < this.pattern.length; ix++) {
      for (var iy = 0; iy < this.pattern.length; iy++) {
         if (this.pattern[ix][iy]) {
            drawSquare(x + ix, y + iy);
         }
      }
   }
   ctx.fillStyle = fs;
};
Piece.prototype.undrawGhost = function() {
   var fs = ctx.fillStyle;
   ctx.fillStyle = clear;
   var x = this.x;
   var y = this.ghosty;
   for (var ix = 0; ix < this.pattern.length; ix++) {
      for (var iy = 0; iy < this.pattern.length; iy++) {
         if (this.pattern[ix][iy]) {
            drawSquare(x + ix, y + iy);
         }
      }
   }
   ctx.fillStyle = fs;
};


Piece.prototype._fill = function(color) {
	var fs = ctx.fillStyle;
	ctx.fillStyle = color;
	var x = this.x;
	var y = this.y;
	for (var ix = 0; ix < this.pattern.length; ix++) {
		for (var iy = 0; iy < this.pattern.length; iy++) {
			if (this.pattern[ix][iy]) {
				drawSquare(x + ix, y + iy);
			}
		}
	}
	ctx.fillStyle = fs;
};

Piece.prototype.undraw = function(ctx) {
	this._fill(clear);
};

Piece.prototype.draw = function(ctx) {
	this._fill(this.color);
};
//--------------------------------------------------


document.body.addEventListener("keydown", function (e) {
	if (downI[e.keyCode] !== null) {
		clearInterval(downI[e.keyCode]);
	}
	key(e.keyCode);
	downI[e.keyCode] = setInterval(key.bind(this, e.keyCode), 200);
}, false);
document.body.addEventListener("keyup", function (e) {
	if (downI[e.keyCode] !== null) {
		clearInterval(downI[e.keyCode]);
	}
	downI[e.keyCode] = null;
}, false);

//--------------------------------------------------
// Recognizing swipes
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }
	if (gdone) {
		return;
	}

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */ 
           piece.moveLeft();
        } else {
            /* right swipe */
           piece.moveRight();
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
           holdPiece();
        } else { 
            /* down swipe */
            while (piece.down() == 0) {}
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};
//--------------------------------------------------
// Recognizing taps/touches/clicks
document.addEventListener('click', handleClick, false);

function handleClick(evt) {
   var x = evt.clientX;

	if (gdone) {
      reset();
	}
   if (x < wWidth/2) {
      piece.rotate(1);
   } else {
      piece.rotate(3);
   }
};

//--------------------------------------------------
function key(k) {
   if (k == 82) { // Player pressed r
      reset();
   }
	if (gdone) {
		return;
	}
	if (k == 38) { // Player pressed up
		piece.rotate(1);
		dropStart = Date.now();
	}
   else if (k == 40) { // Player holding down
		piece.down();
	}
   else if (k == 37) { // Player holding left
		piece.moveLeft();
	}
   else if (k == 39) { // Player holding right
		piece.moveRight();
	}
   else if (k == 83) { // Player pressed s
      piece.rotate(1);
      dropStart = Date.now();
   }
   else if (k == 68) { // Player pressed d
      piece.rotate(3);
      dropStart = Date.now();
   }
   else if (k == 70) { // Player pressed f
      piece.rotate(2);
      dropStart = Date.now();
   }
   else if (k == 65) { // Player pressed a
      holdPiece();
   }
   else if (k == 32) { // Player pressed space
      while (piece.down() == 0) {
		   //piece.down();
      }
   }


}

function drawBoard() {
	var fs = ctx.fillStyle;
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			ctx.fillStyle = board[y][x][0] || clear;
			drawSquare(x, y);
		}
	}
	ctx.fillStyle = fs;
}

function initSideBoard() {
	var fs = ctx.fillStyle;
   ctx.fillStyle = "black";
   ctx.fillRect(width*tilesz,0,extraWidth*tilesz,(height+extraHeight)*tilesz);
   ctx.fillRect(0,height*tilesz,(width+extraWidth)*tilesz,extraHeight*tilesz);
   ctx.fillStyle = "white";
   ctx.fillRect((width+.2)*tilesz,(height-5.1)*tilesz,(4-.4)*tilesz,.1*tilesz);
}
function main() {
   if (!gdone) {
	   var now = Date.now();
	   var delta = now - dropStart;
      if (piece === null) {
         piece = nextPiece();
      }
   	if (delta > 400) {
   		piece.down();
   		dropStart = now;
   	}
   }

	if (!done) {
		requestAnimationFrame(main);
	}
}

function reset() {
   // a future function for just resetting everythin
	var now = Date.now();
	var delta = now - lastReset;
   if (delta > 100) {
      lastReset = Date.now()
      initGame();
      drawBoard();
      main();
   }
}

function initGame() {
   // in case window size changed
   wHeight       = window.innerHeight;
   tilesz            = wHeight*.8 / 20;
   canvas.width      = ( width + extraWidth)  * tilesz;
   canvas.height     = ( height+ extraHeight) * tilesz;

   initBoard();
   initStats();
   initSideBoard();
   initRandomizer();
   isPieceHeld = 0;
   isHoldLocked = 0;
   //heldPieceNumber = -1;
   done = false;
   gdone = false;
   dropStart = Date.now();
   downI = {};
   piece = null;
   clearScores();
}

function clearScores() {
   combo                   =  0;
   //bcombo                  =  0;
   combocount.textContent  = "Combo: "       +combo;
   bestcombo.textContent   = "Best: "  +bcombo;
   gameStatus.textContent  = "";
}

function gameOver() {
   gameStatus.textContent= "Game Over";
   //done = true;
   gdone = true;
	return;
}

lastReset = Date.now()
initGame()
drawBoard();
main();
