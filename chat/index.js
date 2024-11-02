const ws = new WebSocket('ws://localhost:3000');
const chatDiv = document.getElementById('chat');
let uuid = null;

ws.onmessage = (event) => {
  const json = JSON.parse(event.data);
  console.log(json);
  if (json.uuid) {
    uuid = json.uuid;
  } else {
    chatDiv.appendChild(createMessage(json));
    chatDiv.scrollTo(0, chatDiv.scrollHeight);
  }
};

function sendMessage() {
  const now = new Date();
  const json = {
    name: document.getElementById('nameInput').value,
    message: document.getElementById('msgInput').value,
    time: `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
  };
  ws.send(JSON.stringify(json));
  document.getElementById('msgInput').value = '';
}

function createMessage(json) {
  const side = json.mine ? 'mine' : 'other';
  const sideElement = createDiv(side);
  const sideTextElement = createDiv(`${side}-text`);
  const timeElement = createDiv('time');
  const nameElement = createDiv('name');
  const textElement = createDiv('text');
  timeElement.textContent = json.time;
  nameElement.textContent = json.name;
  textElement.textContent = json.message;
  sideElement.appendChild(sideTextElement);
  sideTextElement.appendChild(timeElement);
  sideTextElement.appendChild(nameElement);
  sideTextElement.appendChild(textElement);
  return sideElement;
}

function createDiv(className) {
  const element = document.createElement('div');
  element.classList.add(className);
  return element;
}