import * as ModalManager from './modal.js';
import * as Music from './music.js';

function openRules(){
  var modal = ModalManager.createModal();

  Music.whoosh.play();
  populateRules(modal);
}

function populateRules(modal){
  var closeBtn = document.createElement('button');
  var header = document.createElement('h2');
  var img = document.createElement('img');
  var btnsWrapper = document.createElement('div');
  var textRulesBtn = document.createElement('button');
  var creditsBtn = document.createElement('button');
  var nextBtn = document.createElement('button');

  closeBtn.innerHTML ='<i class="fas fa-times"></i>';
  closeBtn.classList.add('close-btn');
  closeBtn.addEventListener('click', ModalManager.closeModal);

  header.textContent = 'Notakto Rules'

  img.src = '/assets/gifs/video_rules_1-9d3e506500d2b4b1e45123507c7d8071e66fb8db687ffb62f845a29965603094.gif';
  img.classList.add('rules-img', '1');

  textRulesBtn.innerHTML = '<i class="far fa-file-alt"></i>';
  textRulesBtn.addEventListener('click', ShowTextRules);

  creditsBtn.innerHTML = '<i class="fas fa-code"></i>';
  creditsBtn.addEventListener('click', ShowCredits);

  nextBtn.innerHTML = '<i class="fas fa-arrow-right"></i>';
  nextBtn.addEventListener('click', nextRule);

  btnsWrapper.classList.add('btn-wrapper');

  btnsWrapper.appendChild(textRulesBtn);
  btnsWrapper.appendChild(creditsBtn);
  btnsWrapper.appendChild(nextBtn);

  modal.appendChild(closeBtn);
  modal.appendChild(header)
  modal.appendChild(img);
  modal.appendChild(btnsWrapper);
}

function ShowTextRules(){
  var modal = document.getElementsByClassName('modal')[0];
  var closeBtn = document.createElement('button');
  var header = document.createElement('h2');
  var rules = document.createElement('div');

  Music.whoosh.play();

  modal.classList.add('modal', 'animate__animated', 'animate__bounceOutRight')

  modal.addEventListener('animationend', () =>{
    document.getElementsByClassName('modal-bg')[0].remove();
    header.textContent = 'Notakto Rules'
    modal = ModalManager.createModal();
    modal.classList.add('scroll-modal');
    fetchRules();
    modal.appendChild(closeBtn);
    modal.appendChild(header);
    modal.appendChild(rules);
    rules.classList.add('text-rules');

    closeBtn.innerHTML ='<i class="fas fa-times"></i>';
    closeBtn.classList.add('close-btn');
    closeBtn.addEventListener('click', ModalManager.closeModal);
  });

}

function ShowCredits(){
  var modal = document.getElementsByClassName('modal')[0];
  var closeBtn = document.createElement('button');
  var header = document.createElement('h2');
  var credits = document.createElement('div');
  var feedback = document.createElement('div');

  Music.whoosh.play();

  modal.classList.add('modal', 'animate__animated', 'animate__bounceOutRight')

  modal.addEventListener('animationend', () =>{
    document.getElementsByClassName('modal-bg')[0].remove();
    header.textContent = 'Credits'
    modal = ModalManager.createModal();
    modal.appendChild(closeBtn);
    modal.appendChild(header);
    modal.appendChild(credits);
    modal.appendChild(feedback);

    credits.classList.add('credits');
    feedback.classList.add('feedback');

    credits.innerHTML = "<table><tr><td>Made by</td><td><a href='https://github.com/LucaBla' target='_blank'>Luca Blazevic <i class='fab fa-github'></i></a></td></tr><tr><td>Music by</td><td><a href='https://www.patrickdearteaga.com' target='_blank'>Patrick de Arteaga <i class='fas fa-music'></i></a></td></tr></table>";

    feedback.innerHTML = "<a href='mailto:me@lucablazevic.dev'>Any Feedback? <i class='fas fa-envelope'></i></a>";

    closeBtn.innerHTML ='<i class="fas fa-times"></i>';
    closeBtn.classList.add('close-btn');
    closeBtn.addEventListener('click', ModalManager.closeModal);
  });
}

function nextRule(){
  let newRule = parseInt(document.getElementsByClassName('rules-img')[0]
                                 .classList[document.getElementsByClassName('rules-img')[0]
                                 .classList.length-1]) +1;
  if(newRule > 6){
    return
  }
  else{
    document.getElementsByClassName('rules-img')[0].classList.replace(newRule-1,newRule);
    document.getElementsByClassName('rules-img')[0].src = "/assets/gifs/video_rules_" + newRule +".gif";
  }
}

function fetchRules(){
  fetch('/assets/rules-6b25ae3666a7084422cf427bbfd4246d85a9e3e3a8410a5667cbae30d0f4b489.txt')
  .then((resp) => resp.text())
  .then(data => {
    document.getElementsByClassName('text-rules')[0].innerHTML = data;
  }) 
}

export {openRules};
