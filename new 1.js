	 
	 /*
const Diamond = function(erkarutyun,c){
	if(erkarutyun % 2 === 0) {
		erkarutyun = erkarutyun - 1;
	}
const AstxKamSpace = function(n, c){
if(n<=0){
	return "";
}
return c + AstxKamSpace(n-1,c);
	};
	const kpic = function(spaceN, toxN, tox){
			if (tox >erkarutyun){
				return "";
			}
			console.log(AstxKamSpace(spaceN, " " )+AstxKamSpace(toxN,c));
			if(tox<=erkarutyun/2){
				kpic(spaceN+ -1, toxN+2, tox+1);
			} else {
				kpic(spaceN +1, toxN-2,tox+1);
			}
	};
	kpic(erkarutyun-1/2,1,1);
};
Diamond(5,"*");
*/



/*

const prDimond = function(erk, ch) {
	if(erk % 2 === 0) {
		erk = erk - 1;
	}
	const Astgh = function(n, char) {
		let m = '';
		for(let i = 0; i < n; i++) {
			m = m + char;
		}
		return m;
	};
	let spaceN = (erk-1)/2;
	let toxN = 1;
	for(let i = 1; i <= erk; i++){
		console.log(Astgh(spaceN, ' ') + Astgh(toxN, ch));
		if(i <= erk/2) {
			spaceN = spaceN -1;
			toxN = toxN + 2;
		} else {
			spaceN = spaceN + 1;
			toxN = toxN-2;
		}
	}
};
prDimond(6,"*");

*/

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

let isX = true;
while(true){
	let next = nextMove(board, isX);
	if(makeMove(board, next, isX) === -1) {
		alert("I'm sorry, something is wrong");
		break;
	}
	makeMove(board, next, isX);
	if(findWinner(board) !== undefined) {
		alert("Game over, " + findWinner(board)["winner"] + " won!");
		break;
	}
	isX = !isX;
}