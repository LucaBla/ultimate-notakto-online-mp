const subBoard = (bRow, bCol) => {
  const createBoard = () => {
    let board = [];

  for (let i = 0; i < 3; i++) {
    board.push(createRow());
  }
  return board;  
  };

  const createRow = () => {
    let row = [];

  for (let i = 0; i < 3; i++) {
    row.push('-');
  }
  return row;
  };

  const addPiece = (row, col) => {
    board[row][col] = 'x';
  };

  const removePiece = (row, col) =>{
    board[row][col] = '-';
  };

  const threeInARow = () => {
    let pieces = 0;

    for(const row of board){
      for (const cell of row){
        if(cell === 'x'){
          pieces++;
          if (pieces === 3){
            return true;
          }
        }
      }
      pieces = 0;
    }
    return false;
  };

  const threeInACol = () =>{
    for(let i = 0; i < 3; i++) {
      if(board[0][i] === 'x' && board[1][i] === 'x' && board[2][i] === 'x'){
        return true;
      }
    }
    return false;
  };

  const threeInADiag = () =>{
    if((board[0][0] === 'x' && board[1][1] === 'x' && board[2][2] === 'x') || 
       (board[0][2] === 'x' && board[1][1] === 'x' && board[2][0] === 'x')){
      return true;
    }
    return false;
  };

  let board = createBoard();
  let lost = false;

  return { board, lost, addPiece, removePiece, threeInARow, threeInACol, threeInADiag}
};

export default subBoard;
