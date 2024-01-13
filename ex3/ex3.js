function writeToScreen(message) {
    document.querySelector(`.chat-block`).innerHTML += `<p class="chat-block_message">` + message + `</p>`;
};

function writeToScreenResponse(message) {
    document.querySelector(`.chat-block`).innerHTML += `<p class="chat-block_message-response">` + message + `</p>`;
};

const wsUrl = `wss://echo-ws-service.herokuapp.com`;

let websocket;
websocket = new WebSocket(wsUrl);

websocket.onopen = function(evt) {
    writeToScreenResponse(`Вы подключились в чат`)
}
websocket.onclose = function(evt) {
    writeToScreenResponse(`Вы отключились от чата`)
  };
websocket.onmessage = function(evt) {
    writeToScreenResponse(`server: ` + evt.data)
};
websocket.onerror = function(evt) {
    writeToScreenResponse(`Error: ` + evt.data)
};

const btn = document.querySelector(`.input-block_button`);
    btn.addEventListener(`click`, () => {
    const messageOfClient = document.querySelector(`.input-block_input`).value;
    writeToScreen(messageOfClient);
    websocket.send(messageOfClient);
})

const btnGeo = document.querySelector(`.input-block_button-geolocation`);

btnGeo.addEventListener(`click`, () => {
    const success = (position) => {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        const geoMessage = `<a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}">Гео-локация</a>`;
        document.querySelector(`.chat-block`).innerHTML += `<p class="chat-block_message-geolocation">` + geoMessage + `</p>`;
    };

    const error = (position) => {
        document.querySelector(`.chat-block`).innerHTML += `<p class="chat-block_message-geolocation">Ошибка получения геолокации</p>`;
    };
    
    if (!navigator.geolocation) {
        document.querySelector(`.chat-block`).innerHTML += `<p class="chat-block_message-geolocation">Ошибка получения геолокации</p>`;  
    } 
    else {
      navigator.geolocation.getCurrentPosition(success, error);
    }

})

