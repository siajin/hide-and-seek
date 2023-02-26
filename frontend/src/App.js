import "./style/App.css";
import char1 from "./static/char1.png";
import Enter from "./Enter";
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
  const [charList, setCharList] = useState([]);
  const [userName, setUserName] = useState("");
  const [keyPress, setKeyPress] = useState({
    up: 0,
    down: 0,
    right: 0,
    left: 0,
  });

  useEffect(() => {
    initSocketConnection();
    socket.on("charListUpdate", (charList) => {
      setCharList(charList);
    });

    window.addEventListener("beforeunload", disconnectSocket);
  }, [socket, disconnectSocket, initSocketConnection]);

  useEffect(() => {
    const canvasCur = canvasRef.current;
    const context = canvasCur.getContext("2d");
    setCtx(context);
  }, []);

  useEffect(() => {
    sendSocketEvent("updateKeyPress", keyPress);
  }, [keyPress]);

  useEffect(() => {
    drawChar();
  }, [background, charList]);

  function drawChar() {
    const canvasCur = canvasRef.current;
    const context = canvasCur.getContext("2d");
    context.clearRect(0, 0, 2580, 2580);
    charList.map((char) => {
      context.fillStyle = "#FF00FF";
      context.beginPath();
      context.arc(char.location.x, char.location.y, 50, 0, Math.PI * 2, false);
      context.closePath();
      context.fill();
    });
  }

  function onKeyDown(e) {
    if (e.key === "ArrowUp") {
      setKeyPress({ ...keyPress, up: 1 });
    } else if (e.key === "ArrowDown") {
      setKeyPress({ ...keyPress, down: 1 });
    } else if (e.key === "ArrowLeft") {
      setKeyPress({ ...keyPress, left: 1 });
    } else if (e.key === "ArrowRight") {
      setKeyPress({ ...keyPress, right: 1 });
    }
  }

  function onKeyUp(e) {
    if (e.key === "ArrowUp") {
      setKeyPress({ ...keyPress, up: 0 });
    } else if (e.key === "ArrowDown") {
      setKeyPress({ ...keyPress, down: 0 });
    } else if (e.key === "ArrowLeft") {
      setKeyPress({ ...keyPress, left: 0 });
    } else if (e.key === "ArrowRight") {
      setKeyPress({ ...keyPress, right: 0 });
    }
  }

  return (
    <div className="App">
      {userName === "" && (
        <Enter userName={userName} setUserName={setUserName} />
      )}
      <canvas
        ref={canvasRef}
        height="500"
        width="500"
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        tabIndex={0}
      ></canvas>
    </div>
  );
}

export default App;
