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

  img.src = '/dev-assets/gifs/video_rules_1-9d3e506500d2b4b1e45123507c7d8071e66fb8db687ffb62f845a29965603094.gif';
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
    if(document.getElementsByClassName('rules-img')[0].classList[1] == '2'){
      document.getElementsByClassName('rules-img')[0].src = "/dev-assets/gifs/video_rules_2-2e6e786192c352b2b707b7a5071b7eb08baf1392f87d7f9860fe23282fea0605.gif";
    }
    else if(document.getElementsByClassName('rules-img')[0].classList[1] == '3'){
      document.getElementsByClassName('rules-img')[0].src = "/dev-assets/gifs/video_rules_3-6c0bf70f44eeff25211f0eeb9348464b0a7d0d12f2731a70c0f2f9ff37095768.gif";
    }
    else if(document.getElementsByClassName('rules-img')[0].classList[1] == '4'){
      document.getElementsByClassName('rules-img')[0].src = "/dev-assets/gifs/video_rules_4-a4e112aae74b2847c96e70733af6361da8da672d8233c77d8083b0bbc4d4572d.gif";
    }
    else if(document.getElementsByClassName('rules-img')[0].classList[1] == '2'){
      document.getElementsByClassName('rules-img')[0].src = "/dev-assets/gifs/video_rules_5-5cd8b2536e95e2eb29fde4a5e066e52a538276aad28e3a5f4544e092b2b90fd2.gif";
    }
    else if(document.getElementsByClassName('rules-img')[0].classList[1] == '6'){
      document.getElementsByClassName('rules-img')[0].src = "/dev-assets/gifs/video_rules_6-7b68fcf94e22598b918f56f534087db471865db8b26845dfe0d328672f55a14b.gif";
    }
  }
}

function fetchRules(){
  fetch('/dev-assets/rules-d41d6398f22221c2a4a0d944ab83b60360d1d7855cb04a2fd34b7ed5e1149715.txt')
  .then((resp) => resp.text())
  .then(data => {
    document.getElementsByClassName('text-rules')[0].innerHTML = data;
  }) 
}

export {openRules};
