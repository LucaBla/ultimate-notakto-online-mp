import * as Music from './music.js';

function animateTitle(){
  var title = document.getElementsByClassName('title')[0];

  title.classList.toggle('hidden');
  title.classList.add('animate__jackInTheBox');
}

function createModal(){
  var modalBg = document.createElement('div');
  var modal = document.createElement('div');

  modalBg.classList.add('modal-bg')
  modal.classList.add('modal', 'animate__animated', 'animate__bounceInLeft')

  modalBg.appendChild(modal);

  document.getElementsByTagName('body')[0].prepend(modalBg);
  Music.playSound(Music.whoosh);

  return modal;
}

function closeModal(){
  var modal = document.getElementsByClassName('modal')[0];

  
  Music.playSound(Music.whoosh);
  modal.classList.add('modal', 'animate__animated', 'animate__bounceOutRight')
  modal.addEventListener('animationend', () =>{
    document.getElementsByClassName('modal-bg')[0].remove();
  });
}

function openMusicModal(){
  var modal = createModal();
  var header = document.createElement('h2');
  var subTitle = document.createElement('p');
  var buttonsWrapper = document.createElement('div');
  var musicBtn = document.createElement('button');
  var noMusicBtn = document.createElement('button');

  header.textContent = 'Activate Sound?';
  subTitle.textContent = '(Recommended)';

  musicBtn.innerHTML = '<i class="fas fa-check"></i>';
  noMusicBtn.innerHTML = '<i class="fas fa-times"></i>';

  header.classList.add('music-title');
  subTitle.classList.add('sub-title');
  buttonsWrapper.classList.add('btn-wrapper');

  musicBtn.addEventListener('click', closeModal);
  musicBtn.addEventListener('click', ()=>{
    document.getElementsByTagName('audio')[0].load();
    Music.changeMute();
    document.getElementsByTagName('audio')[0].volume = document.getElementsByClassName('vol')[0].value /100;
    Music.stroke.volume = document.getElementsByClassName('vol')[0].value /100;
    Music.whoosh.volume = document.getElementsByClassName('vol')[0].value /100;
    Music.lostBoardsSound.volume = document.getElementsByClassName('vol')[0].value /100;

    animateTitle();
  });
  noMusicBtn.addEventListener('click', () =>{
    document.getElementsByClassName('vol')[0].value = 10;
    closeModal();
    animateTitle();
  });

  buttonsWrapper.appendChild(musicBtn);
  buttonsWrapper.appendChild(noMusicBtn);

  modal.appendChild(header);
  modal.appendChild(subTitle);
  modal.appendChild(buttonsWrapper);
}

export {createModal, openMusicModal, closeModal, animateTitle};