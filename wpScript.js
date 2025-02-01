function showChatList() {
    document.getElementById('chatList').style.display = 'block';
    document.getElementById('chatWindow').style.display = 'none';
    setActive(document.querySelector('.sidebar button'));
}
function gettime() {
    let time = new Date();
    let realtime = time.toLocaleTimeString();
    let returnTime = [];
    console.log(realtime);
    let count = 0;
    let i = 0;
    for (i = 0; i < realtime.length; i++) {
        if (realtime[i] == ':') {
            count++;
        }
        if (count < 2) {
            returnTime[i] = realtime[i];
            console.log(realtime[i]);
        }
        if (count == 2) { break; }
    }
    returnTime[i + 1] = ' ';
    returnTime[i + 2] = realtime[realtime.length - 2];
    returnTime[i + 3] = realtime[realtime.length - 1];
    return returnTime.toString().replaceAll(',', '');

}

function openChat(name) {
    document.getElementById('chatList').style.display = 'none';
    document.getElementById('chatWindow').style.display = 'flex';
    document.getElementById('chatName').innerText = name;
}

function setActive(button) {
    const buttons = document.querySelectorAll('.sidebar button');
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

function openSettings() {
    document.getElementById('settingsWindow').style.display = 'flex';
}

function closeSettings() {
    document.getElementById('settingsWindow').style.display = 'none';
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messagesContainer = document.getElementById('messages');
    const newMessage = document.createElement('div');
    newMessage.className = 'message sent';
    const newSpan = document.createElement('span');
    newSpan.innerHTML = gettime();
    newMessage.innerText = messageInput.value;
    messagesContainer.appendChild(newMessage);
    newMessage.appendChild(newSpan);
    const typing = document.createElement('div');
    const extraDiv = document.createElement('div');
    const extraDiv2 = document.createElement('div');
    const extraDiv3 = document.createElement('div');
    typing.id = 'typing';
    typing.appendChild(extraDiv);
    typing.appendChild(extraDiv2);
    typing.appendChild(extraDiv3);
    messagesContainer.appendChild(typing);
    messageInput.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    function returnResponse() {
        let res = newMessage.innerText;
        console.log(res);
        let arr =['hi','hello','how are you',"what's up",'how its going'];
        if (arr.some(word => res.toLowerCase().includes(word))) {
            return 'Hello, I am fine. How are you?';
        }
        else return `Sorry I can't answer it. I am currently not trained about this`;
        
    }
    setTimeout(() => {
        document.getElementById('typing').remove();
        const aiResponse = document.createElement('div');
        aiResponse.className = 'message received';
        aiResponse.innerText = returnResponse();
        const newSpan = document.createElement('span');
        newSpan.innerHTML = gettime();
        messagesContainer.appendChild(aiResponse);
        aiResponse.appendChild(newSpan);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, Math.floor(Math.abs(Math.floor(Math.random() * (5000 - 1000) + 1000)))); // AI responds after 1 second
}

document.getElementById('messageInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && document.getElementById('enterToSend').checked) {
        sendMessage();
    }
});

// Ensure the chat window is hidden initially
document.getElementById('chatWindow').style.display = 'none';