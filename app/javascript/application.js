// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

import * as Music from './modules/music.js';
import * as ModalManager from './modules/modal.js';
import * as GameSettings from './modules/gameSettings.js';
import * as Rules from './modules/rules.js';

document.getElementsByClassName("play-btn")[0].addEventListener('click', GameSettings.openGameSettings);
document.getElementsByClassName("rules-btn")[0].addEventListener('click', Rules.openRules);
document.getElementsByClassName("mute-btn")[0].addEventListener('click', Music.changeMute);
document.getElementsByClassName("vol")[0].addEventListener("input", Music.setVol);
document.addEventListener('visibilitychange', handleVisibilityChange, false);

if (window.location.pathname === '/'){
  ModalManager.openMusicModal();
}
else{
  ModalManager.animateTitle();
  document.getElementsByTagName('audio')[0].volume = document.getElementsByClassName('vol')[0].value /100;
  document.getElementsByClassName('menu')[0].getElementsByClassName('buttons')[0].style.display = 'none';
  document.getElementsByTagName('header')[0].style.zIndex= '10000';
  document.getElementsByClassName('menu')[0].style.zIndex= '10000';
  if(document.getElementById("link-copy-button") != undefined){
        document.getElementById("link-copy-button").addEventListener("click", copyLink);
  }
}
changeMobileWidget();

function copyLink(){
    var copyText = document.getElementById("link-copy");

    copyText.select();
    copyText.setSelectionRange(0, 99999);
  
    navigator.clipboard.writeText(copyText.value);
}

async function changeMobileWidget(){
  document.getElementsByClassName('floatingchat-container-mobi')[0].contentWindow.document
          .getElementsByClassName('floatingchat-donate-button')[0]
          .getElementsByTagName('span')[0].style.display = 'none';

  document.getElementsByClassName('floatingchat-container-mobi')[0].contentWindow.document
          .getElementsByClassName('floatingchat-donate-button')[0]
          .getElementsByTagName('img')[0].style.width = '26px';

  document.getElementsByClassName('floatingchat-container-mobi')[0].contentWindow.document
          .getElementsByClassName('floatingchat-donate-button')[0].style.padding = '0px 12px';

  await new Promise(resolve => setTimeout(resolve, 800));

  document.getElementsByClassName('floatingchat-container-mobi')[0].contentWindow.document
          .getElementsByTagName('html')[0].style.width = '50px';

  document.getElementsByClassName('floatingchat-container-mobi')[0].style.width = '50px';

  document.getElementsByClassName('floatingchat-container-wrap-mobi')[0].style.width = '50px';
}

function handleVisibilityChange() {
  if (document.hidden) {
    document.getElementsByTagName('audio')[0].pause();
  } else if(Music.muted === false){
    Music.playSound(document.getElementsByTagName('audio')[0]);
  }
}

import "channels"
