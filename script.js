const socket = io();

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#send').onclick = () => {
        let name = document.querySelector('#name');
        let message = document.querySelector('#message');
        let sendMessage = {name: name.value, message: message.value};
        postMessage(sendMessage)
        name.value = '';
        message.value = '';
    }
    getMessages();
})

socket.on('message', addMessage)

function addMessage(message) {
    document.querySelector("#messages").insertAdjacentHTML('afterbegin', `<h4>${message.name}</h4> <p>${message.message}</p>`)
}

async function getMessages() {
    let response = await (await fetch('http://localhost:3000/messages')).json();
    response.forEach(addMessage);
}

async function postMessage(data) {
    let params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }

    fetch('http://localhost:3000/messages', params);
}