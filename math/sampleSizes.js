document.getElementById('frequency').onclick = generateFreqGraphs;
document.getElementById('relfrequency').onclick = generateRelFreqGraphs;

function singleDieGraph(trials, relative) {
  var diceResults = [0, 0, 0, 0, 0, 0];
  for (i = 0; i < trials; i++) {
    diceResults[Math.floor(Math.random() * 6)] += 1;
  }

  var factor = 1;
  if (relative) {
    factor = trials;
  }

  var singleDie = new CanvasJS.Chart("chartContainer", {
	  animationEnabled: true,

	  title:{
	  	text:"Dice Rolls"
	  },
	  axisX:{
	  	interval: 1
	  },
	  axisY2:{
		  interlacedColor: "rgba(1,77,101,.2)",
		  gridColor: "rgba(1,77,101,.1)",
	  },
	  data: [{
	  	type: "bar",
	  	axisYType: "secondary",
	  	color: "#014D65",
	  	dataPoints: [
	  		{ y: diceResults[5] / factor, label: "Rolled 6" },
	  		{ y: diceResults[4] / factor, label: "Rolled 5" },
	  		{ y: diceResults[3] / factor, label: "Rolled 4" },
	  		{ y: diceResults[2] / factor, label: "Rolled 3" },
	  		{ y: diceResults[1] / factor, label: "Rolled 2" },
	  		{ y: diceResults[0] / factor, label: "Rolled 1" },
	  	]
	  }]
  });

  singleDie.render();
}

function singleDieGraph( trials, relative) {
  var diceResults = [0,0,0,0,0,0];
  for (i = 0; i < trials; i++) {
    diceResults[Math.floor(Math.random() * 6)] +=1;
  }

  var factor = 1;
  if (relative) {
    factor = trials;
  }

  var singleDie = new CanvasJS.Chart("chartContainer2", {
	  animationEnabled: true,

	  title:{
	  	text:"Dice Rolls"
	  },
	  axisX:{
	  	interval: 1
	  },
	  axisY2:{
		  interlacedColor: "rgba(1,77,101,.2)",
		  gridColor: "rgba(1,77,101,.1)",
	  },
	  data: [{
	  	type: "bar",
	  	axisYType: "secondary",
	  	color: "#014D65",
	  	dataPoints: [
	  		{ y: diceResults[5] / factor, label: "Rolled 6" },
	  		{ y: diceResults[4] / factor, label: "Rolled 5" },
	  		{ y: diceResults[3] / factor, label: "Rolled 4" },
	  		{ y: diceResults[2] / factor, label: "Rolled 3" },
	  		{ y: diceResults[1] / factor, label: "Rolled 2" },
	  		{ y: diceResults[0] / factor, label: "Rolled 1" },
	  	]
	  }]
  });

  singleDie.render();
}


function coinGraph( trials, relative) {
  var coinResults = [0,0];
  for (i = 0; i < trials; i++) {
    coinResults[Math.floor(Math.random() * 2)] +=1;
  }

  var factor = 1;
  if (relative) {
    factor = trials;
  }

  var coin = new CanvasJS.Chart("chartContainer", {
	  animationEnabled: true,

	  title:{
	  	text:"Coin Flips"
	  },
	  axisX:{
	  	interval: 1
	  },
	  axisY2:{
		  interlacedColor: "rgba(1,77,101,.2)",
		  gridColor: "rgba(1,77,101,.1)",
	  },
	  data: [{
	  	type: "bar",
	  	axisYType: "secondary",
	  	color: "#014D65",
	  	dataPoints: [
	  		{ y: coinResults[1] / factor, label: "Flipped Tails" },
	  		{ y: coinResults[0] / factor, label: "Flipped Heads" },
	  	]
	  }]
  });

  coin.render();
}

function diceSumGraph( trials, relative) {
  var sumResults = [0,0,0,0,0,0,0,0,0,0,0];
  for (i = 0; i < trials; i++) {
    sumResults[Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6)] +=1;
  }

  var factor = 1;
  if (relative) {
    factor = trials;
  }

  var sum = new CanvasJS.Chart("chartContainer3", {
	  animationEnabled: true,

	  title:{
	  	text:"Sum of Two Dice"
	  },
	  axisX:{
	  	interval: 1
	  },
	  axisY2:{
		  interlacedColor: "rgba(1,77,101,.2)",
		  gridColor: "rgba(1,77,101,.1)",
	  },
	  data: [{
	  	type: "bar",
	  	name: "companies",
	  	axisYType: "secondary",
	  	color: "#014D65",
	  	dataPoints: [
	  		{ y: sumResults[10] / factor, label: "Sum of 12" },
	  		{ y: sumResults[9] / factor, label: "Sum of 11" },
	  		{ y: sumResults[8] / factor, label: "Sum of 10" },
	  		{ y: sumResults[7] / factor, label: "Sum of 9" },
	  		{ y: sumResults[6] / factor, label: "Sum of 8" },
	  		{ y: sumResults[5] / factor, label: "Sum of 7" },
	  		{ y: sumResults[4] / factor, label: "Sum of 6" },
	  		{ y: sumResults[3] / factor, label: "Sum of 5" },
	  		{ y: sumResults[2] / factor, label: "Sum of 4" },
	  		{ y: sumResults[1] / factor, label: "Sum of 3" },
	  		{ y: sumResults[0] / factor, label: "Sum of 2" },
	  	]
	  }]
  });

  sum.render();
}
function generateFreqGraphs() {
  var samplesz = parseInt(document.getElementById('samplesize').value);

  if (samplesz < 5 ) {
    samplesz = 5;
    document.getElementById('samplesize').value = '5';
  }

  coinGraph(samplesz, 0);
  singleDieGraph(samplesz, 0);
  diceSumGraph(samplesz, 0);
}

function generateRelFreqGraphs() {
  var samplesz = parseInt(document.getElementById('samplesize').value);

  if (samplesz < 5 ) {
    samplesz = 5;
    document.getElementById('samplesize').value = '5';
  }

  coinGraph(samplesz, 1);
  singleDieGraph(samplesz, 1);
  diceSumGraph(samplesz, 1);
  }

window.onload = generateFreqGraphs;
