// Socket ko initialize karo
const socket = io()

// Ek variable name declare karo
let name;

// DOM se textarea aur messageArea elements ko select karo
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')

// Jab tak naam nahi milta tab tak naam poocho
do {
    name = prompt('Please enter your name :) ')
} while(!name)

// Textarea par ek event listener lagao jo Enter key ko detect kare aur message bheje
textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

// Function banakar message server ko bheje
function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // Message ko DOM me add karo
    appendMessage(msg, 'outgoing')
    // Textarea ko khali karo
    textarea.value = ''
    // Niche scroll karo
    scrollToBottom()

    // Server ko message bhejo
    socket.emit('message', msg)
}

// Function banakar message ko DOM me add karo
function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Server se message ko receive karo aur DOM me add karo
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

// Niche scroll karo
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}
