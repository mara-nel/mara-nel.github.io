var WALL = 1;
var BLOCK = 2;
var SILVER = 7;
var GOLD = 8;
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


var downI;

var board = [];
var bag = [];
var lastReset;
var bagText    = document.getElementById('bagsize');

//--------------------------------------------------
// For sizing
var canvas = document.getElementById('board');
var ctx = canvas.getContext("2d");
var clear = window.getComputedStyle(canvas).getPropertyValue('background-color');
var BOARDWIDTH    = 10;
var BOARDHEIGHT   = 20;
var SIDEWIDTH     = 5;
var extraHeight   = 2.5;
var sideBarX;
var tilesz;

function initCanvas() {
   var wHeight       = window.innerHeight;
   tilesz            = wHeight*.7 / BOARDHEIGHT;
   sideBarX          = BOARDWIDTH + .1 
   canvas.width      = ( sideBarX + SIDEWIDTH )  * tilesz;
   canvas.height     = ( BOARDHEIGHT+ extraHeight) * tilesz;
}





//--------------------------------------------------
// For Graphics and colors
function setColor (color) {
   ctx.fillStyle = color;
   if (color != clear ) {
      ctx.strokeStyle = "black";
   } else {
      ctx.strokeStyle = "dimGray";
   }
}
var MayaBlue = "#55cdfc";
var AmaranthPink = "#f7a8b8";
// alt colors
//var pieces = [
//	[I, "white"],
//	[J, MayaBlue],
//	[L, AmaranthPink],
//	[O, "white"],
//	[S, MayaBlue],
//	[T, "white"],
//	[Z, AmaranthPink]
//];
clear = "black";
//--------------------------------------------------
// For Piece Statistics (needed for checking square mode)
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

function reset() {
	var now = Date.now();
	var delta = now - lastReset;
   if (delta > 100) {
      lastReset = Date.now()
      initGame();
      drawBoard();
      main();
   }
}
//--------------------------------------------------
// For Scoring
var lines         = 0;
var combo         = 0;
var bcombo        = 0;
var squares       = 0;
var numpieces     = 0;
var linecount     = document.getElementById('lines');
var combocount    = document.getElementById('combo');
var bestcombo     = document.getElementById('best-combo');
var piececount    = document.getElementById('pieces');
var gameStatus    = document.getElementById('status');

function clearScores() {
   lines                   =  0;
   combo                   =  0;
   bcombo                  =  0;
   squares                 =  0;
   numpieces               =  0;
   linecount.textContent   = "Lines: "    + lines;
   combocount.textContent  = "Combo: "    + combo;
   bestcombo.textContent   = "Best: "     + bcombo;
   piececount.textContent  = "Pieces: "   + numpieces;
   gameStatus.textContent  = "";
}
//--------------------------------------------------
// For Piece Preview
function updatePreview() {
   if (bag.length < 5) {
      makeAndShuffleBag();
   }
   drawPreview();
}

