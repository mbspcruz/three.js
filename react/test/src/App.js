import Clicker from "./Clicker";
import { useState } from "react";

export default function App({ children }) {
  const [hasClicker, setHasClicker] = useState(true);
  const [count, setCount] = useState(0);

  const toggleClickerClick = () => {
    setHasClicker(!hasClicker);
  };
  return (
    <>
      {children}
      <div>Total count: {count}</div>
      <button onClick={toggleClickerClick}>
        {" "}
        {hasClicker ? "Hide" : "Show"} Clicker
      </button>
      {hasClicker ? (
        <>
          <Clicker
            keyName="countA"
            color={`hsl(${Math.random() * 360}deg, 100%, 75%)`}
          ></Clicker>
          <Clicker
            keyName="countB"
            color={`hsl(${Math.random() * 360}deg, 100%, 75%)`}
          ></Clicker>
          <Clicker
            keyName="countC"
            color={`hsl(${Math.random() * 360}deg, 100%, 75%)`}
          ></Clicker>
        </>
      ) : null}
    </>
  );
}
