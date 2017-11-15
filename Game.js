const canvas = document.getElementById('tic');
  const tic = canvas.getContext('2d');
  
  const backImage1 = new Image();
  backImage1.src = 'http://www.pharmacy-tech-test.com/images/alligation_empty_grid.jpg';
  
  const backImage = new Image();
  backImage.src = 'http://www.dreamincode.net/forums/uploads/post-97990-1260678617.png';
  const nolik = new Image();
  nolik.src ='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Ireland_road_sign_RUS_021.svg/480px-Ireland_road_sign_RUS_021.svg.png';
  
  let isHuman = true	;
  const board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];
  const nextMove = function(x){
    for (let i=0;i<x.length;i++){
      for (let j=0;j<x.length;j++){
        if(x[i][j]===" "){
          return [i,j];				
        }
      }
      
    }
  };
  const makeMove = function(board, coords, isX) {
    if((coords[0] === 0 || coords[0] === 1 || coords[0] === 2) && (coords[1] === 0 || coords[1] === 1 || coords[1] === 2)) {
      if(isX) {
        board[coords[0]][coords[1]] = 'x';
      } else {
        board[coords[0]][coords[1]] = 'o';
      }
      return 0;
    }
    return -1;
  };
  
  const findWinner = function(board){
    for(i=0;i<board.length;i++){
      if(board[i][0]===board[i][1] && board[i][1]===board[i][2] && board[i][1]!==' '){
        return {
          winner: board[i][0],
          winningLocations: [[i,0],[i,1],[i,2]]
        } 
      }
    }
    for(i=0;i<board.length;i++){
      if(board[0][i]===board[1][i] && board[1][i]===board[2][i] && board[1][i]!==' '){
        return {
          winner: board[0][i],
          winningLocations: [[0,i],[0,i],[0,i]]
        } 
      }
    }
    if(board[0][0]===board[1][1] && board[1][1]===board[2][2] && board[0][0]!==' '){
      return {
        winner: board[1][1],
        winningLocations: [[0,0],[1,1],[2,2]]
      } 
    }
    if(board[0][2]===board[1][1] && board[1][1]===board[2][0] && board[0][2]!==' '){
      return {
        winner: board[1][1],
        winningLocations: [[0,2],[1,1],[2,0]]
      } 
    }
    if(!board.toString().includes(' ')){ ///// toString-@ array@ darcnum a string
      return {
        winner: 'nobody' // nobody won, game over
      }
    }
  };	
  
  /*const drawLines = function (strokeStyle) {
  const lineStart = 4;
  const lineLenght = canvas.width - 5;
  tic.strokeStyle = strokeStyle;
  tic.beginPath();
  for (let y = 0; y <= 3;y++) {  
  tic.moveTo(lineStart, y * canvas.width / 3);
  tic.lineTo(lineLenght, y * canvas.width / 3);
  }
  for (let x = 0;x <= 3;x++) {
  tic.moveTo(x * canvas.width / 3, lineStart);
  tic.lineTo(x * canvas.width / 3, lineLenght);
  }
  tic.stroke();
  }
  /*
  const drawX = function(x, y) {
  tic.strokeStyle = "#f1be32";
  tic.beginPath();
  tic.moveTo(x + 50, y + 50);
  tic.lineTo(x + canvas.width / 3 - 50, y + canvas.width / 3 - 50);
  tic.moveTo(x + 50, y + canvas.width / 3 - 50);
  tic.lineTo(x + canvas.width / 3 - 50, y + 50);
  tic.stroke();
  };
  const drawO = function(x, y) {
  //tic.lineWidth = 10;
  tic.strokeStyle = "#01bBC2";
  tic.beginPath();
  tic.arc(x + (0.5 * canvas.width / 3),  y + (0.5 * canvas.width / 3), (canvas.width / 3 - 100) / 2, 0, 2 * Math.PI);
  tic.stroke();
  };*/
  const drawLines = function(){
      tic.drawImage(backImage1, 0, 0,canvas.width,canvas.height);
  };
  const drawX = function(x,y){
    tic.drawImage(backImage, x, y,150,150);
  };
  const drawO = function(x,y){
    tic.drawImage(nolik, x, y,150,150);
  };
  backImage1.onload = drawLines;
  
  const first = function() {
    if(!isHuman) {
      const next = nextMove(board);
      if(makeMove(board, next) === 0) {
        makeMove(board, next);
        drawO(next[1] * (canvas.width / 3), next[0] * (canvas.width / 3));
      }
    }
    isHuman = !isHuman;
  };
  first()
  let isWin = false;
  let isFirst = false;
  canvas.addEventListener('mousedown', function(e) {
    if(board[Math.floor(e.offsetY/(canvas.width / 3))][Math.floor(e.offsetX/(canvas.width / 3))] === ' ') {
      board[Math.floor(e.offsetY/(canvas.width / 3))][Math.floor(e.offsetX/(canvas.width / 3))] = 'x';
      drawX(Math.floor(e.offsetX/(canvas.width / 3)) * (canvas.width / 3), 
        Math.floor(e.offsetY/(canvas.width / 3)) * (canvas.width / 3));
      isFirst = false;
      isHuman = false;
    }
    if(isWin) {
      for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board.length; j++) {
          board[i][j] = ' ';
        }
      }
      tic.clearRect(0, 0, canvas.width, canvas.height);
      drawLines();
      isWin = false;
      isHuman = !isHuman;
      first();
      isFirst = true;
    }
    if(findWinner(board)) {
      isWin = true;
    }
  });
  canvas.addEventListener('mouseup', function(e) {
    if(!isFirst && !isWin && !isHuman) {
      isHuman = true;
      const next = nextMove(board);
      if(makeMove(board, next) === 0) {
        makeMove(board, next);
        drawO(next[1] * (canvas.width / 3), next[0] * (canvas.width / 3));
      }
      if(findWinner(board)) {
        isWin = true;
      }
    }
  });