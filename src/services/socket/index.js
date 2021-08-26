import { w3cwebsocket as WebsocketClient } from "websocket";

export default function ({ url, account_id }) {
  if (!url || !account_id) {
    console.error("Missing paramaters url, account_id");
  }

  let socket = new WebsocketClient(url);

  socket.onopen = function (e) {
    console.log("WS connection established");

    socket.send(
      JSON.stringify({
        id: account_id,
        message: "subscribe",
      })
    );

    setInterval(() => {
      const isOpen = socket.readyState === 1;
      if (isOpen) {
        const msg = JSON.stringify({ message: "connection_reset" });
        socket.send(msg);
      }
    }, 120000);
  };

  socket.onmessage = function (event) {
    let data = event?.data || null;
    console.log("WS incoming data': ", data);
  };

  socket.onclose = function () {
    console.log("WS is closed");
  };

  socket.onerror = function (event) {
    console.log("WS has error");
  };

  return socket;
}
