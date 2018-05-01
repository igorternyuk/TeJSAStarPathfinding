var canvasWidth = 400;
var canvasHeight = 400;
var rowCount = 20;
var colCount = 20;
var spotWidth, spotHeight;

var grid = createMatrix(rowCount, colCount);
const openSet = new PriorityQueue((a, b) => a.f > b.f );
var closedSet = [];

var start;
var target;

class Spot{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.f = 0;
		this.cost = 0;
		this.heuristic = 0;	
	}
	
	toString(){
		return "f = " + this.f;
	}

	render(color){
		fill(color);
		noStroke();
		rect(this.x * spotWidth, this.y * spotHeight,
		     spotWidth - 1, spotHeight - 1);
	}

}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    frameRate(10);
    spotHeight = height / rowCount;
    spotWidth = width / colCount;
    console.log("spotHeight = ", spotHeight);
    console.log("spotWidth = ", spotWidth);
    createMatrix(rowCount, colCount);

    for(let y = 0; y < grid.length; ++y){
  	  for(let x = 0; x < grid[y].length; ++x){
  		  grid[y][x] = new Spot(x,y);
  	  }
    }

    start = grid[0][0];
    target = grid[rowCount - 1][colCount - 1];

    openSet.push(start);
  
    const queue = new PriorityQueue((a, b) => a.f > b.f );

  	for(let i = 0; i < 100; i += 5){
  		spot = new Spot(0,0);
  		spot.f = i + floor(random(5,20));
  		queue.push(spot);
  	}
	
	//queue.push(10, 20, 30, 40, 50, 60, 70, 80, 90, 100);
	console.log('Top:', queue.peek()); //=> 114
	console.log('Size:', queue.size()); //=> 8
	console.log('isEmpty:', queue.isEmpty()); //=> false
	console.log('Contents:');
	//queue.write();
	//console.log('pop:');
	while (!queue.isEmpty()) {
	  console.log(queue.pop()); //=> 40,
	  //console.log('After popping:');
	  //queue.write();
	}
}

//main loop
function draw() {
	background(0);
	if(openSet.length > 0){

	} else {

	}

	for(let y = 0; y < grid.length; ++y){
	  	for(let x = 0; x < grid[y].length; ++x){
	  		grid[y][x].render(color(255));
	  	}
  	}

  	for(let i = 0; i < openSet.length; ++i){
  		openSet[i].render(color(0,200,0));
  	}

  	for(let i = 0; i < closedSet.length; ++i){
  		closedSet[i].render(color(220,20,0));
  	}

  	/*

  	*/

  	/*
var a = ["a", "b", "c"];
a.forEach(function(entry) {
    console.log(entry);
});

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

people = sortByKey(people, 'name');
  	*/

}

function createMatrix(rows, cols){
	let grid = new Array(rows);
	for(let i = 0; i < grid.length; ++i){
		grid[i] = new Array(cols);
	}
	return grid;
}


