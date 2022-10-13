import * as Music from './music.js';
import gameBoard from './gameBoard.js';
import gameMaster from './gameMaster.js';

const displayController = (() => {

  const hideAfterTime = async () =>{
    await new Promise(resolve => setTimeout(resolve, 1200));
    document.getElementsByClassName('menu')[0].classList.add('hidden');
  };

  const hideBtns = () => {
    document.getElementsByClassName('buttons')[0].classList.add('hidden-ani');
  };

  const showBtns = () => {
    document.getElementsByClassName('buttons')[0].classList.remove('hidden-ani');
  };

  const hideWave = async () =>{
    document.getElementsByTagName('main')[0].classList.add('slide-down-main');
    document.getElementsByClassName('menu')[0].classList.add('animate__animated', 'animate__slideOutDown');
    document.getElementsByClassName('menu')[0].addEventListener('animationend', hideAfterTime);
    document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    await new Promise(resolve => setTimeout(resolve, 2500));
    document.getElementsByClassName('menu')[0].removeEventListener('animationend', hideAfterTime);
    document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
  };

  const showWave = () =>{
    document.getElementsByClassName('menu')[0].classList.remove('hidden', 'animate__slideOutDown');
    document.getElementsByClassName('menu')[0].classList.add('animate__slideInUp');
  };

  const showActivePlayerLabel = async () =>{
    await new Promise(resolve => setTimeout(resolve, 2200));
    document.getElementsByClassName('active-player-label')[0].style.display = 'block';
  };

  const reloadActivePlayerLabel = (playerNumber) => {
    document.getElementsByClassName('active-player-label')[0].innerHTML = "Player "+ playerNumber+"s Turn";
    document.getElementsByClassName('active-player-label')[0].classList.add('show-active-player-label');
  };

  const hideActivePlayerLabel = () =>{
    document.getElementsByClassName('active-player-label')[0].style.display = 'none';
  };

  const addPieceToHTML = (tar) => {
    Music.stroke.play();
    tar.appendChild(document.getElementsByTagName('template')[0].content.cloneNode(true));
  };

  const closeSubBoard = (evt) => {
    const subBoard = evt.currentTarget.parentElement.parentElement;
    Music.lostBoardsSound.play();
    subBoard.classList.add('lost-subboard', 'animate__animated', 'animate__flash');
    for(const row of Array.from(subBoard.children)){
      for(const cell of Array.from(row.children)){
        cell.removeEventListener('click', gameMaster.playRound);
      }
    }
  };

  const showPlayableBoard = (row, col) =>{
    if(gameBoard.playableSubBoard === null){
      let subBoards = document.querySelectorAll('.sub-board');
      subBoards.forEach((element) => {
        if(!element.classList.contains('lost-subboard')){
          element.classList.replace('ph', 'playable')
        }
      }); 
    }
    else{
      const board = document.getElementsByClassName('board')[0];
      const bRow = board.querySelector('.b-row-' + row);
      const subBoard = bRow.querySelector('.sub-board-' + col)

      subBoard.classList = '';
      subBoard.classList.add('playable', 'sub-board', 'sub-board-' + col);
    }
  };

  const removePlayableBoard = () => {
    if(document.getElementsByClassName('playable').length !== 0){
      document.querySelectorAll('.playable').forEach(element => element.classList.replace('playable', 'ph'));
    }
  };

  const showGameOverScreen = (winner) => {
    document.getElementsByTagName('audio')[0].pause();
    document.getElementsByTagName('audio')[0].src = './audio/Chiptronical.mp3';
    document.getElementsByTagName('audio')[0].play();

    document.getElementsByTagName('main')[0].classList.remove('slide-down-main');
    
    showWave();
    hideActivePlayerLabel();
    showBtns();
    startConfetti();

    showWinnerHeader(winner);

    xDance();
  };

  const showWinnerHeader = (winner) =>{
    let h2 = document.getElementsByTagName('main')[0].appendChild(document.createElement('h2'));
    h2.textContent = 'Congratulations Player ' + winner.playerNumber + ' you won!';
    h2.classList.add('winner-header', 'animate__animated' ,'animate__bounceInDown');
    h2.addEventListener('animationend', () => {
      h2.classList.remove('animate__bounceInDown');
      h2.classList.add('animate__tada', 'animate__infinite', 'animate__slower');
    });
  };

  const xDance = () =>{
    let pieces = Array.from(document.getElementsByClassName('x'));
    let pieceIndex = 0;
    let piece = pieces[pieceIndex];

    for(let i = 0; i < pieces.length; i++) {
      pieceIndex = Math.floor(Math.random()*pieces.length);
      piece = pieces[pieceIndex];
      piece.classList.add('dance');
      pieces.splice(pieceIndex, 1);
    }
  };

  const removeGameOverScreen = () => {
    if(document.getElementsByClassName('winner-header').length !== 0){
      document.getElementsByClassName('winner-header')[0].remove();
    }
    stopConfetti();
  };

  const removeSubBoardBorders = () =>{
    let lostBoards = Array.from(document.getElementsByClassName('lost-subboard'));
    let playableSubBoards = Array.from(document.getElementsByClassName('playable'));

    lostBoards.forEach(element => element.classList.remove('lost-subboard',  'animate__animated', 'animate__flash'));
    playableSubBoards.forEach(element => element.classList.replace('playable', 'ph'));
  };

  return {
    hideBtns, showBtns, hideWave, showWave, showActivePlayerLabel, hideActivePlayerLabel, reloadActivePlayerLabel,
    addPieceToHTML, closeSubBoard, showPlayableBoard, removePlayableBoard, showGameOverScreen, 
    removeGameOverScreen, removeSubBoardBorders
  };

})();

export default displayController;