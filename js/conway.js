let gridWidth = 400;
let gridHeight = 400;
var lifeGrid = createGrid(gridWidth);
var mirrorGrid = createGrid(gridWidth);

document.getElementById("Start").onclick = start;
document.getElementById("Stop").onclick = stop;

var flag = true;
function start(){
  // populateGrid();
  if (flag){
    populateGrid(); // Just to demonstrate
    drawGrid();
    // updateGrid();
    setTimeout(start, 500);
    }
}

function stop(){
    flag = false;
}

function createGrid(gridWidth){
  for (var i = 0; i < gridWidth; i++) {
    grid = []
    for (var j = 0; j < gridWidth; j++) {
      grid.push([])
    }
  }
  return grid
}

function populateGrid(){
  for (var i = 0; i < gridWidth; i++){
    for (var j = 0; j < gridWidth; j++){
      var alive = [true, false];
        vivus =  Math.floor(Math.random(alive) * alive.length);
        if (vivus === 1) {
          lifeGrid[j][i] = 1;
        } else {
          lifeGrid[j][i] = 0;
        }
    }
  }
}

function drawGrid(){
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'lightgrey'; // sets the color to fill in the rectangle with
  ctx.fillRect(0, 0, canvas.width, canvas.width);

  for (var i = 0; i < gridWidth; i++){
    for (var j = 0; j < gridWidth; j++){
      if (lifeGrid[j][i] === 1){
        ctx.fillStyle = 'green';
        ctx.fillRect(j, i, 1, 1);
      }
    }
  }
}

function getNeighbors(j, i){
    //index error....
    console.log(j, i)
    // x-1,y-1   x,y-1   x+1,y-1
    // x-1,y     x,y     x+1,y
    // x-1,y+1   x,y+1   x+1, y+1
    // console.log(j, i)
    let y = j;
    let x = i;
    let xe = x-1;
    let xw = x+1;
    let yn = y-1;
    let ys = y+1;
    let ne = mirrorGrid[xe][yn];
    let n  = mirrorGrid[x][yn];
    let nw = mirrorGrid[xw][yn];
    let e  = mirrorGrid[xe][y];
    let w  = mirrorGrid[xw][y];
    let se = mirrorGrid[xe][ys];
    let s  = mirrorGrid[x][ys];
    let sw = mirrorGrid[xw][ys];

    var neighbors = [ne,n,nw,e,w,se,s,sw];
    var count = 0
    for(var i = 0; i < neighbors.length; i++){
      count = count + neighbors[i]
    }
    console.log(count)
}

function updateGrid(){
  mirrorGrid = lifeGrid
  for (var i = 0; i < gridWidth; i++){
    for (var j = 0; j < gridWidth; j++){
      var bodyCount = getNeighbors(j,i); // generates and index erros

      // Test cases
      if (mirrorGrid[j][i] === 1){
        if (bodyCount < 2){
          mirrorGrid[j][i] = 0;
        }
        else if (bodyCount > 3) {
          mirrorGrid[j][i] = 0;
        }
      }
      else if (mirrorGrid[j][i] === 0) {
        if (bodyCount === 3){
          mirrorGrid[j][i] = 1;
        }
      }

  lifeGrid = mirrorGrid

    }
  }
}
