import consumer from "channels/consumer"
import displayController from '../modules/displayController.js';

if(document.getElementsByClassName("board-wrapper").length != 0){
  const room_id = Number(document.getElementsByClassName("board-wrapper")[0].getAttribute('data-room-id'))

  consumer.subscriptions.create({ channel: "RoomChannel", room_id: room_id }, {
    connected() {
      // Called when the subscription is ready for use on the server
      console.log('connected to ' + room_id);
    },
  
    disconnected() {
      // Called when the subscription has been terminated by the server
      console.log('disconnected');
    },
  
    received(data) {
      // Called when there's incoming data on the websocket for this channel
      console.log(data)
      if(data.player_count !== 2 && data.object !== 'player_count' && data.object !== 'modal'){
        return
      }
      else if(data.object === 'piece'){
        document.getElementsByClassName("board-wrapper")[0].innerHTML = data.html;
      }
      else if(data.object === 'player_count' && document.getElementsByClassName("player-count").length !== 0){
        document.getElementsByClassName("player-count")[0].innerHTML = data.html + document.getElementsByClassName("player-count")[0].innerHTML.slice(-2);
      }
      if(data.object === 'player_count' && data.html2 !== ''){
        document.getElementsByClassName("board-wrapper")[0].innerHTML = data.html2;
      }
      else if(data.object === 'player_count' && data.html2 === ''){
        document.getElementsByClassName("board-wrapper")[0].innerHTML = data.html2;
        //document.getElementsByTagName("main")[0].innerHTML = data.html3;
      }
      if(data.object === 'player_count' && data.html === '2' &&
         document.getElementsByClassName("submit-modal")[0]!= null){
        document.getElementsByClassName("submit-modal")[0].disabled = false;
        document.getElementsByClassName("submit-modal")[0].classList.remove('disabled');
      }
      if(data.object === 'modal'){
        if(document.getElementsByClassName('modal')[0] != null){
          var modal = document.getElementsByClassName('modal')[0];
          modal.classList.add('modal', 'animate__animated', 'animate__bounceOutRight')
          modal.addEventListener('animationend', () =>{
            document.getElementsByClassName('modal-bg')[0].remove();
            displayController.hideWave();
          });
        }
        document.getElementsByClassName("board-wrapper")[0].innerHTML = data.html;
        if(document.getElementsByClassName('board')[0].getAttribute('data-gameover') === 'true'){
          displayController.showGameOverScreenMP(data.winner);
        }
      }
      
    }
  });
}
