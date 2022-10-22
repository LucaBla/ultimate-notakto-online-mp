import consumer from "channels/consumer"
import displayController from '../modules/displayController.js';
import * as Music from '../modules/music.js';
import * as ModalManager from '../modules/modal.js';

if(document.getElementsByClassName("board-wrapper").length != 0){
  const room_id = Number(document.getElementsByClassName("board-wrapper")[0].getAttribute('data-room-id'))

  consumer.subscriptions.create({ channel: "RoomChannel", room_id: room_id }, {
    connected() {
      // Called when the subscription is ready for use on the server
      //console.log('connected to ' + room_id);
    },
  
    disconnected() {
      // Called when the subscription has been terminated by the server
      //console.log('disconnected');
    },
  
    received(data) {
      // Called when there's incoming data on the websocket for this channel
      const boardWrapper = document.getElementsByClassName('board-wrapper')[0];
      const userId = boardWrapper.getAttribute('data-user-id');
      const activePlayerLabel = document.getElementsByClassName('active-player-label')[0];
      const playerCount = document.getElementsByClassName("player-count")[0];
      //console.log(data)
      if(data.object === 'reset'){
        displayController.resetMPBoard(data, activePlayerLabel, userId);
      }
      else if(data.object === 'player_created'){
        if(document.getElementsByClassName('submit-player2')[0] != null){
          // removes second players join game button
          document.getElementsByClassName('submit-player2')[0].remove();
        }
        if(document.getElementsByClassName("submit-modal")[0]!= null){
          displayController.enableMPSubmit();
        }
      }
      else if(data.object === 'player_count'){
        boardWrapper.innerHTML = data.html2;
        if(playerCount != null){
          playerCount.innerHTML = data.html + playerCount.innerHTML.slice(-2);
        }
      }
      else if(data.object === 'modal'){
        if(document.getElementsByClassName('modal')[0] != null){
          ModalManager.closeModal();
          Music.playDreaming();
          displayController.showActivePlayerLabel();
        }else{
          Music.playSound(Music.stroke);
        }
        boardWrapper.innerHTML = data.html;
        activePlayerLabel.innerHTML = 'Player ' + data.next_player_num + 's turn'
        if(userId != document.getElementsByClassName('board')[0].getAttribute('data-active-player')){
          document.getElementsByClassName('board')[0].classList.add('click-forbidden')
        }
        if(document.getElementsByClassName('board')[0].getAttribute('data-gameover') === 'true'){
          displayController.showGameOverScreenMP(data.next_player_num);
          if(userId == boardWrapper.getAttribute('data-host-id')
            ){
              var replayButton = document.getElementById('replay-btn').content.cloneNode(true)
              document.getElementsByClassName('menu')[0].appendChild(replayButton);
          }
        }
        if(document.getElementsByClassName('animate__flash').length != 0)
          Music.playSound(Music.lostBoardsSound);
      }
    }
  });
}