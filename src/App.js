import "./style/App.css";
import char1 from "./static/char1.png";
import { useEffect, useState, useRef } from "react";

function App() {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState();
  const [background, setBg] = useState({ x: 0, y: 0 });
  const [character, setChar] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvasCur = canvasRef.current;
    const context = canvasCur.getContext("2d");
    setCtx(context);
  }, []);

  useEffect(() => {
    // drawBg();
    drawChar();
  }, [background, character]);

  function drawBg() {
    const canvasCur = canvasRef.current;
    const context = canvasCur.getContext("2d");

    const bgImg = new Image();
    bgImg.src = "";
  }
  function drawChar() {
    const canvasCur = canvasRef.current;
    const context = canvasCur.getContext("2d");
    const charImg = new Image();
    charImg.src = char1;
    context.clearRect(0, 0, 2580, 2580);
    context.drawImage(charImg, character.x, character.y, 50, 50);
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
  }

  return (
    <div className="App">
      <canvas
        ref={canvasRef}
        height={window.innerHeight}
        width={window.innerWidth}
        onKeyDown={handleMove}
        tabIndex={0}
      ></canvas>
    </div>
  );
}

export default App;
