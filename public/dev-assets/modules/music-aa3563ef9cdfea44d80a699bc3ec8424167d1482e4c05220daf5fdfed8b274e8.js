////////////Music///////////////
//const stroke = new Audio('/assets/audios/pen-stroke2.mp3');
const stroke = new Audio('/dev-assets/pen-stroke2-ac55732bf13bd5b924e90fac88ed11ee01ef3f94427577837dafe007c43fb2d7.mp3');
const lostBoardsSound = new Audio('/dev-assets/board-lost-4da14a44bc61c5ce1a4b469351a436d573c3329f27de657e9991a9b2fccd74ea.mp3');
const whoosh = new Audio('/dev-assets/whoosh-c26ad79dc7e8ac787d24cf07f06795ba51b6a635498065ec3942caa255d6fd7a.mp3');


function setVol(){
  var volSlider = document.getElementsByClassName('vol')[0];

  stroke.volume = volSlider.value / 100;
  lostBoardsSound.volume = volSlider.value / 100;
  whoosh.volume = volSlider.value / 100;
  document.getElementsByTagName('audio')[0].volume = volSlider.value /100;
}

function playDreaming(){
  document.getElementsByTagName('audio')[0].pause();
  document.getElementsByTagName('audio')[0].src = '/dev-assets/Dreaming-8e53e502e54e7a307db554c778bec899c989eb24f4a2cb416e9061f70733db25.mp3';
  document.getElementsByTagName('audio')[0].play();
}

export {stroke, lostBoardsSound, whoosh, setVol, playDreaming};
