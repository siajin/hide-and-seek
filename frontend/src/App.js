import "./style/App.css";
import char1 from "./static/char1.png";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import {
  disconnectSocket,
  initSocketConnection,
  sendSocketEvent,
  socket,
  socketInfoReceived,
} from "./socketio";

function App() {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState();
  const [background, setBg] = useState({ x: 0, y: 0 });
  const [character, setChar] = useState({ x: 0, y: 0 });
  const [charList, setCharList] = useState([]);

  useEffect(() => {
    initSocketConnection();

    socket.on("charListUpdate", (charList) => {
      setCharList(charList);
      console.log(charList);
    });

    window.addEventListener("beforeunload", disconnectSocket);
  }, [socket, disconnectSocket, initSocketConnection]);

  useEffect(() => {
    const canvasCur = canvasRef.current;
    const context = canvasCur.getContext("2d");
    setCtx(context);
  }, []);

  useEffect(() => {
    // drawBg();
    drawChar();
  }, [background, charList]);

  function drawBg() {
    const canvasCur = canvasRef.current;
    const context = canvasCur.getContext("2d");

    const bgImg = new Image();
    bgImg.src = "";
  }

  function drawChar() {
    const canvasCur = canvasRef.current;
    const context = canvasCur.getContext("2d");
    context.clearRect(0, 0, 2580, 2580);

    for (let i = 0; i < charList.length; i++) {
      const charImg = new Image();
      charImg.src = char1;

      context.fillStyle = "#FF00FF";
      context.beginPath();
      context.arc(
        charList[i].location.x,
        charList[i].location.y,
        50,
        0,
        Math.PI * 2,
        false
      );
      context.closePath();
      context.fill();

    }
  }

  function handleMove(e) {
    if (e.key === "ArrowUp") {
      setChar({ ...character, y: character.y - 4 });
      setBg({ ...background, y: background.y + 4 });
    } else if (e.key === "ArrowDown") {
      setChar({ ...character, y: character.y + 4 });
      setBg({ ...background, y: background.y - 4 });
    } else if (e.key === "ArrowLeft") {
      setChar({ ...character, x: character.x - 4 });
      setBg({ ...background, x: background.x + 4 });
    } else if (e.key === "ArrowRight") {
      setChar({ ...character, x: character.x + 4 });
      setBg({ ...background, x: background.x - 4 });
    }

    sendSocketEvent("move", { location: character });
  }

  return (
    <div className="App">
      <canvas
        ref={canvasRef}
        height="500"
        width="500"
        onKeyDown={handleMove}
        tabIndex={0}
      ></canvas>
    </div>
  );
}

export default App;
