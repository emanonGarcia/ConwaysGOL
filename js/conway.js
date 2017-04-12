let gridWidth = 500;
let gridHeight = 500;

var lifeGrid = createGrid(gridWidth);
var mirrorGrid = createGrid(gridWidth);

document.getElementById("Start").onclick = start;
document.getElementById("Stop").onclick = stop;

var flag = true;

populateGrid();

function start(){

  if (flag){
    drawGrid();
    updateGrid();
    requestAnimationFrame(start)
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
  ctx.fillStyle = '	#F5F5F5';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < gridWidth; i++){
    for (var j = 0; j < gridWidth; j++){
      if (lifeGrid[j][i] === 1){
        ctx.fillStyle = '#228B22';
        ctx.fillRect(j, i, 1, 1);
      }
    }
  }
}

function updateGrid(){
  for (var i = 0; i < gridWidth; i++){
    for (var j = 0; j < gridWidth; j++){

      var bodyCount = 0;

      // console.log('Cell at (' + i + ', ' + j + ') = '  + lifeGrid[i][j]);

      if(i > 0           &&                    lifeGrid[i-1][j])   { bodyCount++; }
      if(i > 0           && j > 0           && lifeGrid[i-1][j-1]) { bodyCount++; }
      if(i > 0           && j < gridWidth-1 && lifeGrid[i-1][j+1]) { bodyCount++; }
      if(i < gridWidth-1 &&                    lifeGrid[i+1][j])   { bodyCount++; }
      if(i < gridWidth-1 && j > 0           && lifeGrid[i+1][j-1]) { bodyCount++; }
      if(i < gridWidth-1 && j < gridWidth-1 && lifeGrid[i+1][j+1]) { bodyCount++; }
      if(                   j > 0           && lifeGrid[i][j-1])   { bodyCount++; }
      if(                   j < gridWidth-1 && lifeGrid[i][j+1])   { bodyCount++; }

      if (lifeGrid[i][j] === 1){
        // console.log('alive')
        if (bodyCount < 2){
          mirrorGrid[i][j] = 0;
          // console.log('now dead')
        }
        else if (bodyCount > 3) {
          mirrorGrid[i][j] = 0;
          // console.log('now dead')
        }
        else {
          mirrorGrid[i][j] = 1;
          // console.log('stay alive');
        }
      }
      else if (lifeGrid[i][j] === 0) {
        // console.log('dead')
        if (bodyCount === 3){
          mirrorGrid[i][j] = 1;
          // console.log('now alve')
        }
        else {
          mirrorGrid[i][j] = 0;
          // console.log('stay dead');
        }
      }

    }
  }
  for (var i = 0; i < gridHeight; i++) {
        for (var j = 0; j < gridWidth; j++) {
            lifeGrid[i][j] = mirrorGrid[i][j];
        }
    }
}
