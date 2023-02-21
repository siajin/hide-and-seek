// socketio.js

import { io } from "socket.io-client";

export let socket = io("http://localhost:8080", {
  transports: ["websocket"],
});

export const initSocketConnection = () => {
  if (socket) return;
  socket.connect();
};

// 이벤트 명을 지정하고 데이터를 보냄
export const sendSocketEvent = (eventName, data) => {
  if (socket == null || socket.connected === false) {
    initSocketConnection();
  }
  socket.emit(eventName, data);
};

let cbMap = new Map();

// 해당 이벤트를 받고 콜백 함수를 실행함
export const socketInfoReceived = (cbType, cb) => {
  cbMap.set(cbType, cb);

  if (socket.hasListeners("message")) {
    socket.off("message");
  }

  socket.on("message", (ret) => {
    for (let [, cbValue] of cbMap) {
      cbValue(null, ret);
    }
  });
};

// 소켓 연결을 끊음
export const disconnectSocket = () => {
  console.log(1);
  if (socket == null || socket.connected === false) {
    return;
  }
  console.log(2);
  socket.disconnect();
  socket = undefined;
};
