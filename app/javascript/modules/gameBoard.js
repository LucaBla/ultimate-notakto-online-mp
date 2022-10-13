import subBoard from './subBoard.js';

const gameBoard = (() => {
  const createBoard = () => {
    let board = [];

  for (let i = 0; i < 3; i++) {
    board.push(createRow(i));
  }
  return board;  
  };

  const resetBoard = () => {
    for(const row of board){
      for(const cell of row){
        cell.lost = false;
        for(let i = 0; i < 3; i++){
          for(let j = 0; j < 3; j++){
            cell.removePiece(i, j);
          }
        }
      }
    }
  }

  const createRow = (rIndex) => {
    let row = [];

  for (let i = 0; i < 3; i++) {
    row.push(subBoard(rIndex, i));
  }
  return row;
  };

  const findSubBoard = (row, col) =>{
    return gameBoard.board[row][col]
  };

  const isGameOver = () => {
    return (threeInACol() || threeInARow() || threeInADiag());
  };

  const illegalMove = (playedBoard) => {
    if(gameBoard.playableSubBoard !== null && playedBoard !== gameBoard.playableSubBoard){
      return true;
    }
    else{
      return false;
    }
  };

  const threeInARow = () => {
    let lostBoards = 0;

    for(const row of board){
      for (const subBoard of row){
        if(subBoard.lost === true){
          lostBoards++;
          if (lostBoards === 3){
            return true;
          }
        }
      }
      lostBoards = 0;
    }
    return false;
  };

  const threeInACol = () =>{
    for(let i = 0; i < 3; i++) {
      if(board[0][i].lost === true && board[1][i].lost === true && board[2][i].lost === true){
        return true;
      }
    }
    return false;
  };

  const threeInADiag = () =>{
    if((board[0][0].lost === true && board[1][1].lost === true && board[2][2].lost === true) || 
       (board[0][2].lost === true && board[1][1].lost === true && board[2][0].lost === true)){
      return true;
    }
    return false;
  };


  const board = createBoard();
  const playableSubBoard = null;


  return {
    board, playableSubBoard, createBoard, resetBoard, findSubBoard, isGameOver, illegalMove
  };
})();

export default gameBoard;