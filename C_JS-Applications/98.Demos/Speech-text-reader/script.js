const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    image:
      'https://cdn.pixabay.com/photo/2015/09/12/21/09/man-937384_960_720.jpg',
    text: "I'm Thirsty",
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2017/12/10/14/47/piza-3010062_960_720.jpg',
    text: "I'm Hungry",
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2015/09/18/16/08/bed-945881_960_720.jpg',
    text: "I'm Tired",
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2018/08/25/07/36/girl-3629520_960_720.jpg',
    text: "I'm Hurt",
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2016/11/08/05/26/woman-1807533_960_720.jpg',
    text: "I'm Happy",
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2017/04/05/20/57/couple-2206294_960_720.jpg',
    text: "I'm Angry",
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2018/05/22/14/00/girl-3421489_960_720.jpg',
    text: "I'm Sad",
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2014/01/15/16/22/cat-245750_960_720.jpg',
    text: "I'm Scared",
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2013/06/29/21/18/wolf-142173_960_720.jpg',
    text: 'I Want To Go Outside',
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2016/11/18/17/46/architecture-1836070_960_720.jpg',
    text: 'I Want To Go Home',
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2015/12/15/06/42/kids-1093758_960_720.jpg',
    text: 'I Want To Go To School',
  },
];

data.forEach(createBox);

function createBox(item) {
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

const message = new SpeechSynthesisUtterance();

let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

function setTextMessage(text) {
  message.text = text;
}

function speakText() {
  speechSynthesis.speak(message);
}

function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

speechSynthesis.addEventListener('voiceschanged', getVoices);

toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);

closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);

voicesSelect.addEventListener('change', setVoice);

readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
