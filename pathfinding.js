var canvasWidth = 400;
var canvasHeight = 400;
var rowCount = 20;
var colCount = 20;
var spotWidth, spotHeight;

var grid = createMatrix(rowCount, colCount);
var openSet;
var closedSet = [];

var start;
var target;
var optimalPath = [];

class Spot{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.f = 0;
		this.cost = 0;
		this.heuristic = 0;	
		this.prev = null;
	}

	getNeighboursMoor(grid){
		let neighbours = [];
		for(let dy = -1; dy < 2; ++dy){
			for(let dx = -1; dx < 2; ++dx){
				let nx = this.x + dx;
				let ny = this.y + dy;
				if(isValidCoordinates(grid, nx, ny)){
					neighbours.push(grid[ny][nx]);
				}		
			}
		}
		return neighbours;
	}

	getNeighboursVonNeumann(grid){
		let directions = [[1,0],[0,1],[-1,0],[0,-1]];
		let neighbours = [];
		for(let i = 0; i < directions.length; ++i){
			let nx = this.x + directions[i][0];
			let ny = this.y + directions[i][1];
			if(isValidCoordinates(grid, nx, ny)){
				neighbours.push(grid[ny][nx]);
			}
		}
		return neighbours;
	}
	
	render(color){
		fill(color);
		noStroke();
		ellipse(this.x * spotWidth + spotWidth / 2, this.y * spotHeight + spotHeight / 2,
		     0.8 * spotWidth, 0.8 * spotHeight);
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
	openSet = new PriorityQueue((a, b) => a.f < b.f );
    openSet.push(start);
}

function restoreOptimalPath(current){
	optimalPath = [];
	let curr = current;
	while(curr != null){
		optimalPath.push(curr);
		curr = curr.prev;
	}
}

//main loop
function draw() {
	background(0);

	if(!openSet.isEmpty()){
		let current = openSet.pop();

		if(current === target){
			console.log("Done!");
			//Restore the optimal path
			restoreOptimalPath(current);
			console.log("optimalPath.length = " + optimalPath.length);
			noLoop();
		}

		closedSet.push(current);

		let neighbours = current.getNeighboursVonNeumann(grid);
		//console.log("neighbours.length = " + neighbours.length);
		neighbours.forEach(neighbour => {
			if(!closedSet.includes(neighbour)){
				let tmpG = current.cost + 1;
				if(openSet.includes(neighbour)){
					if(tmpG < neighbour.cost){
						neighbour.cost = tmpG;
					}
				} else {
					neighbour.cost = tmpG;
					openSet.push(neighbour);
				}
				neighbour.heuristic = heuristicFunc(neighbour, target);
				neighbour.f = neighbour.cost + neighbour.heuristic;
				neighbour.prev = current;
			}

		});

		restoreOptimalPath(current);
		openSet.heapify();

	} else {

	}

	
	//Rendering
	for(let y = 0; y < grid.length; ++y){
	  	for(let x = 0; x < grid[y].length; ++x){
	  		if(openSet.includes(grid[y][x])){
	  			grid[y][x].render(color(0,230,0));
	  		} else if(closedSet.includes(grid[y][x])){
  				grid[y][x].render(color(220,0,0));
	  		} else {
	  			grid[y][x].render(color(255));
	  		}
	  		
	  	}
  	}

  	optimalPath.forEach(spot => {
  		spot.render(color("#55aadd"));
  	});
}

function heuristicFunc(start, target){
	return dist(start.x, start.y, target.x, target.y);
}

function createMatrix(rows, cols){
	let grid = new Array(rows);
	for(let i = 0; i < grid.length; ++i){
		grid[i] = new Array(cols);
	}
	return grid;
}

function isValidCoordinates(grid, x, y){
	return y >= 0 && y < grid.length && x >= 0
	 && x < grid[y].length;
}


