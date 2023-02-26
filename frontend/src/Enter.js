import { useState } from "react";

function Enter({ userName, setUserName }) {
  const [inputUserName, setInputUserName] = useState("");
  return (
    <div className="enter">
      <div>HIDE AND SEEK</div>
      <form
        onSubmit={() => {
          setUserName(inputUserName);
        }}
      >
        <input
          type="text"
          placeholder="username"
          value={inputUserName}
          onChange={(e) => setInputUserName(e.target.value)}
        />
        <button type="submit">PLAY</button>
      </form>
    </div>
  );
}

export default Enter;
