import * as ModalManager from './modal.js';
import * as Music from './music.js';
import gameMaster from './gameMaster.js';

function openGameSettings() {
  var modal = ModalManager.createModal();

  Music.whoosh.play();
  populateGameSettings(modal);

}

function populateGameSettings(modal) {
  var header = document.createElement('h2');
  var closeBtn = document.createElement('button');

  closeBtn.innerHTML ='<i class="fas fa-times"></i>';
  closeBtn.classList.add('close-btn');
  closeBtn.addEventListener('click', ModalManager.closeModal);

  header.innerHTML = 'Create a Game'

  modal.appendChild(header);
  modal.appendChild(closeBtn);
  modal.appendChild(createForm());

}

function createForm(){
  var form = document.createElement('form');

  var submitBtn = document.createElement('input');

  var selectMode = document.createElement('select');
  var selectDiff = document.createElement('select');
  var selectStarter = document.createElement('select');

  var gamemodes = ['Player vs Bot','Player vs Player','Bot vs Bot']
  var difficulty = ['Easy','Medium','Hard']
  var starter = ['1', '2', 'random']

  var gamemodesField = document.createElement('div');
  var difficultyField = document.createElement('div');
  var starterField = document.createElement('div');

  selectMode.setAttribute("id", 'gamemodes');
  selectDiff.setAttribute("id", 'difficulty');
  selectStarter.setAttribute("id", 'starter');

  createLabel('gamemodes', 'Gamemode', gamemodesField)
  populateSelectOptions(gamemodesField, selectMode, gamemodes)

  createLabel('difficulty', 'Bot Difficulty', difficultyField)
  populateSelectOptions(difficultyField, selectDiff, difficulty)

  createLabel('starter', 'Starting Player', starterField)
  populateSelectOptions(starterField, selectStarter, starter)

  submitBtn.type = 'submit'
  submitBtn.value = 'Start'

  form.addEventListener('submit', createGame);

  form.appendChild(gamemodesField);
  form.appendChild(difficultyField);
  form.appendChild(starterField);
  form.appendChild(submitBtn);

  return form;
}

function populateSelectOptions(field, select, optionsArr){

  optionsArr.forEach(function(optionArr) {
    var option = document.createElement('option');
    option.value = optionArr;
    option.text = optionArr;
    select.appendChild(option);
  });
  field.appendChild(select)
}

function createLabel(select, text, field){
  var label = document.createElement('label');
  label.setAttribute('for', select)
  label.innerHTML = text

  field.appendChild(label)
}

function createGame(event){
  event.preventDefault();

  var form = document.getElementsByTagName('form')[0]
  var values = {};

  values['gamemode']= form.gamemodes.value;
  values['difficulty']= form.difficulty.value;
  values['starter']= form.starter.value;

  ModalManager.closeModal();
  gameMaster.start(values);
}

export {openGameSettings};