function drawPreview() {
   setColor("Black");
   ctx.fillRect(sideBarX*tilesz,0,SIDEWIDTH*tilesz,(BOARDHEIGHT-5.1)*tilesz);
   //for a bottom preview
   //ctx.fillRect(0,BOARDHEIGHT*tilesz,canvas.width,extraHeight*tilesz);
   for (previewX = 0; previewX < 5; previewX++) {
      
      var nextToComeNumber = bag[bag.length-(1+previewX)];
      var nextToComePiece = pieces[nextToComeNumber];
      setColor(nextToComePiece[1]);
      var size = nextToComePiece[0][0].length;

      var wAdjustment = 1;
      var hAdjustment = .5;
      if (nextToComeNumber ==0) {
         wAdjustment = 0.5;
         hAdjustment = -1;
      } else if (nextToComeNumber === 3) {
        wAdjustment = 0.5;
        hAdjustment = -.5;
      }
      var scale = .5;
	   for (var y = 0; y < size; y++) {
	   	for (var x = 0; x < size; x++) {
            if (nextToComePiece[0][0][y][x] != 0) {
               //draw preview to the right
               drawSquare(sideBarX+x+wAdjustment, y+hAdjustment+3*previewX);
               //draw preview on the bottom
	   		   //drawMiniSquare((x+wAdjustment+.5+5*previewX)*scale,
               //               (y+hAdjustment+.5)*scale + BOARDHEIGHT,
               //               scale);
           }
	   	}
	   }
   }
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
   numpieces++;
   piececount.textContent = "Pieces: "+numpieces;
   speedUp();
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

//--------------------------------------------------
// For speeding up blocks falling
var dropStart;
var GRAVITY          = 400;
var SPEEDCHANGE      = 50;
var TRANSITION       = 25;
var TRANSITIONSTART  = 125
var speed            = 0;
var numspeedchanges  = 0;

function speedUp() {
   if (numpieces - TRANSITION*numspeedchanges > TRANSITIONSTART && speed+SPEEDCHANGE < GRAVITY) {
      // after TRANSITIONSTART many pieces, every additonal TRANSITION
      // number of pieces triggers speed up of SPEEDCHANGE
      numspeedchanges += 1;
      speed = numspeedchanges*SPEEDCHANGE;
   }
}


//--------------------------------------------------
// For square mode
function checkSquare(row,col) {
   var piecesPresent = [];
   var shapesPresent = [];
   var currentId;
   var currentShape;
   for (var r=0; r<4; r++) {
      for (var c=0; c<4; c++) {
         currentId = board[row+r][col+c][1];
         if (currentId == -1) {
            return 0; //the square is not filled in
         }
         else {
            currentShape = currentId % 10;
            if (currentShape == GOLD || currentShape == SILVER) {
               return 0;
            }
            if (!piecesPresent.includes(currentId)) {
               piecesPresent.push(currentId);
            }
            if (!shapesPresent.includes(currentShape)) {
               shapesPresent.push(currentShape);
            }
         }
      }
   }
   if (piecesPresent.length != 4) {
      return 0; //a perfect square uses exactly 4 pieces
   } else if (shapesPresent.length > 1) {
      transformSquare(row,col,SILVER);
      return SILVER; //a silver block
   } else {
      transformSquare(row,col,GOLD);
      return GOLD; //a gold block
   }
}


function transformSquare(row,col,type) {
   var newId = ""+squares+type;
   for (var r=0; r<4; r++) {
      for (var c=0; c<4; c++) {
         if (type == GOLD){
         board[row+r][col+c] = ["DarkGoldenRod",newId];
         } else if (type == SILVER){
         board[row+r][col+c] = ["LightSteelBlue",newId];
         }
      }
   }
   drawBoard();
}

function checkForSquares() {
   var outcome    = 0;
   var nsquares   = 0;
   for (var r=0; r<BOARDHEIGHT-3; r++) {
      for (var c=0; c<BOARDWIDTH-3; c++) {
         outcome = checkSquare(r,c);
         if (outcome == SILVER) {
            nsquares += outcome-6;
         } else if (outcome == GOLD) {
            nsquares += outcome-6;
         }
      }
   }
   if (nsquares > 0) {
      squares += nsquares;
   }
}
//--------------------------------------------------



function initBoard() {
   for (var r = 0; r < BOARDHEIGHT; r++) {
	   board[r] = [];
	   for (var c = 0; c < BOARDWIDTH; c++) {
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
   setColor("black");
   ctx.fillRect(BOARDWIDTH*tilesz,(BOARDHEIGHT-4.5)*tilesz,SIDEWIDTH*tilesz,4.5*tilesz);
   setColor(heldPiece[1]);
   var size = heldPiece[0][0].length;
   var hAdjustment = 1 - 4.5;
   var wAdjustment = 1;
   if (heldPieceNumber == 0 ) {
      hAdjustment = -.5 - 4.5;
      wAdjustment = .5;
   } else if ( heldPieceNumber == 3) {
      hAdjustment = 0 - 4.5;
      wAdjustment = .5;
   }
	for (var y = 0; y < size; y++) {
		for (var x = 0; x < size; x++) {
         if (heldPiece[0][0][y][x] != 0) {
			   drawSquare(sideBarX + x+ wAdjustment, y + BOARDHEIGHT + hAdjustment);
         }
		}
	}
}







function drawSquare(x, y) {
	ctx.fillRect(x * tilesz, y * tilesz, tilesz, tilesz);
	ctx.strokeRect(x * tilesz, y * tilesz, tilesz, tilesz);
}
function drawMiniSquare(x, y, scale) {
   var scaledSize = tilesz*scale
	ctx.fillRect(x * tilesz, y * tilesz, scaledSize, scaledSize);
	ctx.strokeRect(x * tilesz, y * tilesz, scaledSize, scaledSize);
}


//--------------------------------------------------
// Defining the Piece object
function Piece(patterns, color, shapeNumber) {
	this.pattern = patterns[0];
	this.patterns = patterns;
	this.patterni = 0;
   this.recentlyHeld = 0;
   this.number = shapeNumber;
   this.id = ""+pieceStatistics[shapeNumber]+shapeNumber;

	this.color = color;

	this.x = BOARDWIDTH/2-parseInt(Math.ceil(this.pattern.length/2), 10);
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
      if (this.number !== 0) {
   		nudge = this.x > BOARDWIDTH / 2 ? -1 : 1;
      } else {
   		nudge = this.x > BOARDWIDTH / 2 ? -2 : 1;
      }
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
	for (var ix = 0; ix < this.pattern.length; ix++) {
		for (var iy = 0; iy < this.pattern.length; iy++) {
			if (!pat[iy][ix]) {
				continue;
			}

			var x = this.x + ix + dx;
			var y = this.y + iy + dy;
			if (y >= BOARDHEIGHT || x < 0 || x >= BOARDWIDTH) {
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
			if (!this.pattern[iy][ix]) {
				continue;
			}

			if (this.y + iy < 0) {
				// Game ends!
            gameOver();
            return;
			}
			board[this.y + iy][this.x + ix] = [this.color,this.id];
		}
	}

   checkForSquares();
	var nlines  = 0;
   var gsBonus = 0;
	for (var y = 0; y < BOARDHEIGHT; y++) {
		var line = true;
      var golds = [];
      var silvers = [];
		for (var x = 0; x < BOARDWIDTH; x++) {
			line = line && board[y][x][0] !== "";
		}
		if (line) {
		   for (var x = 0; x < BOARDWIDTH; x++) {
            var currentId = board[y][x][1];
            var pieceType = currentId % 10;
            if (pieceType == GOLD) {
               if (!golds.includes(currentId)) {
                  golds.push(currentId);
               }
            } else if (pieceType == SILVER) {
               if (!silvers.includes(currentId)) {
                  silvers.push(currentId);
               }
            }
			   line = line && board[y][x][0] !== "";
		   }
			for (var y2 = y; y2 > 0; y2--) {
				for (var x = 0; x < BOARDWIDTH; x++) {
					board[y2][x] = board[y2-1][x];
				}
			}
			for (var x = 0; x < BOARDWIDTH; x++) {
				board[0][x] = ["",-1];
			}
			nlines++;
         gsBonus += 5*silvers.length + 10*golds.length;
		}
} 

	if (nlines > 0) {
      if (nlines = 4){
         // in the new tetris, if you cleared 4 lines at once there was a bonus of +1
         nlines++;
      }  
		lines += nlines+gsBonus;
      combo += 1;
      if (combo > bcombo) {
         bcombo = combo;
         bestcombo.textContent = "Best: " + bcombo;
      }
      combocount.textContent = "Combo: " + combo;
		drawBoard();
		linecount.textContent = "Lines: " + lines;
	}
   else {
      combo = 0;
      combocount.textContent = "Combo: " + combo;
   }
};

Piece.prototype.updateGhost = function() {
   var oldy = this.y;
   // this should not be a permanent solution
   // also theres another while somewhere else, be vewy careful
   var emergencyescape = 0;
   while (!this._collides(0, 1, this.pattern) && emergencyescape < BOARDHEIGHT+3) {
      emergencyescape++;
      this.y++;
   }

   this.ghosty = this.y;
   this.y = oldy;
   this.drawGhost();
};

Piece.prototype.drawGhost = function() {
   setColor(this.color);
   ctx.globalAlpha = 0.5;
   var x = this.x;
   var y = this.ghosty;
   var patlength = this.pattern.length;
   for (var ix = 0; ix < patlength; ix++) {
      for (var iy = 0; iy < patlength; iy++) {
         if (this.pattern[iy][ix]) {
            drawSquare(x + ix, y + iy);
         }
      }
   }
   ctx.globalAlpha = 1.0;
};
Piece.prototype.undrawGhost = function() {
   setColor(clear);
   var x = this.x;
   var y = this.ghosty;
   var patlength = this.pattern.length;
   for (var ix = 0; ix < patlength; ix++) {
      for (var iy = 0; iy < patlength; iy++) {
         if (this.pattern[iy][ix]) {
            drawSquare(x + ix, y + iy);
         }
      }
   }
};


Piece.prototype._fill = function(color) {
	setColor(color);
	var x = this.x;
	var y = this.y;
   var patlength = this.pattern.length;
   for (var ix = 0; ix < patlength; ix++) {
      for (var iy = 0; iy < patlength; iy++) {
         if (this.pattern[iy][ix]) {
            drawSquare(x + ix, y + iy);
         }
      }
   }
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

function key(k) {
   if (k == 82) { // Player pressed r
      reset();
   }
	if (gdone) {
		return;
	}
	if (k == 38) { // Player pressed up
		piece.rotate(3);
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
      piece.rotate(3);
      dropStart = Date.now();
   }
   else if (k == 68) { // Player pressed d
      piece.rotate(1);
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
	for (var y = 0; y < BOARDHEIGHT; y++) {
		for (var x = 0; x < BOARDWIDTH; x++) {
         setColor(board[y][x][0] || clear);
			drawSquare(x, y);
		}
	}
}

function initSideBoard() {
   //ctx.fillStyle = "black";
   setColor("black");
   ctx.fillRect(BOARDWIDTH*tilesz,0,(SIDEWIDTH+.1)*tilesz,(BOARDHEIGHT+extraHeight)*tilesz);
   ctx.fillRect(0,BOARDHEIGHT*tilesz,(sideBarX)*tilesz,extraHeight*tilesz);
   setColor("white");
   ctx.fillRect((sideBarX+.5)*tilesz,(BOARDHEIGHT-4.7)*tilesz,(SIDEWIDTH-1)*tilesz,.2*tilesz);
}
function main() {
   if (!gdone) {
      var now = Date.now();
      var delta = now - dropStart;
      if (piece === null) {
         piece = nextPiece();
      }
	   if (delta > GRAVITY - speed) {
	   	piece.down();
		   dropStart = now;
	   }
   }

	if (!done) {
		requestAnimationFrame(main);
	}
}


function initGame() {
   initCanvas();
   initBoard();
   initStats();
   initSideBoard();
   initRandomizer();
   isPieceHeld = 0;
   isHoldLocked = 0;
   //heldPieceNumber = -1;
   done  = false;
   gdone = false;
   speed = 0;
   dropStart = Date.now();
   downI = {};
   piece = null;
   clearScores();
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
