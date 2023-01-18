import { useState } from "react";

export default function Clicker() {
  const countState = useState(0);
  const count = countState[0];
  const setCount = countState[1];

  const buttonClick = () => {
    setCount(count + 1);
  };
  return (
    <div className="flex justify-center mt-3">
      <div className="p-3 ">Clicks count: {count}</div>
      <button
        onClick={buttonClick}
        className=" p-2  border border-black rounded-md "
      >
        Click me
      </button>
    </div>
  );
}
